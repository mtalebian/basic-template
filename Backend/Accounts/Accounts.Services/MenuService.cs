using Accounts.Core;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Accounts.Services
{
    internal class MenuService : IMenuService
    {
        protected IAccountUnitOfWork<User> db { get; }
        private readonly AccountsConfig _AccountsConfig;


        public MenuService(IOptions<AccountsConfig> accountsConfig, IAccountUnitOfWork<User> db)
        {
            this.db = db;
            _AccountsConfig = accountsConfig.Value;
        }


        public IList<Project> GetProjects()
        {
            return db.Projects.GetAll();
        }

        public void Insert(Project item)
        {
            db.Projects.Add(item);
            db.SaveChanges();
        }

        public void Update(Project item)
        {
            db.Projects.Update(item);
            db.SaveChanges();
        }

        public void DeleteProjects(string[] idList)
        {
            foreach (var app in db.Projects.GetAll())
            {
                if (idList.Contains(app.Id))
                    db.Projects.Remove(app);
            }
            db.SaveChanges();
        }

        public IList<MenuFolder> GetMenuFolders(string projectId)
        {
            return db.MenuFolders.Where(x => x.ProjectId == projectId);
        }

        public void Insert(MenuFolder item)
        {
            db.MenuFolders.Add(item);
            db.SaveChanges();
        }

        public void Update(MenuFolder item)
        {
            db.MenuFolders.Update(item);
            db.SaveChanges();
        }

        public void DeleteFolder(string projectId, string id)
        {
            var list = db.MenuFolders.Where(x => x.ProjectId == projectId && x.Id == id);
            if (list.Count != 1) throw new Exception("Record not found!");
            db.MenuFolders.Remove(list[0]);
            db.SaveChanges();
        }



        public IList<Menu> GetMenus(string projectId)
        {
            return db.Menus.Where(x => x.ProjectId == projectId);
        }

        public void Insert(Menu item)
        {
            db.Menus.Add(item);
            db.SaveChanges();
        }

        public void Update(Menu item)
        {
            db.Menus.Update(item);
            db.SaveChanges();
        }

        public void DeleteMenu(string projectId, string id)
        {
            var list = db.Menus.Where(x => x.ProjectId == projectId && x.Id == id);
            if (list.Count != 1) throw new Exception("Record not found!");
            db.Menus.Remove(list[0]);
            db.SaveChanges();
        }

    }
}