using Accounts.Core;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Services
{
    internal class AuthorizationService : IAuthorizationService
    {
        private protected IAccountUnitOfWork<User> db { get; }
        public AuthorizationService(IAccountUnitOfWork<User> db)
        {
            this.db = db;
        }
        public Authorization GetAuthorization(int id)
        {
            return db.Authorizations.Where(x => x.Id == id).FirstOrDefault();
        }
        public IList<Authorization> GetAuthorizationsByRoleId(string projectId, string roleId)
        {
            return db.Authorizations.Where(x => x.ProjectId == projectId && x.RoleId == roleId).ToList();
        }
        public void InsertAuthorization(Authorization item)
        {
            db.Authorizations.Add(item);
            db.SaveChanges();
        }
        public void DeleteAuthorization(int id)
        {
            var authorization = GetAuthorization(id);
            if (authorization is null) throw new Exception("Record not found!");
            db.Authorizations.Remove(authorization);
            db.SaveChanges();
        }

    }
}
