using Accounts.Core;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Services
{
    internal class UserService : IUserService
    {
        private protected IAccountUnitOfWork<User> db { get; }
        private readonly AccountsConfig _AccountsConfig;
        public UserService(IOptions<AccountsConfig> accountsConfig, IAccountUnitOfWork<User> db)
        {
            this.db = db;
            this._AccountsConfig = accountsConfig.Value;
        }

        public IList<User> GetUsers()
        {
            return db.Users.GetAll();
        }
        public User GetUser(string nationalCode)
        {
            return db.Users.Where(x => x.NationalCode == nationalCode).FirstOrDefault();
        }
        public User GetUser(int userId)
        {
            return db.Users.Get(userId);
        }
        public User GetUserByUserName(string userName)
        {
            return db.Users.Where(x => x.UserName == userName).FirstOrDefault();
        }
        public UserAgent GetUserAgent(int id)
        {
            return db.UserAgents.Where(x => x.Id == id).FirstOrDefault();
        }
        public IList<UserSession> GetUserSessions(long userId, string projectId)
        {
            return db.UserSessions.GetUserSessions(userId, projectId);
        }

        public UserSession GetUserSession(long id)
        {
            return db.UserSessions.Where(x => x.Id == id).FirstOrDefault();
        }
        public void Insert(User user)
        {
            db.Users.Add(user);
            db.SaveChanges();

        }
        public User Update(User user)
        {
            db.Users.Update(user);
            db.SaveChanges();
            return user;
        }
        public void DeleteUser(string nationalCode)
        {
            var user = GetUser(nationalCode);
            if (user is null) throw new Exception("Record not found!");
            db.Users.Remove(user);
            db.SaveChanges();
        }
        public void DeleteUser(int userId)
        {
            var user = db.Users.Get(userId);
            if (user is null) throw new Exception("Record not found!");
            db.Users.Remove(user);
            db.SaveChanges();
        }
        public void ChangePassword(int userId, string newPassword)
        {
            var user = db.Users.FirstOrDefault(x => x.Id == userId);
            if (user is null) throw new Exception("Record not found!");
            user.PasswordHash = newPassword;
            Update(user);
        }
        public void DeleteUserSession(long id)
        {
            var userSession = GetUserSession(id);
            if (userSession is null) throw new Exception("Record not found!");
            db.UserSessions.Remove(userSession);
            db.SaveChanges();
        }

        public void DeleteUserAgent(int id)
        {
            var userAgent = GetUserAgent(id);
            if (userAgent is null) throw new Exception("Record not found!");
            db.UserAgents.Remove(userAgent);
            db.SaveChanges();
        }

        
    }
}
