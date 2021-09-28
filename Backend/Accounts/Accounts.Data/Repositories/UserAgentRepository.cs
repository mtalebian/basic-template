using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;

namespace Accounts.Data
{
    public class UserAgentRepository : Repository<UserAgent, int>, IUserAgentRepository
    {
        public UserAgentRepository(AccountDbContext context) : base(context)
        {
        }
    }
}