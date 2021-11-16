using Accounts.Core;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Services
{
    internal class UserRoleService : IUserRoleService
    {
        private protected IAccountUnitOfWork<User> db { get; }
        private readonly AccountsConfig _AccountsConfig;
        public UserRoleService(IOptions<AccountsConfig> accountsConfig, IAccountUnitOfWork<User> db)
        {
            this.db = db;
            this._AccountsConfig = accountsConfig.Value;
        }

        public IList<UserRole> GetAllUserRole(string projectId, long userId)
        {
            return db.UserRoles.GetAllUserRole(projectId,userId);
        }

        public UserRole GetUserRole(string projectId, string roleId, long userId)
        {
            return db.UserRoles.GetUserRole(projectId, roleId, userId);
        }

        public void InsertUserRole(UserRole userRole)
        {
            db.UserRoles.Add(userRole);
            db.SaveChanges();
        }

        public void DeleteUserRole(string projectId, string roleId, long userId)
        {
            var userRole = GetUserRole(projectId,roleId,userId);
            if (userRole is null) throw new Exception("Record not found!");
            db.UserRoles.Remove(userRole);
            db.SaveChanges();
        }
    }
}
