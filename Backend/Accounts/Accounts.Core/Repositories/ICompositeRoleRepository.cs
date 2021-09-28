using Common.Data;

namespace Accounts.Core
{
    public interface ICompositeRoleRepository : IRepository<CompositeRole, string, string>
    {
    }
}