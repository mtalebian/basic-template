using Accounts.Core;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Services
{
    internal class UserCompositeRoleService : IUserCompositeRoleService
    {
        private protected IAccountUnitOfWork<User> db { get; }
        public UserCompositeRoleService( IAccountUnitOfWork<User> db)
        {
            this.db = db;
        }
        public IList<UserCompositeRole> GetAllUserCompositeRole(string projectId, long userId)
        {
            return db.UserCompositeRoles.GetAllUserCompositeRole(projectId,userId);
        }

        public UserCompositeRole GetUserCompositeRole(string projectId, string compositeRoleId, long userId)
        {
            return db.UserCompositeRoles.GetUserCompositeRole(projectId, compositeRoleId, userId);
        }

        public void InsertUserCompositeRole(UserCompositeRole userCompositeRole)
        {
            db.UserCompositeRoles.Add(userCompositeRole);
            db.SaveChanges();
        }

        public void DeleteUserCompositeRole(string projectId, string compositeRoleId, long userId)
        {
            var userCompositeRole = GetUserCompositeRole(projectId, compositeRoleId, userId);
            if (userCompositeRole is null) throw new Exception("Record not found!");
            db.UserCompositeRoles.Remove(userCompositeRole);
            db.SaveChanges();
        }
    }
}
