using Common.Data;
using System.Collections.Generic;

namespace Accounts.Core
{
    public interface IUserSessionRepository : IRepository<UserSession, long>
    {
        IList<UserSession> GetUserSessions(long userId,string projectId);
    }
}