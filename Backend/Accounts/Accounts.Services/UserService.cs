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
            return db.Users.FirstOrDefault(x => x.NationalCode == nationalCode);
        }
        public User GetUser(long UserId)
        {
            return db.Users.Get(UserId);
        }
        public User GetUserByUserName(string userName)
        {
            return db.Users.FirstOrDefault(x => x.UserName == userName);
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
        public void DeleteUser(long userId)
        {
            var user = db.Users.Get(userId);
            if (user is null) throw new Exception("Record not found!");
            db.Users.Remove(user);
            db.SaveChanges();
        }
        public void ChangePassword(long userId, string newPassword)
        {
            var user = db.Users.FirstOrDefault(x => x.Id == userId);
            if (user is null) throw new Exception("Record not found!");
            user.PasswordHash = newPassword;
            Update(user);
        }


    }
}
