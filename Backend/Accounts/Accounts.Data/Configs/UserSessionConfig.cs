using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;
using System;

namespace Accounts.Data
{
    public class UserSessionConfig 
    {
        public UserSessionConfig(ModelBuilder modelBuilder, AccountsConfig config)
        {
            var UserSession = new ConfigHelper<UserSession>(modelBuilder, config.UserSessionsTableName);
            UserSession.HasKey(x => x.Id);
            UserSession.IsAutoIncrement(x => x.Id);
            UserSession.Varchar50(x => x.RefreshToken);
            UserSession.IsRequired(x => x.RefreshCount);
            UserSession.IsRequired(x => x.RefreshTokenDate);
            UserSession.DefineProjectId(x => x.ProjectId);
            UserSession.DefineIP(x => x.IP);
            UserSession.DefineIP(x => x.LastIP);
            UserSession.IsRequired(x => x.IPList);
            UserSession.IsRequired(x => x.UserAgentId);
            UserSession.DefaultValue(x => x.IsDeleted, false);
            UserSession.DefaultGetDate(x => x.CreatedAt);

            UserSession.Entity()
                .HasOne<UserAgent>(x => x.UserAgent)
                .WithMany(x => x.UserSessions)
                .HasForeignKey(s => s.UserAgentId);

            UserSession.Entity()
                .HasOne<User>(x => x.User)
                .WithMany(x => x.UserSessions)
                .HasForeignKey(x => x.UserId);
        }
    }
}