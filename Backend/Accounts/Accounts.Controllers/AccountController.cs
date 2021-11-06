using Accounts.Core;
using Common;
using Common.Helper;
using Common.Validation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Accounts.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class AccountController : ControllerBase
    {
        private readonly IAuthenticationService<User> accountService;
        private readonly IUserService userManagmentService;
        private readonly IConfiguration _Configuration;
        private const string InternalKey = "8gfB50.!#_Aau61n.-$!";
        internal const string SecurityKeyCookieName = "x-security-key";

        public AccountController(IAuthenticationService<User> accountService, IConfiguration configuration, IUserService userService)
        {
            this.accountService = accountService;
            this.userManagmentService = userService;
            _Configuration = configuration;
        }


        [AllowAnonymous]
        [HttpPost("forgot-password/{projectId}")]
        public async Task<Response<ForgotPasswordResultDTO>> ForgotPassword(string projectId, [FromBody] ForgotPasswordDTO model)
        {
            if (!SkipCaptcha())
            {
                Request.Cookies.TryGetValue(CaptchaController.SecurityKeyCookieName, out var securityKeyString);
                var securityKey = string.IsNullOrEmpty(securityKeyString) ? null : System.Convert.FromBase64String(securityKeyString);

                if (securityKey == null || !SecurityKeyGenerator.IsValidTimeStampKey("", model.Captcha, securityKey))
                {
                    return new Response<ForgotPasswordResultDTO>(Messages.InvalidCaptcha);
                }
            }

            var app = await accountService.GetProjectAsync(projectId);
            if (app == null)
            {
                return new Response<ForgotPasswordResultDTO>(Messages.InvalidProjectId);
            }

            var user = userManagmentService.GetUserByUserName(model.UserName);
            if (user == null)
            {
                return new Response<ForgotPasswordResultDTO>(Messages.InvalidUserName);
            }
            if (user.WindowsAuthenticate)
            {
                return new Response<ForgotPasswordResultDTO>(Messages.InvalidResetPassword);
            }
            var expiry = _Configuration["ExpirationTime:SMS"].ToInt(Settings.DefaultExpiry);
            var now = DateTime.Now;
            var vcode = HelperMethods.GetVerificationCode(5);
            var key = Common.Cryptography.Rijndael.Encrypt(vcode.GetHashCode().ToString() + model.UserName + "@" + now.ToString(), InternalKey);
            var result = new ForgotPasswordResultDTO() { Code = vcode, Key = key, Expiry = expiry };
            return new Response<ForgotPasswordResultDTO>(result);
        }

        [AllowAnonymous]
        [HttpPost("reset-password/{projectId}")]
        public async Task<Response<ResetPasswordResultDTO>> ResetPassword(string projectId, [FromBody] ResetPasswordDTO model)
        {
            var app = await accountService.GetProjectAsync(projectId);
            if (app == null)
            {
                return new Response<ResetPasswordResultDTO>(Messages.InvalidProjectId);
            }
            var bytes = Common.Cryptography.Rijndael.Decrypt(model.Key, InternalKey);
            var plain_text = System.Text.Encoding.UTF8.GetString(bytes);
            var p = plain_text.Split('@');
            if (p.Length != 2)
            {
                return new Response<ResetPasswordResultDTO>(Messages.InvalidEnterCode);
            }

            var time = DateTime.Parse(p[1]);
            var is_expired = DateTime.Now.Subtract(time).TotalMilliseconds > 60000 * 2;
            //--------------
            if (model.Code.GetHashCode().ToString() + model.UserName != p[0])
            {
                return new Response<ResetPasswordResultDTO>(Messages.InvalidEnterCode);
            }
            if (is_expired)
            {
                return new Response<ResetPasswordResultDTO>(Messages.ExpiredVerificationCode);
            }
            //--------------
            var new_password = HelperMethods.GeneratePassword();
            var user = userManagmentService.GetUserByUserName(model.UserName);
            if (user == null)
            {
                return new Response<ResetPasswordResultDTO>(Messages.InvalidUserName);
            }
            if (user.WindowsAuthenticate)
            {
                return new Response<ResetPasswordResultDTO>(Messages.InvalidResetPassword);
            }
            var _passwordHash = Common.Cryptography.Helper.HashPassword(new_password);
            user.PasswordHash = _passwordHash;
            userManagmentService.Update(user);
            var result = new ResetPasswordResultDTO() { NewPassword = new_password };//while implement sms or email remove this part
            return new Response<ResetPasswordResultDTO>(result);
        }


        [AllowAnonymous]
        [EnableCors("react")]
        [HttpPost("logout")]
        public async Task<Response> Logout()
        {
            Request.Cookies.TryGetValue(Settings.RefTokenCookieName, out var ref_token);
            if (string.IsNullOrEmpty(ref_token)) return new Response();

            Request.Cookies.TryGetValue(Settings.SessionIdCookieName, out var sessionId);
            if (!sessionId.ToLong().HasValue) return new Response();

            Response.Cookies.Delete(Settings.RefTokenCookieName);
            Response.Cookies.Delete(Settings.SessionIdCookieName);

            var session = await accountService.GetSessionByRefreshTokenAsync(sessionId.ToLong(0), ref_token);
            if (session == null) return new Response();

            await accountService.DeleteSessionAsync(session);
            return new Response();
        }


        [AllowAnonymous]
        [HttpPost("login/{projectId}")]
        public async Task<Response<UserInfoDTO>> Login(string projectId, [FromBody] LoginDTO model)
        {
            if (!SkipCaptcha())
            {
                Request.Cookies.TryGetValue(CaptchaController.SecurityKeyCookieName, out var securityKeyString);
                var securityKey = string.IsNullOrEmpty(securityKeyString) ? null : System.Convert.FromBase64String(securityKeyString);

                if (securityKey == null || !SecurityKeyGenerator.IsValidTimeStampKey("", model.Captcha, securityKey))
                {
                    return new Response<UserInfoDTO>(Messages.InvalidCaptcha);
                }
            }

            var app = await accountService.GetProjectAsync(projectId);
            if (app == null)
            {
                return new Response<UserInfoDTO>(Messages.InvalidProjectId);
            }

            // return new Response<UserInfoDTO>("befor refresh");
            var user = await accountService.GetUserByNameAsync(model.UserName);
            if (user == null)
            {
                return new Response<UserInfoDTO>(Messages.InvalidUserNameOrPassword);
            }
            if (!accountService.VerifyPassword(user, model.Password))
            {
                return new Response<UserInfoDTO>(Messages.InvalidUserNameOrPassword);
            }

            Request.Cookies.TryGetValue(Settings.SessionIdCookieName, out var sessionId);
            Request.Cookies.TryGetValue(Settings.RefTokenCookieName, out var ref_token);
            var session = await accountService.GetSessionByRefreshTokenAsync(sessionId.ToLong(0), ref_token);
            if (session != null && session.UserId != user.Id)
            {
                await accountService.DeleteSessionAsync(session);
                session = null;
            }

            var ref_result = await RefreshAsync(app, user, session);
            var user_info = new UserInfoDTO
            {
                DisplayName = $"{user.FirstName} {user.LastName}",
                Token = ref_result.Token,
                Expiry = ref_result.Expiry,
                ProjectTitle = (await accountService.GetProjectAsync(projectId)).Title,
            };
            return new Response<UserInfoDTO>(user_info);
        }

        private bool SkipCaptcha()
        {
            return _Configuration["SkipCaptcha"].eq("true");
        }

        [AllowAnonymous]
        [HttpPost("user-info/{projectId}")]
        public async Task<Response<UserInfoDTO>> GetUserInfo(string projectId)
        {
            //Thread.Sleep(1000);
            var app = await accountService.GetProjectAsync(projectId);
            if (app == null)
            {
                return new Response<UserInfoDTO>(Messages.InvalidProjectId);
            }
            Request.Cookies.TryGetValue(Settings.SessionIdCookieName, out var sessionId);
            Request.Cookies.TryGetValue(Settings.RefTokenCookieName, out var ref_token);
            var session = await accountService.GetSessionByRefreshTokenAsync(sessionId.ToLong(0), ref_token);
            if (session == null)
            {
                return new Response<UserInfoDTO>(Messages.Error401);
            }
            var user = await accountService.GetUserByIdAsync(session.UserId);
            var ref_result = await RefreshAsync(app, user, session);
            var user_info = new UserInfoDTO
            {
                DisplayName = $"{user.FirstName} {user.LastName}",
                Token = ref_result.Token,
                Expiry = ref_result.Expiry,
                ProjectTitle = (await accountService.GetProjectAsync(projectId)).Title,
            };
            return new Response<UserInfoDTO>(user_info);
        }

        [AllowAnonymous]
        [HttpGet("profile-info/{projectId}")]
        public async Task<Response<ProfileInfoDTO>> GetProfileInfo(string projectId)
        {
            var app = await accountService.GetProjectAsync(projectId);
            if (app == null)
            {
                return new Response<ProfileInfoDTO>(Messages.InvalidProjectId);
            }
            var user = await GetUserAsync();
            var user_info = new ProfileInfoDTO
            {
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                NationalCode = user.NationalCode,
                PhoneNumber = user.PhoneNumber,
                Email = user.Email,
                WindowsAuthenticate = user.WindowsAuthenticate
            };
            return new Response<ProfileInfoDTO>(user_info);
        }


        [HttpPut("update-user-profile")]
        public Response<ProfileInfoDTO> UpdateProfile([FromBody] ProfileInfoDTO model)
        {
            if (!ModelState.IsValid)
            {
                return new Response<ProfileInfoDTO>(string.Join(",", ModelState.GetModelStateErrors()));
            }
            var user = userManagmentService.GetUserByUserName(model.UserName);
            if (user is null)
            {
                return new Response<ProfileInfoDTO>(Messages.InvalidInfo);
            }
            if (!string.IsNullOrEmpty(model.NationalCode))
            {
                if (!ValidationHelper.IsValidNationalCode(model.NationalCode))
                {
                    return new Response<ProfileInfoDTO>(Messages.InvalidNationalCode);
                }
                var _tempTb = userManagmentService.GetUser(model.NationalCode);
                if (_tempTb is not null && _tempTb.UserName != model.UserName)
                {
                    return new Response<ProfileInfoDTO>(Messages.DuplicateNationalCode);
                }
            }
            model.MapTo(user);
            user.LastUpdate = DateTime.Now;
            userManagmentService.Update(user);
            var result = userManagmentService.GetUserByUserName(model.UserName).MapTo<ProfileInfoDTO>();
            return new Response<ProfileInfoDTO>(result);
        }

        [HttpPut("change-password")]
        public Response ChangePassword([FromBody] ChangePasswordDTO model)
        {
            if (!ModelState.IsValid)
            {
                return new Response(string.Join(",", ModelState.GetModelStateErrors()));
            }
            var user = userManagmentService.GetUserByUserName(model.UserName);
            if (user is null)
            {
                return new Response(Messages.InvalidInfo);
            }
            var _PasswordHash = Common.Cryptography.Helper.HashPassword(model.OldPassword);
            if (user.PasswordHash != _PasswordHash)
            {
                return new Response(Messages.InvalidOldPassword);
            }
            user.PasswordHash = Common.Cryptography.Helper.HashPassword(model.Password);
            user.LastUpdate = DateTime.Now;
            userManagmentService.Update(user);
            return new Response();
        }

        [AllowAnonymous]
        [EnableCors("react")]
        [HttpPost("refresh/{projectId}")]
        public async Task<Response<RefreshResultDTO>> Refresh(string projectId)
        {
            var app = await accountService.GetProjectAsync(projectId);
            if (app == null)
            {
                return new Response<RefreshResultDTO>(Messages.InvalidProjectId);
            }
            Request.Cookies.TryGetValue(Settings.SessionIdCookieName, out var sessionId);
            Request.Cookies.TryGetValue(Settings.RefTokenCookieName, out var ref_token);
            var session = await accountService.GetSessionByRefreshTokenAsync(sessionId.ToLong(0), ref_token);
            if (session == null)
            {
                return new Response<RefreshResultDTO>(Messages.Error401);
            }
            var user = await accountService.GetUserByIdAsync(session.UserId);
            var result = await RefreshAsync(app, user, session);
            return new Response<RefreshResultDTO>(result);
        }


        private async Task<RefreshResultDTO> RefreshAsync(Project app, User user, UserSession session)
        {
            var ip = Request.HttpContext?.Connection?.RemoteIpAddress?.ToString() ?? "";
            if (session != null)
            {
                await accountService.RegenerateRefreshTokenAsync(session, ip);
            }
            else
            {
                var userAgent = Request.Headers["User-Agent"].ToString();
                session = await accountService.CreateSessionAsync(app, user, userAgent, ip);
            }

            var expiry = _Configuration["Jwt:expiry"].ToInt(Settings.DefaultExpiry);
            var token = accountService.GetToken(user, expiry);
            Response.Cookies.Append(Settings.RefTokenCookieName, session.RefreshToken, Settings.GetCookieOption());
            Response.Cookies.Append(Settings.SessionIdCookieName, session.Id.ToString(), Settings.GetCookieOption());

            return new RefreshResultDTO
            {
                Token = token,
                Expiry = expiry,
            };
        }

        private async Task<User> GetUserAsync()
        {
            Request.Cookies.TryGetValue(Settings.SessionIdCookieName, out var sessionId);
            Request.Cookies.TryGetValue(Settings.RefTokenCookieName, out var ref_token);
            var session = await accountService.GetSessionByRefreshTokenAsync(sessionId.ToLong(0), ref_token);
            if (session == null)
            {
                return new User();
            }
            var user = await accountService.GetUserByIdAsync(session.UserId);
            return user;
        }


    }
}
