using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Accounts.Data
{
    public class UserCompositeRoleRepository : Repository<UserCompositeRole, long, string, string>, IUserCompositeRoleRepository
    {
        public UserCompositeRoleRepository(AccountDbContext context) : base(context)
        {
        }
        public IList<UserCompositeRole> GetAllUserCompositeRole(string projectId, int userId)
        {
            return Entities.Include(x => x.User).Include(z => z.CompositeRole).Where(x => x.ProjectId == projectId && x.UserId == userId).ToList();
        }

        public UserCompositeRole GetUserCompositeRole(string projectId, string compositeRoleId, int userId)
        {
            return Entities.Include(x => x.User).Include(z => z.CompositeRole).Where(x => x.ProjectId == projectId && x.CompositeRoleId == compositeRoleId && x.UserId == userId).FirstOrDefault();
        }
    }
}