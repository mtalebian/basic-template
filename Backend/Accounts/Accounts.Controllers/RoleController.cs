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
    public class RoleController : ControllerBase
    {
        private readonly IAuthenticationService<User> accountService;
        private readonly IRoleService<User> roleService;
        private readonly IAzObjectService azObjectService;
        private readonly IAzFieldService azFieldService;

        public RoleController(IAuthenticationService<User> accountService, IRoleService<User> roleService,IAzObjectService azObjectService,IAzFieldService azFieldService)
        {
            this.roleService = roleService;
            this.accountService = accountService;
            this.azObjectService = azObjectService;
            this.azFieldService = azFieldService;
        }

        [EnableCors("react")]
        [HttpGet("roles/{projectId}")]
        public async Task<Response<List<RoleDTO>>> GetRoles(string projectId)
        {
            var app = await accountService.GetProjectAsync(projectId);
            if (app == null)
            {
                return new Response<List<RoleDTO>>(Messages.InvalidProjectId);
            }
            var result = new List<RoleDTO>();
            var _roles = roleService.GetAllRoles(projectId);
            if (_roles.Count != 0)
                result = _roles.MapTo<RoleDTO>().ToList();
            return new Response<List<RoleDTO>>(result);
        }

        [EnableCors("react")]
        [HttpGet("role-by-id/{projectId}/{id}")]
        public async Task<Response<RoleDTO>> GetRoleById(string projectId, string id)
        {

            if (string.IsNullOrEmpty(projectId) || string.IsNullOrEmpty(id))
                return new Response<RoleDTO>(Messages.InvalidInfo);

            var app = await accountService.GetProjectAsync(projectId);
            if (app == null)
            {
                return new Response<RoleDTO>(Messages.InvalidProjectId);
            }


            RoleDTO result = new RoleDTO();
            var _role = roleService.GetRoleById(projectId, id);
            if (_role is null)
                return new Response<RoleDTO>(Messages.NotFoundInformation);
            result = _role.MapTo<RoleDTO>();
            return new Response<RoleDTO>(result);
        }

        [EnableCors("react")]
        [HttpGet("azObjects/{projectId}")]
        public async Task<Response<List<AzObjectDTO>>> GetAzObjects(string projectId)
        {
            if (string.IsNullOrEmpty(projectId))
                return new Response<List<AzObjectDTO>>(Messages.InvalidInfo);
            var app = await accountService.GetProjectAsync(projectId);
            if (app == null)
            {
                return new Response<List<AzObjectDTO>>(Messages.InvalidInfo);
            }
            var _azObjects = azObjectService.GetAzObjects(projectId);
            var result = _azObjects.MapTo<AzObjectDTO>().ToList();
            return new Response<List<AzObjectDTO>>(result);
        }

        [EnableCors("react")]
        [HttpPost("azObjectFields/{projectId}/{objectId}")]
        public async Task<Response<AzAuthorizationDTO>> GetAzObjectFields(string projectId,string objectId)
        {
            if (string.IsNullOrEmpty(projectId))
                return new Response<AzAuthorizationDTO>(Messages.InvalidInfo);
            var app = await accountService.GetProjectAsync(projectId);
            if (app is null)
            {
                return new Response<AzAuthorizationDTO>(Messages.InvalidInfo);
            }
            var _azFields= azFieldService.GetAzFieldsByObjectId(projectId,objectId);
            var selectedObject = azObjectService.GetAzObjectById(projectId, objectId);
            if (_azFields is null || selectedObject is null)
            {
                return new Response<AzAuthorizationDTO>(Messages.InvalidInfo);
            }
            var Fields = _azFields.MapTo<AzFieldDTO>().ToList();
            var result = new AzAuthorizationDTO() { Fields = Fields, Id = selectedObject.Id, Title = selectedObject.Title };
            return new Response<AzAuthorizationDTO>(result);
        }

        [EnableCors("react")]
        [HttpPost("insert-role")]
        public async Task<Response<RoleInsertDTO>> InsertRole([FromBody] RoleInsertDTO model)
        {
            if (!ModelState.IsValid)
            {
                return new Response<RoleInsertDTO>(string.Join(",", ModelState.GetModelStateErrors()));
            }
            var role = roleService.GetRoleById(model.ProjectId, model.Id);
            if (role is not null)
            {
                return new Response<RoleInsertDTO>(Messages.DuplicateRole);
            }
            role = model.MapTo<Role>();
            var currentUser = await GetUserAsync();
            if (currentUser is null)
            {
                return new Response<RoleInsertDTO>(Messages.Error401);
            }
            role.CreatedBy = currentUser.UserName;
            roleService.InsertRole(role);
            var result = role.MapTo<RoleInsertDTO>();
            return new Response<RoleInsertDTO>(result);
        }


        [EnableCors("react")]
        [HttpDelete("delete-role/{projectId}/{id}")]
        public Response DeleteRole(string projectId, string id)
        {
            roleService.DeleteRole(projectId, id);
            return new Response();
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
