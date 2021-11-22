using Accounts.Core;
using Common.Data;

namespace Accounts.Data
{
    public class LogRepository : Repository<Log, long>, ILogRepository
    {
        public LogRepository(AccountDbContext context) : base(context)
        {
        }
    }
}