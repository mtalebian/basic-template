using Accounts.Core;
using Microsoft.EntityFrameworkCore;

namespace Accounts.Data
{
    public class RoleCompositeRoleConfig
    {
        public RoleCompositeRoleConfig(ModelBuilder modelBuilder, AccountsConfig config) 
        {
            var helper = new ConfigHelper<RoleCompositeRole>(modelBuilder, config.RoleCompositeRoleTableName);
            helper.HasKey(x => new { x.RoleId, x.CompositeRoleId, x.ProjectId });
            helper.DefineRoleId(x => x.RoleId);
            helper.DefineCompositeRoleId(x => x.CompositeRoleId);
            helper.DefineProjectId(x => x.ProjectId);

            helper.Entity()
              .HasOne<Role>(x => x.Role)
              .WithMany(x => x.RoleCompositeRoles)
              .HasForeignKey(x => new { x.RoleId, x.ProjectId });


            helper.Entity()
                .HasOne<CompositeRole>(x => x.CompositeRole)
                .WithMany(x => x.RoleCompositeRoles)
                .HasForeignKey(x => new { x.CompositeRoleId, x.ProjectId });
        }
    }
}