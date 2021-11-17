using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;
using System;

namespace Accounts.Data
{
    public class RoleConfig
    {
        public RoleConfig(ModelBuilder modelBuilder, AccountsConfig config)
        {
            var Role = new ConfigHelper<Role>(modelBuilder, config.RolesTableName);
            Role.HasKey(x => new { x.ProjectId, x.Id});
            Role.DefineProjectId(x => x.ProjectId);
            Role.DefineRoleId(x => x.Id);
            Role.DefineTitle(x => x.Title);
            Role.DefineUserName(x => x.LastUpdatedBy);
            Role.DefineUserName(x => x.CreatedBy);
            Role.DefaultGetDate(x => x.LastUpdate);
            Role.DefaultGetDate(x => x.CreatedAt);

            Role.Entity()
                .HasOne<Application>(x => x.Application)
                .WithMany(x => x.Roles)
                .HasForeignKey(x => x.ApplicationId);
        }
    }
}