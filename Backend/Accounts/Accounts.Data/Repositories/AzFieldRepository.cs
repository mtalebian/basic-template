using Accounts.Core;
using Common.Data;

namespace Accounts.Data
{
    public class AzFieldRepository : Repository<AzField, string, string>, IAzFieldRepository
    {
        public AzFieldRepository(AccountDbContext context) : base(context)
        {
        }
    }
}