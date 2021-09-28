using Accounts.Core;
using Common.Data;

namespace Accounts.Data
{
    public class UserRoleRepository : Repository<UserRole, long, string, string>, IUserRoleRepository
    {
        public UserRoleRepository(AccountDbContext context) : base(context)
        {
        }
    }
}