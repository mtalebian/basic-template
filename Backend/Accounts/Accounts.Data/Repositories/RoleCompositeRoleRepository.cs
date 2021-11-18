using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Accounts.Data
{
    public class RoleCompositeRoleRepository : Repository<RoleCompositeRole, string, string,string>, IRoleCompositeRoleRepository
    {
        private AccountDbContext db;
        public RoleCompositeRoleRepository(AccountDbContext context) : base(context)
        {
            db = context;
        }
    }
}