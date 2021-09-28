using Accounts.Core;
using Microsoft.EntityFrameworkCore;

namespace Accounts.Data
{
    public class CompositeRoleConfig
    {
        public CompositeRoleConfig(ModelBuilder modelBuilder, AccountsConfig config)
        {
            var helper = new ConfigHelper<CompositeRole>(modelBuilder, config.CompositeRolesTableName);
            helper.HasKey(x => new { x.ProjectId, x.Id });
            helper.DefineProjectId(x => x.ProjectId);
            helper.DefineCompositeRoleId(x => x.Id);
            helper.DefineTitle(x => x.Title);
            helper.DefineUserName(x => x.LastUpdatedBy);
            helper.DefineUserName(x => x.CreatedBy);
            helper.DefaultGetDate(x => x.LastUpdate);
            helper.DefaultGetDate(x => x.CreatedAt);
        }
    }
}