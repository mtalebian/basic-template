using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;

namespace Accounts.Data
{
    public class AzValueRepository : Repository<AzValue, int>, IAzValueRepository
    {
        public AzValueRepository(AccountDbContext context) : base(context)
        {
        }
    }
}