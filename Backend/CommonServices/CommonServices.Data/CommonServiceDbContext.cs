using Common.Data;
using Common.Security;
using CommonServices.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace CommonServices.Data
{
    public class CommonServiceDbContext : BaseDbContext
    {
        private readonly CommonServiceConfig _CommonServiceConfig;


        public CommonServiceDbContext(DbContextOptions<CommonServiceDbContext> options, IOptions<CommonServiceConfig> commonServiceConfig, ICurrentUserNameService currentUserNameService)
            : base(options, currentUserNameService)
        {
            _CommonServiceConfig = commonServiceConfig.Value;
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            //
            // Text
            //
            var Text = new ConfigHelper<Text>(modelBuilder, _CommonServiceConfig.TextsTableName);
            Text.HasKey(x => new { x.LanguageCode, x.Name });
            Text.VarChar(x => x.LanguageCode, 10, true);
            Text.NVarChar(x => x.Name, 100, true);
            Text.NVarChar(x => x.Value, 1000, false);
            Text.DefineCreatedAt(x => x.CreatedAt, "_CreatedAt");



        }
    }
}