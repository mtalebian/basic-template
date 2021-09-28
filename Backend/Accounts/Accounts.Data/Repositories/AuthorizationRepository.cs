using Accounts.Core;
using Common.Data;

namespace Accounts.Data
{
    public class AuthorizationRepository : Repository<Authorization, int>, IAuthorizationRepository
    {
        public AuthorizationRepository(AccountDbContext context) : base(context)
        {
        }
    }
}