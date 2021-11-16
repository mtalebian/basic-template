using System.Collections.Generic;
using System.Threading.Tasks;

namespace Accounts.Core
{
    public interface IUserCompositeRoleService
    {
        IList<UserCompositeRole> GetAllUserCompositeRole(string projectId,long userId);
        UserCompositeRole GetUserCompositeRole(string projectId, string compositeRoleId, long userId);
        void InsertUserCompositeRole(UserCompositeRole item);
        void DeleteUserCompositeRole(string projectId, string compositeRoleId, long userId);
    }
}