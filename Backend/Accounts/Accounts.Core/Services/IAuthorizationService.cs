using System.Collections.Generic;
using System.Threading.Tasks;

namespace Accounts.Core
{
    public interface IAuthorizationService<TUser> where TUser : User
    {
        IList<Role> GetAllRoles(string projectId);
        Role GetRoleById(string projectId, string id);
        void InsertRole(Role item);
        Role UpdateRole(Role item);
        void DeleteRole(string projectId, string id);

    }
}