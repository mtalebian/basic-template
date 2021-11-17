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
        IRoleService roleService;
        private readonly IApplicationService applicationService;

        public RoleController(IAuthenticationService<User> accountService,IRoleService roleService, IApplicationService applicationService)
        {
            this.roleService = roleService;
            this.accountService = accountService;
            this.applicationService = applicationService;
        }

        [EnableCors("react")]
        [HttpGet("roles/{projectId}")]
        public async Task<Response<RolesInfoDTO>> GetRoles(string projectId)
        {
            try
            {
                var app = await accountService.GetProjectAsync(projectId);
                if (app == null)
                {
                    return new Response<RolesInfoDTO>(Messages.InvalidProjectId);
                }
                var _azObjects = roleService.GetAzObjects(projectId);
                var listAzObjects = _azObjects.MapTo<AzObjectDTO>().ToList();
                var _roles = roleService.GetAllRoles(projectId);
                var listRoles = _roles
                .Select(c => new RoleDTO
                {
                    ApplicationTitle = c.ApplicationId != null ? c.Application.Title : "",
                    Id = c.Id,
                    Title = c.Title,

                }).ToList();
                var result = new RolesInfoDTO()
                {
                    Roles = listRoles,
                    AzObjects = listAzObjects
                };
                return new Response<RolesInfoDTO>(result);
            }
            catch (Exception)
            {
                throw;
            }

        }

        [EnableCors("react")]
        [HttpGet("role-by-id/{projectId}/{id}")]
        public async Task<Response<RoleDetailsDTO>> GetRoleById(string projectId, string id)
        {
            try
            {
                if (string.IsNullOrEmpty(projectId) || string.IsNullOrEmpty(id))
                    return new Response<RoleDetailsDTO>(Messages.InvalidInfo);

                var app = await accountService.GetProjectAsync(projectId);
                if (app == null)
                {
                    return new Response<RoleDetailsDTO>(Messages.InvalidProjectId);
                }
                var _role = roleService.GetRoleById(projectId, id);
                if (_role is null)
                    return new Response<RoleDetailsDTO>(Messages.NotFoundInformation);

                var AuthorizationList = new List<AuthorizationDTO>();
                var AzFieldsList = new List<AzFieldDTO>();
                var _authorizationList = roleService.GetAuthorizationsByRoleId(projectId, id);
                if (_authorizationList.Count != 0)
                {
                    for (int i = 0; i < _authorizationList.Count; i++)
                    {
                        int authorizationId = _authorizationList[i].Id;
                        var azValues = roleService.GetAzValueByAuthorizationId(authorizationId);
                        var objectId = _authorizationList[i].ObjectId;
                        var selectedObject = roleService.GetAzObjectById(projectId, objectId);
                        if (selectedObject is null)
                        {
                            return new Response<RoleDetailsDTO>(Messages.InvalidInfo);
                        }
                        if (azValues.Count == 0)
                        {
                            var _azFields = roleService.GetAzFieldsByObjectId(projectId, objectId);
                            for (int j = 0; j < _azFields.Count; j++)
                            {
                                AzFieldsList.Add(new AzFieldDTO() { Id = _azFields[j].Id, Title = _azFields[j].Title, Value = "" });
                            }
                            AuthorizationList.Add(new AuthorizationDTO { Fields = AzFieldsList, Id = objectId, Title = selectedObject.Title });
                            AzFieldsList = new List<AzFieldDTO>();
                        }
                        else
                        {
                            for (int j = 0; j < azValues.Count; j++)
                            {
                                var _azField = roleService.GetAzField(azValues[j].FieldId);
                                var fieldMultiValue = AzFieldsList.FirstOrDefault(x => x.Id == _azField.Id);
                                if (fieldMultiValue != null)
                                {
                                    fieldMultiValue.Value = string.Join(",", fieldMultiValue.Value, azValues[j].Value);
                                }
                                else
                                {
                                    AzFieldsList.Add(new AzFieldDTO() { Id = _azField.Id, Title = _azField.Title, Value = azValues[j].Value });
                                }
                                if (j == azValues.Count - 1 || azValues[j].ObjectId != azValues[j + 1].ObjectId)
                                {
                                    AuthorizationList.Add(new AuthorizationDTO { Fields = AzFieldsList, Id = selectedObject.Id, Title = selectedObject.Title });
                                    AzFieldsList = new List<AzFieldDTO>();
                                }
                            }
                        }

                    }
                }
                var result = new RoleDetailsDTO()
                {
                    Id = _role.Id,
                    ApplicationTitle = _role.ApplicationId != null ? _role.Application.Title : "",
                    Title = _role.Title,
                    Authorizations = AuthorizationList
                };
                return new Response<RoleDetailsDTO>(result);
            }
            catch (Exception)
            {
                throw;
            }

        }

        [EnableCors("react")]
        [HttpPost("azObjectFields/{projectId}/{objectId}")]
        public async Task<Response<AuthorizationDTO>> GetAzObjectFields(string projectId, string objectId)
        {
            try
            {
                if (string.IsNullOrEmpty(projectId))
                    return new Response<AuthorizationDTO>(Messages.InvalidInfo);
                var app = await accountService.GetProjectAsync(projectId);
                if (app is null)
                {
                    return new Response<AuthorizationDTO>(Messages.InvalidInfo);
                }
                var _azFields = roleService.GetAzFieldsByObjectId(projectId, objectId);
                var selectedObject = roleService.GetAzObjectById(projectId, objectId);
                if (_azFields is null || selectedObject is null)
                {
                    return new Response<AuthorizationDTO>(Messages.InvalidInfo);
                }
                var Fields = _azFields.MapTo<AzFieldDTO>().ToList();
                var result = new AuthorizationDTO() { Fields = Fields, Id = selectedObject.Id, Title = selectedObject.Title };
                return new Response<AuthorizationDTO>(result);
            }
            catch (Exception)
            {
                throw;
            }

        }

        [EnableCors("react")]
        [HttpPost("insert-role")]
        public async Task<Response<RoleDTO>> InsertRole([FromBody] RoleEditDTO model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return new Response<RoleDTO>(string.Join(",", ModelState.GetModelStateErrors()));
                }
                var recentRole = roleService.GetRoleById(model.ProjectId, model.Id);
                if (recentRole is not null)
                {
                    return new Response<RoleDTO>(Messages.DuplicateRole);
                }
                var currentUser = await GetUserAsync();
                if (string.IsNullOrEmpty(currentUser.UserName))
                {
                    return new Response<RoleDTO>(Messages.Error401);
                }
                string applicationId = null;
                if (!string.IsNullOrEmpty(model.ApplicationTitle))
                {
                    var application = applicationService.GetApplicationByTitle(model.ApplicationTitle);
                    if (application is null)
                    {
                        return new Response<RoleDTO>(Messages.InvalidApplication);
                    }
                    applicationId = application.Id;
                }
                //..................................
                var role = new Role()
                {
                    ProjectId = model.ProjectId,
                    Id = model.Id,
                    ApplicationId = applicationId,
                    Title = model.Title,
                    LastUpdatedBy = currentUser.UserName,
                    CreatedAt = DateTime.Now,
                    CreatedBy = currentUser.UserName,
                };
                roleService.InsertRole(role);
                var roleId = role.Id;
                //..............................
                for (int i = 0; i < model.Authorizations.Count; i++)
                {
                    var authorizationModel = new Authorization { RoleId = role.Id, ProjectId = model.ProjectId, ObjectId = model.Authorizations[i].Id };
                    roleService.InsertAuthorization(authorizationModel);
                    var authorizationId = authorizationModel.Id;
                    var authorization = model.Authorizations[i];
                    var fields = authorization.Fields;
                    for (int j = 0; j < fields.Count; j++)
                    {
                        if (!string.IsNullOrEmpty(fields[j].Value))
                        {
                            var fieldValues = fields[j].Value?.Split(',');
                            for (int k = 0; k < fieldValues.Length; k++)
                            {
                                var azValue = new AzValue { AuthorizationId = authorizationId, ObjectId = authorization.Id, FieldId = fields[j].Id, Value = fieldValues[k] };
                                roleService.InsertAzValue(azValue);
                            }
                        }
                    }
                }
                //.................................
                var result = new RoleDTO() { Id = role.Id, ApplicationTitle = role.ApplicationId != null ? role.Application.Title : "", Title = role.Title };
                return new Response<RoleDTO>(result);
            }
            catch (Exception)
            {
                throw;
            }

        }

        [EnableCors("react")]
        [HttpPut("update-role")]
        public async Task<Response<RoleDTO>> UpdateRole([FromBody] RoleEditDTO model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return new Response<RoleDTO>(string.Join(",", ModelState.GetModelStateErrors()));
                }
                var role = roleService.GetRoleById(model.ProjectId, model.Id);
                if (role is null)
                {
                    return new Response<RoleDTO>(Messages.InvalidInfo);
                }
                var currentUser = await GetUserAsync();
                if (string.IsNullOrEmpty(currentUser.UserName))
                {
                    return new Response<RoleDTO>(Messages.Error401);
                }
                string applicationId = null;
                if (!string.IsNullOrEmpty(model.ApplicationTitle))
                {
                    var application = applicationService.GetApplicationByTitle(model.ApplicationTitle);
                    if (application is null)
                    {
                        return new Response<RoleDTO>(Messages.InvalidApplication);
                    }
                    applicationId = application.Id;
                }
                role.ApplicationId = applicationId;
                role.Title = model.Title;
                role.LastUpdate = DateTime.Now;
                role.LastUpdatedBy = currentUser.UserName;
                
                //..............................remove Authorization
                var _authorizations = roleService.GetAuthorizationsByRoleId(model.ProjectId, model.Id);
                if (_authorizations.Count != 0)
                {
                    for (int i = 0; i < _authorizations.Count; i++)
                    {
                        int authorizationId = _authorizations[i].Id;
                        var azValues = roleService.GetAzValueByAuthorizationId(authorizationId);
                        if (azValues.Count != 0)
                        {
                            roleService.DeleteAzValues(azValues);
                        }
                        roleService.DeleteAuthorization(authorizationId);
                    }
                }
                //....................................add Authorization
                for (int i = 0; i < model.Authorizations.Count; i++)
                {
                    var authorizationModel = new Authorization { RoleId = role.Id, ProjectId = model.ProjectId, ObjectId = model.Authorizations[i].Id };
                    roleService.InsertAuthorization(authorizationModel);
                    var authorizationId = authorizationModel.Id;
                    var authorization = model.Authorizations[i];
                    var fields = authorization.Fields;
                    for (int j = 0; j < fields.Count; j++)
                    {
                        if (!string.IsNullOrEmpty(fields[j].Value))
                        {
                            var fieldValues = fields[j].Value?.Split(',');
                            for (int k = 0; k < fieldValues.Length; k++)
                            {
                                var azValue = new AzValue { AuthorizationId = authorizationId, ObjectId = authorization.Id, FieldId = fields[j].Id, Value = fieldValues[k] };
                                roleService.InsertAzValue(azValue);
                            }
                        }
                    }
                }

                roleService.UpdateRole(role);
                var result = new RoleDTO() { Id = role.Id, ApplicationTitle = role.ApplicationId != null ? role.Application.Title : "", Title = role.Title };
                return new Response<RoleDTO>(result);
            }
            catch (Exception)
            {
                throw;
            }

        }


        [EnableCors("react")]
        [HttpDelete("delete-role/{projectId}/{id}")]
        public async Task<Response> DeleteRole(string projectId, string id)
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
                var _authorizations = roleService.GetAuthorizationsByRoleId(projectId, id);
                if (_authorizations.Count != 0)
                {
                    for (int i = 0; i < _authorizations.Count; i++)
                    {
                        int authorizationId = _authorizations[i].Id;
                        var azValues = roleService.GetAzValueByAuthorizationId(authorizationId);
                        if (azValues.Count != 0)
                        {
                            roleService.DeleteAzValues(azValues);
                        }
                        roleService.DeleteAuthorization(authorizationId);
                    }
                }
                roleService.DeleteRole(projectId, id);
                return new Response();
            }
            catch (Exception)
            {
                throw;
            }

        }

        //............................................................
        [EnableCors("react")]
        [HttpGet("composite-roles/{projectId}")]
        public async Task<Response<List<CompositeRolesDTO>>> GetCompositeRoles(string projectId)
        {
            var app = await accountService.GetProjectAsync(projectId);
            if (app == null)
            {
                return new Response<List<CompositeRolesDTO>>(Messages.InvalidProjectId);
            }
            var _compositeRoles = roleService.GetAllCompositeRoles(projectId);
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
                var _compositeRole = roleService.GetCompositeRoleById(projectId, id);
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
                var recentCompositeRole = roleService.GetCompositeRoleById(model.ProjectId, model.Id);
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
                roleService.InsertCompositeRole(newCompositeRole);
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
                var compositeRole = roleService.GetCompositeRoleById(model.ProjectId, model.Id);
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
                roleService.UpdateCompositeRole(compositeRole);
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
                roleService.DeleteCompositeRole(projectId, id);
                return new Response();
            }
            catch (Exception)
            {
                throw;
            }

        }

        //..............................................................
        [EnableCors("react")]
        [HttpGet("user-roles/{projectId}/{userId}")]
        public async Task<Response<List<UserRoleGridDTO>>> GetUserRoles(string projectId, long userId)
        {
            var app = await accountService.GetProjectAsync(projectId);
            if (app == null)
            {
                return new Response<List<UserRoleGridDTO>>(Messages.InvalidProjectId);
            }
            var _userRoles = roleService.GetAllUserRole(projectId, userId);
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
                var recentUserRole = roleService.GetUserRole(model.ProjectId, model.RoleId, model.UserId);
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
                roleService.InsertUserRole(userRole);
                var lastUserRole = roleService.GetUserRole(model.ProjectId, model.RoleId, model.UserId);
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
                roleService.DeleteUserRole(projectId, roleId, userId);
                return new Response();
            }
            catch (Exception)
            {
                throw;
            }

        }

        //..........................................................
        [EnableCors("react")]
        [HttpGet("user-composite-roles/{projectId}/{userId}")]
        public async Task<Response<List<UserCompositeRoleGridDTO>>> GetUserCompositeRoles(string projectId, long userId)
        {
            var app = await accountService.GetProjectAsync(projectId);
            if (app == null)
            {
                return new Response<List<UserCompositeRoleGridDTO>>(Messages.InvalidProjectId);
            }
            var _userCompositeRoles = roleService.GetAllUserCompositeRole(projectId, userId);
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
                var recentUserCompositeRole = roleService.GetUserCompositeRole(model.ProjectId, model.RoleId, model.UserId);
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
                var compositeRole = roleService.GetCompositeRoleById(model.ProjectId, model.RoleId);
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
                roleService.InsertUserCompositeRole(userCompositeRole);
                var lastUserCompositeRole = roleService.GetUserCompositeRole(model.ProjectId, model.RoleId, model.UserId);
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
                roleService.DeleteUserCompositeRole(projectId, compositeRoleId, userId);
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
