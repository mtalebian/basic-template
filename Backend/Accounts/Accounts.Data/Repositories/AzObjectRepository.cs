using Accounts.Core;
using Common.Data;

namespace Accounts.Data
{
    public class AzObjectRepository : Repository<AzObject, string, string>, IAzObjectRepository
    {
        public AzObjectRepository(AccountDbContext context) : base(context)
        {
        }
    }
}