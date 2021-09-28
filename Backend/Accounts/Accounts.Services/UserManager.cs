using Accounts.Core;
using Microsoft.Extensions.Options;
using System.Collections.Generic;

namespace Accounts.Services
{
    internal class AuthenticationService<TUser> : IAuthorizationService<TUser> where TUser : User
    {
        protected IAccountUnitOfWork<TUser> db { get; }
        private readonly AccountsConfig _AccountsConfig;


        public AuthenticationService(IOptions<AccountsConfig> accountsConfig, IAccountUnitOfWork<TUser> db)
        {
            this.db = db;
            _AccountsConfig = accountsConfig.Value;
        }



        public IList<Role> GetAllRoles(string projectId)
        {
            return db.Roles.Where(x => x.ProjectId == projectId);
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

        public void UpdateRole(Role item)
        {
            db.Roles.Update(item);
            db.SaveChanges();
        }

        public void DeleteRole(Role item)
        {
            db.Roles.Remove(item);
            db.SaveChanges();
        }
    }
}