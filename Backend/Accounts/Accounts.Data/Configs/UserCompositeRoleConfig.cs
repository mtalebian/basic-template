using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;
using System;

namespace Accounts.Data
{
    public class UserCompositeRoleConfig 
    {
        public UserCompositeRoleConfig(ModelBuilder modelBuilder, AccountsConfig config) 
        {
            var UserCompositeRole = new ConfigHelper<UserCompositeRole>(modelBuilder, config.UserCompositeRolesTableName);
            UserCompositeRole.HasKey(x => new { x.UserId, x.ProjectId, x.CompositeRoleId });
            UserCompositeRole.DefineProjectId(x => x.ProjectId);
            UserCompositeRole.DefineCompositeRoleId(x => x.CompositeRoleId);

            UserCompositeRole.Entity()
                .HasOne<User>(x => x.User)
                .WithMany(x => x.UserCompositeRoles)
                .HasForeignKey(x => x.UserId);

            UserCompositeRole.Entity()
                .HasOne<CompositeRole>(x => x.CompositeRole)
                .WithMany(x => x.UserCompositeRoles)
                .HasForeignKey(x =>new { x.ProjectId, x.CompositeRoleId });
        }
    }
}