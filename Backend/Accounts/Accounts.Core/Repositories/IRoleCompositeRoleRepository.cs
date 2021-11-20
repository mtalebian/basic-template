using Common.Data;
using System.Collections.Generic;

namespace Accounts.Core
{
    public interface IRoleCompositeRoleRepository : IRepository<RoleCompositeRole, string, string,string>
    {
        IList<RoleCompositeRole> GetAllRolesCompositeRole(string projectId,string compositeRoleId);
    }
}