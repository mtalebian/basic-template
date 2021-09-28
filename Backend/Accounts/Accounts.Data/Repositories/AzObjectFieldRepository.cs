using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;

namespace Accounts.Data
{
    public class AzObjectFieldRepository : Repository<AzObjectField, string, string>, IAzObjectFieldRepository
    {
        public AzObjectFieldRepository(AccountDbContext context) : base(context)
        {
        }
    }
}