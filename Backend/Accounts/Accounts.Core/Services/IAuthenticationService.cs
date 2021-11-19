using System.Collections.Generic;
using System.Threading.Tasks;

namespace Accounts.Core
{
    public interface IAuthenticationService<TUser> where TUser : User
    {
        bool VerifyPassword(TUser user, string password);
        string GetToken(TUser user, int expiresAfterSeconds);

        Task<TUser> GetUserByNameAsync(string userName);
        Task<TUser> GetUserByIdAsync(int userId);
        string[] GetUserRoles(int userId);

        Task<UserSession> GetSessionByRefreshTokenAsync(long sessionId, string refreshToken);
        Task<UserSession> CreateSessionAsync(Project project, User user, string userAgent, string ip);
        Task DeleteSessionAsync(UserSession session);
        Task RegenerateRefreshTokenAsync(UserSession session, string ip);

        ValueTask<Project> GetProjectAsync(string projectId);
        Task<List<MenuFolder>> GetMenuFoldersAsync(string projectId, int userId);
        Task<List<Menu>> GetMenusAsync(string projectId, int userId);
    }
}