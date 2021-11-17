using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Accounts.Data
{
    public class UserRoleRepository : Repository<UserRole, long, string, string>, IUserRoleRepository
    {
        public UserRoleRepository(AccountDbContext context) : base(context)
        {
        }

        public IList<UserRole> GetAllUserRole(string projectId, long userId)
        {
            return Entities.Include(x => x.User).Include(z => z.Role).Where(x => x.ProjectId == projectId && x.UserId == userId).ToList();
        }

        public UserRole GetUserRole(string projectId, string roleId, long userId)
        {
            return Entities.Include(x => x.User).Include(z => z.Role).Where(x => x.ProjectId == projectId && x.RoleId == roleId && x.UserId == userId).FirstOrDefault();
        }
    }
}