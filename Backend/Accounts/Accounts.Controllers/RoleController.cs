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
        private readonly IAuthorizationService authorizationService;
        private readonly IAzValueService azValueService;
        private readonly IApplicationService applicationService;

        public RoleController(IAuthenticationService<User> accountService, IRoleService<User> roleService, IAzObjectService azObjectService, IAzFieldService azFieldService, IAuthorizationService authorizationService, IAzValueService azValueService, IApplicationService applicationService)
        {
            this.roleService = roleService;
            this.accountService = accountService;
            this.azObjectService = azObjectService;
            this.azFieldService = azFieldService;
            this.authorizationService = authorizationService;
            this.azValueService = azValueService;
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
                var _azObjects = azObjectService.GetAzObjects(projectId);
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
                var _authorizationList = authorizationService.GetAuthorizationsByRoleId(projectId, id);
                if (_authorizationList.Count != 0)
                {
                    for (int i = 0; i < _authorizationList.Count; i++)
                    {
                        int authorizationId = _authorizationList[i].Id;
                        var azValues = azValueService.GetAzValueByAuthorizationId(authorizationId);
                        var objectId = _authorizationList[i].ObjectId;
                        var selectedObject = azObjectService.GetAzObjectById(projectId, objectId);
                        if (selectedObject is null)
                        {
                            return new Response<RoleDetailsDTO>(Messages.InvalidInfo);
                        }
                        if (azValues.Count == 0)
                        {
                            var _azFields = azFieldService.GetAzFieldsByObjectId(projectId, objectId);
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
                                var _azField = azFieldService.GetAzField(azValues[j].FieldId);
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

        //[EnableCors("react")]
        //[HttpGet("azObjects/{projectId}")]
        //public async Task<Response<List<AzObjectDTO>>> GetAzObjects(string projectId)
        //{
        //    try
        //    {
        //        if (string.IsNullOrEmpty(projectId))
        //            return new Response<List<AzObjectDTO>>(Messages.InvalidInfo);
        //        var app = await accountService.GetProjectAsync(projectId);
        //        if (app == null)
        //        {
        //            return new Response<List<AzObjectDTO>>(Messages.InvalidInfo);
        //        }
        //        var _azObjects = azObjectService.GetAzObjects(projectId);
        //        var result = _azObjects.MapTo<AzObjectDTO>().ToList();
        //        return new Response<List<AzObjectDTO>>(result);
        //    }
        //    catch (Exception ex)
        //    {

        //        throw;
        //    }

        //}

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
                var _azFields = azFieldService.GetAzFieldsByObjectId(projectId, objectId);
                var selectedObject = azObjectService.GetAzObjectById(projectId, objectId);
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
                    authorizationService.InsertAuthorization(authorizationModel);
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
                                azValueService.InsertAzValue(azValue);
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
                var _authorizations = authorizationService.GetAuthorizationsByRoleId(model.ProjectId, model.Id);
                if (_authorizations.Count != 0)
                {
                    for (int i = 0; i < _authorizations.Count; i++)
                    {
                        int authorizationId = _authorizations[i].Id;
                        var azValues = azValueService.GetAzValueByAuthorizationId(authorizationId);
                        if (azValues.Count != 0)
                        {
                            azValueService.DeleteAzValues(azValues);
                        }
                        authorizationService.DeleteAuthorization(authorizationId);
                    }
                }
                //....................................add Authorization
                for (int i = 0; i < model.Authorizations.Count; i++)
                {
                    var authorizationModel = new Authorization { RoleId = role.Id, ProjectId = model.ProjectId, ObjectId = model.Authorizations[i].Id };
                    authorizationService.InsertAuthorization(authorizationModel);
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
                                azValueService.InsertAzValue(azValue);
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
                var _authorizations = authorizationService.GetAuthorizationsByRoleId(projectId, id);
                if (_authorizations.Count != 0)
                {
                    for (int i = 0; i < _authorizations.Count; i++)
                    {
                        int authorizationId = _authorizations[i].Id;
                        var azValues = azValueService.GetAzValueByAuthorizationId(authorizationId);
                        if (azValues.Count != 0)
                        {
                            azValueService.DeleteAzValues(azValues);
                        }
                        authorizationService.DeleteAuthorization(authorizationId);
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
