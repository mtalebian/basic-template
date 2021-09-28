using Accounts.Core;
using Microsoft.EntityFrameworkCore;

namespace Accounts.Data
{
    public class AzObjectConfig
    {
        public AzObjectConfig(ModelBuilder modelBuilder, AccountsConfig config)
        {
            var helper = new ConfigHelper<AzObject>(modelBuilder, config.AzObjectsTableName);
            helper.HasKey(x => x.Id);
            helper.DefineObjectId(x => x.Id);
            helper.DefineTitle(x => x.Title);
        }
    }
}