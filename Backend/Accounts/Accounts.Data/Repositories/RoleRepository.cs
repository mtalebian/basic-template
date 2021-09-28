using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;

namespace Accounts.Data
{
    public class RoleRepository : Repository<Role, string, string>, IRoleRepository
    {
        public RoleRepository(AccountDbContext context) : base(context)
        {
        }
    }
}