using Common.Data;

namespace Accounts.Core
{
    public interface IUserCompositeRoleRepository : IRepository<UserCompositeRole, long, string, string>
    {
    }
}