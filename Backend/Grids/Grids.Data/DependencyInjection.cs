using Forms.Core;
using Forms.Data;
using Microsoft.EntityFrameworkCore;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class DependencyInjection
    {
        public static void AddGridsData(this IServiceCollection services, string connectionString) 
        {
            services.AddDbContext<GridsDbContext>(options => options
                .UseSqlServer(
                    connectionString,
                    x => x.MigrationsAssembly("Grids.Migrations")
                ));
            services.AddScoped<IFormUnitOfWork, GridUnitOfWork>();
        }
    }
}