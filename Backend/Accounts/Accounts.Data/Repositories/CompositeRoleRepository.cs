using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;

namespace Accounts.Data
{
    public class CompositeRoleRepository : Repository<CompositeRole, string, string>, ICompositeRoleRepository
    {
        public CompositeRoleRepository(AccountDbContext context) : base(context)
        {
        }
    }
}