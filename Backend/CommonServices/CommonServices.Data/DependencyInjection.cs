using CommonServices.Core;
using CommonServices.Data;
using Microsoft.EntityFrameworkCore;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class DependencyInjection
    {
        public static void AddCommonServicesData(this IServiceCollection services, string connectionString) 
        {
            services.AddDbContext<CommonServiceDbContext>(options => options
                .UseSqlServer(
                    connectionString,
                    x => x.MigrationsAssembly("CommonServices.Migrations")
                ));
            services.AddScoped<ICommonServiceUnitOfWork, CommonServiceUnitOfWork>();
        }
    }
}