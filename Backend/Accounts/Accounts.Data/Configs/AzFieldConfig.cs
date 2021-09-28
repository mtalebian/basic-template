using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;
using System;

namespace Accounts.Data
{
    public class AzFieldConfig 
    {
        public AzFieldConfig(ModelBuilder modelBuilder, AccountsConfig config)
        {
            var helper = new ConfigHelper<AzField>(modelBuilder, config.AzFieldsTableName);
            helper.HasKey(x => x.Id);
            helper.DefineFieldId(x => x.Id);
            helper.DefineTitle(x => x.Title);
        }
    }
}