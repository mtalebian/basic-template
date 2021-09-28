using Common.Data;

namespace Accounts.Core
{
    public interface IUserSessionRepository : IRepository<UserSession, long>
    {
    }
}