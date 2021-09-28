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
    public class MenuController : ControllerBase
    {
        private readonly IAuthenticationService<User> service;
        private readonly IMenuService sys;
        private readonly IConfiguration _Configuration;



        public MenuController(IConfiguration configuration, IMenuService menuService, IAuthenticationService<User> accountService)
        {
            _Configuration = configuration;
            this.sys = menuService;
            this.service = accountService;
        }


        [EnableCors("react")]
        [HttpPost("my-menu/{projectId}")]
        public async Task<Response<MyMenuDTO>> MyMenu(string projectId)
        {
            var user = await service.GetUserByNameAsync(User.Identity.Name);
            var my_menu = new MyMenuDTO
            {
                MenuFolders = (await service.GetMenuFoldersAsync(projectId, user.Id)).MapTo<MenuFolderDTO>(),
                Menus = (await service.GetMenusAsync(projectId, user.Id)).MapTo<MenuDTO>()
            };
            //my_menu.MenuFolders = RemoveEmptyFolders(my_menu.MenuFolders, my_menu.Menus);
            return new Response<MyMenuDTO>(my_menu);
        }


        private IList<MenuFolderDTO> RemoveEmptyFolders(IList<MenuFolderDTO> folders, IList<MenuDTO> menus)
        {
            var list = new List<MenuFolderDTO>();
            var parents = folders.Where(f => menus.Any(m => m.ParentId == f.Id)).ToList();
            var n = AddDistinct(list, parents);

            while (n > 0)
            {
                parents = folders.Where(f => parents.Any(p => p.ParentId == f.Id)).ToList();
                n = AddDistinct(list, parents);
            }
            return list;
        }

        private int AddDistinct(List<MenuFolderDTO> list, List<MenuFolderDTO> items)
        {
            var hs = new HashSet<string>();
            var n = 0;
            foreach (var x in list) hs.Add(x.Id);
            foreach (var item in items)
            {
                if (!hs.Contains(item.Id))
                {
                    hs.Add(item.Id);
                    list.Add(item);
                    n += 1;
                }
            }
            return n;
        }



        [EnableCors("react")]
        [HttpPost("load/{id}")]
        public Response Load(string id)
        {
            return new Response(new
            {
                Projects = sys.GetProjects().MapTo<ProjectDTO>(),
                MenuFolders = sys.GetMenuFolders(id).MapTo<MenuFolderDTO>(),
                Menus = sys.GetMenus(id).MapTo<MenuDTO>()
            });
        }



        [EnableCors("react")]
        [HttpPost("insert-project")]
        public Response<IList<ProjectDTO>> InsertProject([FromBody] ProjectDTO model)
        {
            var item = model.MapTo<Project>();
            sys.Insert(item);
            var result = sys.GetProjects().MapTo<ProjectDTO>();
            return new Response<IList<ProjectDTO>>(result);
        }


        [EnableCors("react")]
        [HttpPost("update-project")]
        public Response<IList<ProjectDTO>> UpdateProject([FromBody] ProjectDTO model)
        {
            var item = sys.GetProjects().First(x => x.Id == model.Id);
            model.MapTo(item);
            sys.Update(item);
            var result = sys.GetProjects().MapTo<ProjectDTO>();
            return new Response<IList<ProjectDTO>>(result);
        }

        [EnableCors("react")]
        [HttpPost("delete-project")]
        public Response<IList<ProjectDTO>> DeleteProject([FromBody] string[] idList)
        {
            sys.DeleteProjects(idList);
            var result = sys.GetProjects().MapTo<ProjectDTO>();
            return new Response<IList<ProjectDTO>>(result);
        }






        [EnableCors("react")]
        [HttpPost("insert-folder/{projectId}")]
        public Response<MenuFolderDTO> InsertMenuFolder(string projectId, [FromBody] MenuFolderDTO model)
        {
            var item = model.MapTo<MenuFolder>();
            item.ProjectId = projectId;
            sys.Insert(item);
            var result = item.MapTo<MenuFolderDTO>();
            return new Response<MenuFolderDTO>(result);
        }


        [EnableCors("react")]
        [HttpPost("update-folder/{projectId}")]
        public Response<MenuFolderDTO> UpdateMenuFolder(string projectId, [FromBody] MenuFolderDTO model)
        {
            var item = sys.GetMenuFolders(projectId).First(x => x.Id == model.Id);
            model.MapTo(item);
            sys.Update(item);
            var result = item.MapTo<MenuFolderDTO>();
            return new Response<MenuFolderDTO>(result);
        }

        [EnableCors("react")]
        [HttpPost("delete-folder/{projectId}/{id}")]
        public Response DeleteMenuFolder(string projectId, string id)
        {
            sys.DeleteFolder(projectId, id);
            return new Response();
        }






        [EnableCors("react")]
        [HttpPost("insert-menu/{projectId}")]
        public Response<MenuDTO> InsertMenu(string projectId, [FromBody] MenuDTO model)
        {
            var item = model.MapTo<Menu>();
            item.ProjectId = projectId;
            sys.Insert(item);
            var result = item.MapTo<MenuDTO>();
            return new Response<MenuDTO>(result);
        }


        [EnableCors("react")]
        [HttpPost("update-menu/{projectId}")]
        public Response<MenuDTO> UpdateMenu(string projectId, [FromBody] MenuDTO model)
        {
            var item= sys.GetMenus(projectId).First(x => x.Id == model.Id);
            model.MapTo(item);
            sys.Update(item);
            var result = item.MapTo<MenuDTO>();
            return new Response<MenuDTO>(result);
        }

        [EnableCors("react")]
        [HttpPost("delete-menu/{projectId}/{id}")]
        public Response DeleteMenu(string projectId, string id)
        {
            sys.DeleteMenu(projectId, id);
            return new Response();
        }

    }
}
