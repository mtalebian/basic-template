using Accounts.Core;
using Common;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Accounts.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AssignUserRoleController : ControllerBase
    {
        private readonly IAuthenticationService<User> accountService;
        private readonly IUserRoleService userRoleService;
        private readonly IUserCompositeRoleService userCompositeRoleService;
        private readonly IRoleService<User> roleService;
        private readonly ICompositeRoleService compositeRoleService;



        public AssignUserRoleController(IAuthenticationService<User> accountService, IUserRoleService userRoleService, IRoleService<User> roleService, IUserCompositeRoleService userCompositeRoleService, ICompositeRoleService compositeRoleService)
        {
            this.userRoleService = userRoleService;
            this.userCompositeRoleService = userCompositeRoleService;
            this.accountService = accountService;
            this.roleService = roleService;
            this.compositeRoleService = compositeRoleService;

        }
        [EnableCors("react")]
        [HttpGet("user-roles/{projectId}/{userId}")]
        public async Task<Response<List<UserRoleGridDTO>>> GetUserRoles(string projectId, long userId)
        {
            var app = await accountService.GetProjectAsync(projectId);
            if (app == null)
            {
                return new Response<List<UserRoleGridDTO>>(Messages.InvalidProjectId);
            }
            var _userRoles = userRoleService.GetAllUserRole(projectId, userId);
            var result = _userRoles.Select(x => new UserRoleGridDTO()
            {
                projectId = x.ProjectId,
                UserId = x.User.Id,
                RoleId = x.RoleId,
                RoleTitle = x.Role?.Title,
                UserName = x.User?.UserName,
                CreateBy = x.CreatedBy,
                CreateAt = x.CreatedAt.ToShortDateString()
            }).ToList();

            return new Response<List<UserRoleGridDTO>>(result);
        }

        [EnableCors("react")]
        [HttpPost("insert-user-role")]
        public async Task<Response<UserRoleGridDTO>> InsertUserRole([FromBody] InsertUserRoleDTO model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return new Response<UserRoleGridDTO>(string.Join(",", ModelState.GetModelStateErrors()));
                }
                var recentUserRole = userRoleService.GetUserRole(model.ProjectId, model.RoleId, model.UserId);
                if (recentUserRole is not null)
                {
                    return new Response<UserRoleGridDTO>(Messages.DuplicateUserRole);
                }
                var User = await GetUserAsync();
                var UserName = User.UserName;
                if (string.IsNullOrEmpty(UserName))
                {
                    return new Response<UserRoleGridDTO>(Messages.Error401);
                }
                var role = roleService.GetRoleById(model.ProjectId, model.RoleId);
                if (role is null)
                {
                    return new Response<UserRoleGridDTO>(Messages.InvalidRoleId);
                }
                var user = accountService.GetUserByIdAsync(model.UserId);
                if (user is null)
                {
                    return new Response<UserRoleGridDTO>(Messages.InvalidUserId);
                }
                var userRole = model.MapTo<UserRole>();
                userRole.CreatedBy = UserName;
                userRole.CreatedAt = DateTime.Now;
                userRoleService.InsertUserRole(userRole);
                var lastUserRole = userRoleService.GetUserRole(model.ProjectId, model.RoleId, model.UserId);
                var result = new UserRoleGridDTO()
                {
                    projectId = lastUserRole.ProjectId,
                    UserId = lastUserRole.User.Id,
                    RoleId = lastUserRole.RoleId,
                    RoleTitle = lastUserRole.Role.Title,
                    UserName = lastUserRole.User.UserName,
                    CreateBy = lastUserRole.CreatedBy,
                    CreateAt = lastUserRole.CreatedAt.ToShortDateString()
                };
                return new Response<UserRoleGridDTO>(result);
            }
            catch (Exception)
            {
                throw;
            }

        }

        [EnableCors("react")]
        [HttpDelete("delete-user-role/{projectId}/{roleId}/{userId}")]
        public async Task<Response> DeleteUserRole(string projectId, string roleId, long userId)
        {
            try
            {
                if (string.IsNullOrEmpty(projectId) || userId == default(long) || string.IsNullOrEmpty(roleId))
                    return new Response(Messages.InvalidInfo);

                var app = await accountService.GetProjectAsync(projectId);
                if (app == null)
                {
                    return new Response(Messages.InvalidProjectId);
                }
                userRoleService.DeleteUserRole(projectId, roleId, userId);
                return new Response();
            }
            catch (Exception)
            {
                throw;
            }

        }

        //.....................................
        [EnableCors("react")]
        [HttpGet("user-composite-roles/{projectId}/{userId}")]
        public async Task<Response<List<UserCompositeRoleGridDTO>>> GetUserCompositeRoles(string projectId, long userId)
        {
            var app = await accountService.GetProjectAsync(projectId);
            if (app == null)
            {
                return new Response<List<UserCompositeRoleGridDTO>>(Messages.InvalidProjectId);
            }
            var _userCompositeRoles = userCompositeRoleService.GetAllUserCompositeRole(projectId, userId);
            var result = _userCompositeRoles.Select(x => new UserCompositeRoleGridDTO()
            {
                projectId = x.ProjectId,
                UserId = x.User.Id,
                CompositeRoleId = x.CompositeRoleId,
                CompositeRoleTitle = x.CompositeRole?.Title,
                UserName = x.User?.UserName,
                CreateBy = x.CreatedBy,
                CreateAt = x.CreatedAt.ToShortDateString()
            }).ToList();

            return new Response<List<UserCompositeRoleGridDTO>>(result);
        }

        [EnableCors("react")]
        [HttpPost("insert-user-composite-role")]
        public async Task<Response<UserCompositeRoleGridDTO>> InsertUserCompositeRole([FromBody] InsertUserRoleDTO model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return new Response<UserCompositeRoleGridDTO>(string.Join(",", ModelState.GetModelStateErrors()));
                }
                var recentUserCompositeRole = userCompositeRoleService.GetUserCompositeRole(model.ProjectId, model.RoleId, model.UserId);
                if (recentUserCompositeRole is not null)
                {
                    return new Response<UserCompositeRoleGridDTO>(Messages.DuplicateUserCompositeRole);
                }
                var User = await GetUserAsync();
                var UserName = User.UserName;
                if (string.IsNullOrEmpty(UserName))
                {
                    return new Response<UserCompositeRoleGridDTO>(Messages.Error401);
                }
                var compositeRole = compositeRoleService.GetCompositeRoleById(model.ProjectId, model.RoleId);
                if (compositeRole is null)
                {
                    return new Response<UserCompositeRoleGridDTO>(Messages.InvalidCompositeRoleId);
                }
                var user = accountService.GetUserByIdAsync(model.UserId);
                if (user is null)
                {
                    return new Response<UserCompositeRoleGridDTO>(Messages.InvalidUserId);
                }
                var userCompositeRole = model.MapTo<UserCompositeRole>();
                userCompositeRole.CompositeRoleId = model.RoleId;
                userCompositeRole.CreatedBy = UserName;
                userCompositeRole.CreatedAt = DateTime.Now;
                userCompositeRoleService.InsertUserCompositeRole(userCompositeRole);
                var lastUserCompositeRole = userCompositeRoleService.GetUserCompositeRole(model.ProjectId, model.RoleId, model.UserId);
                var result = new UserCompositeRoleGridDTO()
                {
                    projectId = lastUserCompositeRole.ProjectId,
                    UserId = lastUserCompositeRole.User.Id,
                    CompositeRoleId = lastUserCompositeRole.CompositeRoleId,
                    CompositeRoleTitle = lastUserCompositeRole.CompositeRole.Title,
                    UserName = lastUserCompositeRole.User.UserName,
                    CreateBy = lastUserCompositeRole.CreatedBy,
                    CreateAt = lastUserCompositeRole.CreatedAt.ToShortDateString()
                };
                return new Response<UserCompositeRoleGridDTO>(result);
            }
            catch (Exception)
            {
                throw;
            }

        }

        [EnableCors("react")]
        [HttpDelete("delete-user-composite-role/{projectId}/{compositeRoleId}/{userId}")]
        public async Task<Response> DeleteUserCompositeRole(string projectId, string compositeRoleId, long userId)
        {
            try
            {
                if (string.IsNullOrEmpty(projectId) || userId == default(long) || string.IsNullOrEmpty(compositeRoleId))
                    return new Response(Messages.InvalidInfo);

                var app = await accountService.GetProjectAsync(projectId);
                if (app == null)
                {
                    return new Response(Messages.InvalidProjectId);
                }
                userCompositeRoleService.DeleteUserCompositeRole(projectId, compositeRoleId, userId);
                return new Response();
            }
            catch (Exception)
            {
                throw;
            }

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
