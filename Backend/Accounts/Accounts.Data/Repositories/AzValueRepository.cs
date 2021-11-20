using Accounts.Core;
using Common.Data;
using System.Collections.Generic;
using System.Linq;

namespace Accounts.Data
{
    public class AzValueRepository : Repository<AzValue, int>, IAzValueRepository
    {

        public AzValueRepository(AccountDbContext context) : base(context)
        {
        }

        public IList<AzValue> GetAzValues(int userId, string objectId)
        {
            var q= from v in Entities
                      join a in Context.Set<Authorization>() on v.AuthorizationId equals a.Id
                      join ur in Context.Set<UserRole>() on new { a.ProjectId, a.RoleId } equals new { ur.ProjectId, ur.RoleId }
                      where ur.UserId == userId && a.ObjectId == objectId
                      select v;
            return q.Distinct().ToList();
        }
    }
}