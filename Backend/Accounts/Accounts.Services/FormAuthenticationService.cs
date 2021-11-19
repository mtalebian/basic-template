using Accounts.Core;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Services
{
    internal class FormAuthenticationService<TUser> : IAuthenticationService<TUser> where TUser : User
    {
        protected IAccountUnitOfWork<TUser> db { get; }
        private readonly AccountsConfig _AccountsConfig;
        private readonly JwtConfig _JwtConfig;


        public FormAuthenticationService(IAccountUnitOfWork<TUser> db, IOptions<AccountsConfig> accountsConfig, IOptions<JwtConfig> jwtConfig)
        {
            this.db = db;
            _AccountsConfig = accountsConfig.Value;
            _JwtConfig = jwtConfig.Value;
        }

        public virtual bool VerifyPassword(TUser user, string password)
        {
            var passwordHash = Common.Cryptography.Helper.HashPassword(password);
            return user.PasswordHash == passwordHash;
        }

        public string GetToken(TUser user, int expiresAfterSeconds)
        {
            var userRoles = GetUserRoles(user.Id);
            var key = Encoding.UTF8.GetBytes(_JwtConfig.SecretKey);
            var securityKey = new SymmetricSecurityKey(key);
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Name, user.UserName));
            foreach (var r in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, r));
            }
            var jwt = new JwtSecurityToken(
                            _JwtConfig.Issuer,
                            _JwtConfig.Audience,
                            claims,
                            expires: DateTime.Now.AddSeconds(expiresAfterSeconds),
                            signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        public async Task<TUser> GetUserByIdAsync(int userId)
        {
            return await db.Users.GetAsync(userId);
        }

        public async Task<TUser> GetUserByNameAsync(string userName)
        {
            if (string.IsNullOrEmpty(userName)) return null;
            return await db.Users.FirstOrDefaultAsync(x => x.UserName == userName);
        }

        public string[] GetUserRoles(int userId)
        {
            return new string[0];
            //var q = from ua in db.UserAuthorizations.Entities
            //        join az in db.Authorizations.Entities on ua.AuthorizationId equals az.Id
            //        join ar in db.AzRoles.Entities on az.Id equals ar.AuthorizationId
            //        join r in db.Roles.Entities on ar.RoleId equals r.Id
            //        where ua.UserId == userId
            //        select r.Name;
            //return q.Distinct().ToArray();
        }



        public async Task<UserSession> GetSessionByRefreshTokenAsync(long sessionId, string refreshToken)
        {
            if (sessionId <= 0 || string.IsNullOrEmpty(refreshToken)) return null;
            var session = await db.UserSessions.FirstOrDefaultAsync(x => x.Id == sessionId && x.RefreshToken == refreshToken && !x.IsDeleted);
            if (session != null && DateTime.Now.Subtract(session.RefreshTokenDate).TotalSeconds >= _AccountsConfig.SessionExpiry)
            {
                session.IsDeleted = true;
                db.SaveChanges();
                session = null;
            }
            return session;
        }


        public async Task<UserSession> CreateSessionAsync(Project project, User user, string userAgent, string ip)
        {
            var UserAgent = new UserAgent(userAgent);
            db.UserAgents.Add(UserAgent);
            await db.SaveChangesAsync();

            var session = new UserSession(project, user.Id, UserAgent.Id, ip);
            db.UserSessions.Add(session);
            await db.SaveChangesAsync();
            return session;
        }

        public async Task DeleteSessionAsync(UserSession session)
        {
            session.IsDeleted = true;
            await db.SaveChangesAsync();
        }

        public async Task RegenerateRefreshTokenAsync(UserSession session, string ip)
        {
            session.RefreshToken = Guid.NewGuid().ToString("N");
            session.RefreshCount += 1;
            session.RefreshTokenDate = DateTime.Now;
            session.LastIP = ip;
            session.IPList = session.AddToIPList(ip);
            await db.SaveChangesAsync();
        }



        public ValueTask<Project> GetProjectAsync(string projectId)
        {
            return db.Projects.GetAsync(projectId);
        }

        public Task<List<MenuFolder>> GetMenuFoldersAsync(string projectId, int userId)
        {
            return db.MenuFolders.WhereAsync(x => x.ProjectId == projectId);
        }

        public Task<List<Menu>> GetMenusAsync(string projectId, int userId)
        {
            return db.Menus.WhereAsync(x => x.ProjectId == projectId);
        }
    }
}