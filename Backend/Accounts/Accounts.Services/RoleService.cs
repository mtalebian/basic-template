using Accounts.Core;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Services
{
    internal class RoleService : IRoleService
    {

        private protected IAccountUnitOfWork<User> db { get; }
        public RoleService(IAccountUnitOfWork<User> db)
        {
            this.db = db;
        }

        //...........................................Role
        public IList<Role> GetAllRoles(string projectId)
        {
            return db.Roles.GetAll(projectId);
        }

        public Role GetRoleById(string projectId, string id)
        {
            return db.Roles.GetRoleById(projectId, id);
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

        //..............................................UserRole

        public IList<UserRole> GetAllUserRole(string projectId, long userId)
        {
            return db.UserRoles.GetAllUserRole(projectId, userId);
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
            var userRole = GetUserRole(projectId, roleId, userId);
            if (userRole is null) throw new Exception("Record not found!");
            db.UserRoles.Remove(userRole);
            db.SaveChanges();
        }

        //..............................................UserCompositeRole
        public IList<UserCompositeRole> GetAllUserCompositeRole(string projectId, long userId)
        {
            return db.UserCompositeRoles.GetAllUserCompositeRole(projectId, userId);
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
        //................................................CompositeRoles
        public IList<CompositeRole> GetAllCompositeRoles(string projectId)
        {
            return db.CompositeRoles.Where(x => x.ProjectId == projectId).ToList();
        }
        public CompositeRole GetCompositeRoleById(string projectId, string id)
        {
            return db.CompositeRoles.Where(x => x.ProjectId == projectId && x.Id == id).FirstOrDefault();
        }
        public void InsertCompositeRole(CompositeRole item)
        {
            db.CompositeRoles.Add(item);
            db.SaveChanges();
        }
        public CompositeRole UpdateCompositeRole(CompositeRole item)
        {
            db.CompositeRoles.Update(item);
            db.SaveChanges();
            return item;
        }
        public void DeleteCompositeRole(string projectId, string id)
        {
            var compositeRole = GetCompositeRoleById(projectId, id);
            if (compositeRole is null) throw new Exception("Record not found!");
            db.CompositeRoles.Remove(compositeRole);
            db.SaveChanges();
        }
        //.................................................AzField
        public IList<AzField> GetAzFieldsByObjectId(string projectId, string objectId)
        {
            return db.AzFields.Where(x => x.Project.Id == projectId && x.AzObjectFields.Any(x => x.ObjectId == objectId)).ToList();
        }
        public AzField GetAzField(string id)
        {
            return db.AzFields.FirstOrDefault(x => x.Id == id);
        }
        //.................................................AzObject
        public IList<AzObject> GetAzObjects(string projectId)
        {
            return db.AzObjects.Where(x => x.Project.Id == projectId && x.AzObjectFields.Any()).ToList();
        }
        public AzObject GetAzObjectById(string projectId, string id)
        {
            return db.AzObjects.Where(x => x.Project.Id == projectId && x.Id == id).FirstOrDefault();
        }
        //.................................................Authorizations
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
        //...................................................AzValue
        public IList<AzValue> GetAzValueByAuthorizationId(int id)
        {
            return db.AzValues.Where(x => x.AuthorizationId == id).ToList();
        }
        public AzValue GetAzValue(int serial)
        {
            return db.AzValues.Where(x => x.Serial == serial).FirstOrDefault();
        }
        public void InsertAzValue(AzValue item)
        {
            db.AzValues.Add(item);
            db.SaveChanges();
        }
        public void DeleteAzValue(int serial)
        {
            var azValue = GetAzValue(serial);
            if (azValue is null) throw new Exception("Record not found!");
            db.AzValues.Remove(azValue);
            db.SaveChanges();
        }
        public void DeleteAzValues(IList<AzValue> azValues)
        {
            db.AzValues.RemoveRange(azValues);
            db.SaveChanges();
        }
        //...................................................AzObjectField
        public IList<AzObjectField> GetAllAzObjectField(string projectId)
        {
            return db.AzObjectFields.GetAllAzObjectField(projectId);
        }
    }
}
