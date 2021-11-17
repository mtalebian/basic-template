using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Accounts.Data
{
    public class RoleRepository : Repository<Role, string, string>, IRoleRepository
    {
        public RoleRepository(AccountDbContext context) : base(context)
        {
        }
        public IList<Role> GetAll(string projectId)
        {
            return Entities.Include(x => x.Application).Where(x => x.ProjectId == projectId).ToList();
        }

        public Role GetRoleById(string projectId, string id)
        {
            return Entities.Include(x => x.Application).FirstOrDefault(x => x.ProjectId == projectId && x.Id==id);
        }
    }
}