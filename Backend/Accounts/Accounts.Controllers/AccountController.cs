using Accounts.Core;
using Common;
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
        private readonly IAuthenticationService<User> service;
        private readonly IConfiguration _Configuration;
        internal const string SecurityKeyCookieName = "x-security-key";

        public AccountController(IAuthenticationService<User> accountService, IConfiguration configuration)
        {
            this.service = accountService;
            _Configuration = configuration;
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

            var session = await service.GetSessionByRefreshTokenAsync(sessionId.ToLong(0), ref_token);
            if (session == null) return new Response();

            await service.DeleteSessionAsync(session);
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

            var app = await service.GetProjectAsync(projectId);
            if (app == null)
            {
                return new Response<UserInfoDTO>(Messages.InvalidProjectId);
            }

            // return new Response<UserInfoDTO>("befor refresh");
            var user = await service.GetUserByNameAsync(model.UserName);
            if (user == null)
            {
                return new Response<UserInfoDTO>(Messages.InvalidUserNameOrPassword);
            }
            if (!service.VerifyPassword(user, model.Password))
            {
                return new Response<UserInfoDTO>(Messages.InvalidUserNameOrPassword);
            }

            Request.Cookies.TryGetValue(Settings.SessionIdCookieName, out var sessionId);
            Request.Cookies.TryGetValue(Settings.RefTokenCookieName, out var ref_token);
            var session = await service.GetSessionByRefreshTokenAsync(sessionId.ToLong(0), ref_token);
            if (session != null && session.UserId != user.Id)
            {
                await service.DeleteSessionAsync(session);
                session = null;
            }

            var ref_result = await RefreshAsync(app, user, session);
            var user_info = new UserInfoDTO
            {
                UserName= user.UserName,
                DisplayName = $"{user.FirstName} {user.LastName}",
                Token = ref_result.Token,
                Expiry = ref_result.Expiry,
                ProjectTitle = (await service.GetProjectAsync(projectId)).Title,
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
            var app = await service.GetProjectAsync(projectId);
            if (app == null)
            {
                return new Response<UserInfoDTO>(Messages.InvalidProjectId);
            }
            Request.Cookies.TryGetValue(Settings.SessionIdCookieName, out var sessionId);
            Request.Cookies.TryGetValue(Settings.RefTokenCookieName, out var ref_token);
            var session = await service.GetSessionByRefreshTokenAsync(sessionId.ToLong(0), ref_token);
            if (session == null)
            {
                return new Response<UserInfoDTO>(Messages.Error401);
            }
            var user = await service.GetUserByIdAsync(session.UserId);
            var ref_result = await RefreshAsync(app, user, session);
            var user_info = new UserInfoDTO
            {
                UserName = user.UserName,
                DisplayName = $"{user.FirstName} {user.LastName}",
                Token = ref_result.Token,
                Expiry = ref_result.Expiry,
                ProjectTitle = (await service.GetProjectAsync(projectId)).Title,
            };
            return new Response<UserInfoDTO>(user_info);
        }


        [AllowAnonymous]
        [EnableCors("react")]
        [HttpPost("refresh/{projectId}")]
        public async Task<Response<RefreshResultDTO>> Refresh(string projectId)
        {
            var app = await service.GetProjectAsync(projectId);
            if (app == null)
            {
                return new Response<RefreshResultDTO>(Messages.InvalidProjectId);
            }
            Request.Cookies.TryGetValue(Settings.SessionIdCookieName, out var sessionId);
            Request.Cookies.TryGetValue(Settings.RefTokenCookieName, out var ref_token);
            var session = await service.GetSessionByRefreshTokenAsync(sessionId.ToLong(0), ref_token);
            if (session == null)
            {
                return new Response<RefreshResultDTO>(Messages.Error401);
            }
            var user = await service.GetUserByIdAsync(session.UserId);
            var result = await RefreshAsync(app, user, session);
            return new Response<RefreshResultDTO>(result);
        }


        private async Task<RefreshResultDTO> RefreshAsync(Project app, User user, UserSession session)
        {
            var ip = Request.HttpContext?.Connection?.RemoteIpAddress?.ToString() ?? "";
            if (session != null)
            {
                await service.RegenerateRefreshTokenAsync(session, ip);
            }
            else
            {
                var userAgent = Request.Headers["User-Agent"].ToString();
                session = await service.CreateSessionAsync(app, user, userAgent, ip);
            }

            var expiry = _Configuration["Jwt:expiry"].ToInt(Settings.DefaultExpiry);
            var token = service.GetToken(user, expiry);
            Response.Cookies.Append(Settings.RefTokenCookieName, session.RefreshToken, Settings.GetCookieOption());
            Response.Cookies.Append(Settings.SessionIdCookieName, session.Id.ToString(), Settings.GetCookieOption());

            return new RefreshResultDTO
            {
                Token = token,
                Expiry = expiry,
            };
        }


    }
}
