using Accounts.Core;
using Common.Data;

namespace Accounts.Data
{
    public class ApplicationRepository : Repository<Application, string>, IApplicationRepository
    {
        public ApplicationRepository(AccountDbContext context) : base(context)
        {
        }
    }
}