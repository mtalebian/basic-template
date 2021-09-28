using Accounts.Core;
using Common.Data;

namespace Accounts.Data
{
    public class UserCompositeRoleRepository : Repository<UserCompositeRole, long, string, string>, IUserCompositeRoleRepository
    {
        public UserCompositeRoleRepository(AccountDbContext context) : base(context)
        {
        }
    }
}