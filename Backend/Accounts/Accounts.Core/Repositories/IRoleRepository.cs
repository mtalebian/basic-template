using Common.Data;

namespace Accounts.Core
{
    public interface IRoleRepository : IRepository<Role, string, string>
    {
    }
}