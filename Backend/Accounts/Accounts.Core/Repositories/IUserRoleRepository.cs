using Common.Data;
using System.Collections.Generic;

namespace Accounts.Core
{
    public interface IUserRoleRepository : IRepository<UserRole, int, string, string>
    {
        IList<UserRole> GetAllUserRole(string projectId, int userId);

        UserRole GetUserRole(string projectId,string roleId, int userId);
    }
}