using Common.Data;
using System.Collections.Generic;

namespace Accounts.Core
{
    public interface IUserRoleRepository : IRepository<UserRole, int, string, string>
    {
        IList<UserRole> GetAllUserRole(string projectId, long userId);

        UserRole GetUserRole(string projectId,string roleId, long userId);
    }
}