using System.Collections.Generic;
using System.Threading.Tasks;

namespace Accounts.Core
{
    public interface ICompositeRoleService
    {
        IList<CompositeRole> GetAllCompositeRoles(string projectId);
        CompositeRole GetCompositeRoleById(string projectId, string id);
        void InsertCompositeRole(CompositeRole item);
        CompositeRole UpdateCompositeRole(CompositeRole item);
        void DeleteCompositeRole(string projectId, string id);
    }
}