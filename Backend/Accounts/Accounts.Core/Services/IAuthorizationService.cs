using System.Collections.Generic;

namespace Accounts.Core
{
    public interface IAuthorizationService<TUser> where TUser : User
    {
        IList<Role> GetAllRoles(string projectId);
        Role GetRoleById(string projectId, string id);
        void InsertRole(Role item);
        void UpdateRole(Role item);
        void DeleteRole(Role item);

    }
}