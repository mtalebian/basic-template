using Accounts.Core;
using Microsoft.EntityFrameworkCore;

namespace Accounts.Data
{
    public class ApplicationConfig
    {
        public ApplicationConfig(ModelBuilder modelBuilder, AccountsConfig config)
        {
            var helper = new ConfigHelper<Application>(modelBuilder, config.ApplicationsTableName);
            helper.HasKey(x => x.Id);
            helper.DefineApplicationId(x => x.Id);
            helper.DefineTitle(x => x.Title);
        }
    }
}