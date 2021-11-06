using Accounts.Core;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Services
{
    internal class RoleService<TUser> : IRoleService<TUser> where TUser : User
    {
        private protected IAccountUnitOfWork<User> db { get; }
        public RoleService(IAccountUnitOfWork<User> db)
        {
            this.db = db;
        }

        public IList<Role> GetAllRoles(string projectId)
        {
            return db.Roles.Where(item => item.ProjectId == projectId);
        }

        public Role GetRoleById(string projectId, string id)
        {
            return db.Roles.FirstOrDefault(x => x.Id == id && x.ProjectId == projectId);
        }

        public void InsertRole(Role item)
        {
            db.Roles.Add(item);
            db.SaveChanges();
        }

        public Role UpdateRole(Role item)
        {
            db.Roles.Update(item);
            db.SaveChanges();
            return item;
        }

        public void DeleteRole(string projectId, string id)
        {
            var role = GetRoleById(projectId, id);
            if (role is null) throw new Exception("Record not found!");
            db.Roles.Remove(role);
            db.SaveChanges();
        }
    }
}
