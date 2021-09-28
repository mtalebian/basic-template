using Accounts.Core;
using Microsoft.EntityFrameworkCore;

namespace Accounts.Data
{
    public class UserAgentConfig 
    {
        public UserAgentConfig(ModelBuilder modelBuilder, AccountsConfig config) 
        {
            var UserAgent = new ConfigHelper<UserAgent>(modelBuilder, config.UserAgentsTableName);
            UserAgent.HasKey(x => x.Id);
            UserAgent.IsAutoIncrement(x => x.Id);
            UserAgent.IsRequired(x => x.Value);
            UserAgent.Varchar100(x => x.OS);
            UserAgent.Varchar100(x => x.Browser);
            UserAgent.Varchar100(x => x.Device);
            UserAgent.Varchar100(x => x.Brand);
            UserAgent.Varchar100(x => x.Model);
            UserAgent.DefaultGetDate(x => x.CreatedAt);
        }
    }
}