using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;

namespace Accounts.Data
{
    public class TCodeRepository : Repository<Application, string>, ITCodeRepository
    {
        public TCodeRepository(AccountDbContext context) : base(context)
        {
        }
    }
}