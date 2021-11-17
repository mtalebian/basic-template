using Common.Data;
using System.Collections.Generic;

namespace Accounts.Core
{
    public interface IRoleRepository : IRepository<Role, string, string>
    {
        IList<Role> GetAll(string projectId);
        Role GetRoleById(string projectId, string id);
    }
}