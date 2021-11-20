using Common.Data;
using System.Collections.Generic;

namespace Accounts.Core
{
    public interface IUserCompositeRoleRepository : IRepository<UserCompositeRole, long, string, string>
    {
        IList<UserCompositeRole> GetAllUserCompositeRole(string projectId, int userId);
        UserCompositeRole GetUserCompositeRole(string projectId, string compositeRoleId, int userId);
    }
}