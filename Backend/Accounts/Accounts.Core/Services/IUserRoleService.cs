using System.Collections.Generic;
using System.Threading.Tasks;

namespace Accounts.Core
{
    public interface IUserRoleService
    {
        IList<UserRole> GetAllUserRole(string projectId,long userId);
        UserRole GetUserRole(string projectId, string roleId, long userId);
        void InsertUserRole(UserRole item);
        void DeleteUserRole(string projectId, string roleId, long userId);
    }
}