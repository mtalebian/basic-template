using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;
using System;

namespace Accounts.Data
{
    public class AzValueConfig
    {
        public AzValueConfig(ModelBuilder modelBuilder, AccountsConfig config)
        {
            var helper = new ConfigHelper<AzValue>(modelBuilder, config.AzValuesTableName);
            helper.HasKey(x => x.Serial);
            helper.IsAutoIncrement(x => x.Serial);
            helper.DefineObjectId(x => x.ObjectId);
            helper.DefineFieldId(x => x.FieldId);

            helper.Entity()
                .HasOne(x => x.Authorization)
                .WithMany(x => x.Values)
                .HasForeignKey(x => x.AuthorizationId);

            helper.Entity()
                .HasOne(x => x.AzObjectField)
                .WithMany(x => x.Values)
                .HasForeignKey(x => new { x.ObjectId, x.FieldId });
        }
    }
}