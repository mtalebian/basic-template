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
    public class UserManagmentController : ControllerBase
    {
        private readonly IAuthenticationService<User> service;
        private readonly IConfiguration _Configuration;
        internal const string SecurityKeyCookieName = "x-security-key";

        public UserManagmentController(IAuthenticationService<User> accountService, IConfiguration configuration)
        {
            this.service = accountService;
            _Configuration = configuration;
        }

        //[EnableCors("react")]
        //[HttpPost("insert-project")]
        //public Response<MenuFolderDTO> InsertMenuFolder(string projectId, [FromBody] MenuFolderDTO model)
        //{
        //    var item = model.MapTo<MenuFolder>();
        //    item.ProjectId = projectId;
        //    sys.Insert(item);
        //    var result = item.MapTo<MenuFolderDTO>();
        //    return new Response<MenuFolderDTO>(result);
        //}
    }
}
