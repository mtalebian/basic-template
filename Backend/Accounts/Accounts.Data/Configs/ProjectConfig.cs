using Accounts.Core;
using Microsoft.EntityFrameworkCore;

namespace Accounts.Data
{
    public class ProjectConfig
    {
        public ProjectConfig(ModelBuilder modelBuilder, AccountsConfig config)
        {
            var helper = new ConfigHelper<Project>(modelBuilder, config.ProjectsTableName);
            helper.HasKey(x => x.Id);
            helper.DefineProjectId(x => x.Id);
            helper.DefineTitle(x => x.Title);
        }
    }
}