using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Accounts.Data
{
    public class UserSessionRepository : Repository<UserSession, long>, IUserSessionRepository
    {
        public UserSessionRepository(AccountDbContext context) : base(context)
        {
        }

        public IList<UserSession> GetUserSessions(long userId, string projectId)
        {
            return Entities.Include(x => x.UserAgent).Where(x => x.UserId == userId && x.ProjectId == projectId).ToList();
        }
    }
}