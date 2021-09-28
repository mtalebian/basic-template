using Accounts.Core;
using Common.Data;

namespace Accounts.Data
{
    public class UserSessionRepository: Repository<UserSession, long>, IUserSessionRepository
    {
        public UserSessionRepository(AccountDbContext context) : base(context)
        {
        }
    }
}