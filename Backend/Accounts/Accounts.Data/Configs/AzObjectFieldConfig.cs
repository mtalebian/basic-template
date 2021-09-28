using Accounts.Core;
using Microsoft.EntityFrameworkCore;

namespace Accounts.Data
{
    public class AzObjectFieldConfig 
    {
        public AzObjectFieldConfig(ModelBuilder modelBuilder, AccountsConfig config) 
        {
            var helper = new ConfigHelper<AzObjectField>(modelBuilder, config.AzObjectFieldsTableName);
            helper.HasKey(x => new { x.ObjectId, x.FieldId });
            helper.DefineObjectId(x => x.ObjectId);
            helper.DefineFieldId(x => x.FieldId);

            helper.Entity()
                .HasOne<AzObject>(x => x.AzObject)
                .WithMany(x => x.AzObjectFields)
                .HasForeignKey(s => s.ObjectId);

            helper.Entity()
                .HasOne<AzField>(x => x.AzField)
                .WithMany(x => x.AzObjectFields)
                .HasForeignKey(s => s.FieldId);
        }
    }
}