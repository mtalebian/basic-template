using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;
using System;

namespace Accounts.Data
{
    public class UserConfig 
    {
        public UserConfig(ModelBuilder modelBuilder, AccountsConfig config)
        {
            var User = new ConfigHelper<User>(modelBuilder, config.UsersTableName);
            User.HasKey(x => x.Id);
            User.IsAutoIncrement(x => x.Id);
            User.DefineUserName(x => x.UserName);
            User.Varchar50(x => x.FirstName);
            User.Varchar50(x => x.LastName);
            User.Varchar100(x => x.PasswordHash);
            User.DefineUrl(x => x.Email, false);
            User.IsRequired(x => x.EmailConfirmed);
            User.HasMaxLength(x => x.PhoneNumber, 15, false);
            User.IsRequired(x => x.PhoneNumberConfirmed);
            User.IsRequired(x => x.AccessFailedCount);
            User.IsRequired(x => x.LockoutEnabled);
            User.IsRequired(x => x.IsDeleted);
            User.IsRequired(x => x.IsDisabled);
            User.DefaultGetDate(x => x.LastUpdate);
            User.DefaultGetDate(x => x.CreatedAt);
        }
    }
}