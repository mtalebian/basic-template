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
    public class CompositeRoleController : ControllerBase
    {
        private readonly IAuthenticationService<User> accountService;
        private readonly ICompositeRoleService compositeRoleService;

        public CompositeRoleController(IAuthenticationService<User> accountService, ICompositeRoleService compositeRoleService)
        {
            this.accountService = accountService;
            this.compositeRoleService = compositeRoleService;
        }
        [EnableCors("react")]
        [HttpGet("composite-roles/{projectId}")]
        public async Task<Response<List<CompositeRolesDTO>>> GetCompositeRoles(string projectId)
        {
            var app = await accountService.GetProjectAsync(projectId);
            if (app == null)
            {
                return new Response<List<CompositeRolesDTO>>(Messages.InvalidProjectId);
            }
            var _compositeRoles = compositeRoleService.GetAllCompositeRoles(projectId);
            if (_compositeRoles is null)
                return new Response<List<CompositeRolesDTO>>(Messages.NotFoundInformation);
            var result = _compositeRoles.MapTo<CompositeRolesDTO>().ToList();
            return new Response<List<CompositeRolesDTO>>(result);
        }

        [EnableCors("react")]
        [HttpGet("composite-role-by-id/{projectId}/{id}")]
        public async Task<Response<CompositeRolesDTO>> GetCompositeRoleById(string projectId, string id)
        {
            try
            {
                var app = await accountService.GetProjectAsync(projectId);
                if (app == null)
                {
                    return new Response<CompositeRolesDTO>(Messages.InvalidProjectId);
                }
                var _compositeRole = compositeRoleService.GetCompositeRoleById(projectId, id);
                if (_compositeRole is null)
                    return new Response<CompositeRolesDTO>(Messages.NotFoundInformation);
                var result = _compositeRole.MapTo<CompositeRolesDTO>();
                return new Response<CompositeRolesDTO>(result);
            }
            catch (Exception)
            {
                throw;
            }

        }


        [EnableCors("react")]
        [HttpPost("insert-composite-role")]
        public async Task<Response<CompositeRolesDTO>> InsertCompositeRole([FromBody] CompositeRolesDTO model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return new Response<CompositeRolesDTO>(string.Join(",", ModelState.GetModelStateErrors()));
                }
                var recentCompositeRole = compositeRoleService.GetCompositeRoleById(model.ProjectId, model.Id);
                if (recentCompositeRole is not null)
                {
                    return new Response<CompositeRolesDTO>(Messages.DuplicateCompositeRole);
                }
                var User = await GetUserAsync();
                var UserName = User.UserName;
                if (string.IsNullOrEmpty(UserName))
                {
                    return new Response<CompositeRolesDTO>(Messages.Error401);
                }
                var newCompositeRole = model.MapTo<CompositeRole>();
                newCompositeRole.CreatedBy = UserName;
                newCompositeRole.CreatedAt = DateTime.Now;
                newCompositeRole.LastUpdatedBy = UserName;
                newCompositeRole.LastUpdate = DateTime.Now;
                compositeRoleService.InsertCompositeRole(newCompositeRole);
                var result = newCompositeRole.MapTo<CompositeRolesDTO>();
                return new Response<CompositeRolesDTO>(result);
            }
            catch (Exception)
            {
                throw;
            }

        }

        [EnableCors("react")]
        [HttpPut("update-composite-role")]
        public async Task<Response<CompositeRolesDTO>> UpdateRole([FromBody] CompositeRolesDTO model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return new Response<CompositeRolesDTO>(string.Join(",", ModelState.GetModelStateErrors()));
                }
                var compositeRole = compositeRoleService.GetCompositeRoleById(model.ProjectId, model.Id);
                if (compositeRole is null)
                {
                    return new Response<CompositeRolesDTO>(Messages.InvalidInfo);
                }
                var currentUser = await GetUserAsync();
                var userName = currentUser.UserName;
                if (string.IsNullOrEmpty(userName))
                {
                    return new Response<CompositeRolesDTO>(Messages.Error401);
                }
                compositeRole.Title = model.Title;
                compositeRole.LastUpdate = DateTime.Now;
                compositeRole.LastUpdatedBy = currentUser.UserName;
                compositeRoleService.UpdateCompositeRole(compositeRole);
                var result = compositeRole.MapTo<CompositeRolesDTO>();
                return new Response<CompositeRolesDTO>(result);
            }
            catch (Exception)
            {
                throw;
            }

        }

        [EnableCors("react")]
        [HttpDelete("delete-composite-role/{projectId}/{id}")]
        public async Task<Response> DeleteCompositeRole(string projectId, string id)
        {
            try
            {
                if (string.IsNullOrEmpty(projectId) || string.IsNullOrEmpty(id))
                    return new Response(Messages.InvalidInfo);

                var app = await accountService.GetProjectAsync(projectId);
                if (app == null)
                {
                    return new Response(Messages.InvalidProjectId);
                }
                compositeRoleService.DeleteCompositeRole(projectId, id);
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
