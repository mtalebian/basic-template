using Accounts.Core;
using Microsoft.EntityFrameworkCore;

namespace Accounts.Data
{
    public class UserRoleConfig
    {
        public UserRoleConfig(ModelBuilder modelBuilder, AccountsConfig config) 
        {
            var UserRole = new ConfigHelper<UserRole>(modelBuilder, config.UserRolesTableName);
            UserRole.HasKey(x => new { x.UserId, x.ProjectId, x.RoleId });
            UserRole.DefineProjectId(x => x.ProjectId);
            UserRole.DefineRoleId(x => x.RoleId);

            UserRole.Entity()
                .HasOne<User>(x => x.User)
                .WithMany(x => x.UserRoles)
                .HasForeignKey(x => x.UserId);

            UserRole.Entity()
                .HasOne<Role>(x => x.Role)
                .WithMany(x => x.UserRoles)
                .HasForeignKey(x => new { x.ProjectId, x.RoleId });
        }
    }
}