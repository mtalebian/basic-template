using Common.Data;

namespace Accounts.Core
{
    public interface IUserRoleRepository : IRepository<UserRole, long, string, string>
    {
    }
}