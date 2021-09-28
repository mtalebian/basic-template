using System.Collections.Generic;

namespace Accounts.Core
{
    public interface IMenuService
    {
        IList<Project> GetProjects();
        void Insert(Project item);
        void Update(Project item);
        void DeleteProjects(string[] idList);

        IList<MenuFolder> GetMenuFolders(string projectId);
        void Insert(MenuFolder item);
        void Update(MenuFolder item);
        void DeleteFolder(string projectId, string id);


        IList<Menu> GetMenus(string projectId);
        void Insert(Menu item);
        void Update(Menu item);
        void DeleteMenu(string projectId, string id);
    }
}