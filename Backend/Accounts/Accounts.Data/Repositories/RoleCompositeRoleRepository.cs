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
        public IList<RoleCompositeRole> GetAllRolesCompositeRole(string projectId,string compositeRoleId)
        {
            return Entities.Include(x => x.Role).Include(z => z.CompositeRole).Where(x => x.ProjectId == projectId && x.CompositeRoleId== compositeRoleId).ToList();
        }
    }
}