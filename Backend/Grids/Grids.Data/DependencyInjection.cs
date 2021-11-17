using Forms.Core;
using Forms.Data;
using Microsoft.EntityFrameworkCore;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class DependencyInjection
    {
        public static void AddFormsContext(this IServiceCollection services, string connectionString) 
        {
            services.AddDbContext<FormDbContext>(options => options
                .UseSqlServer(
                    connectionString,
                    x => x.MigrationsAssembly("Forms.Migrations")
                ));
            services.AddScoped<IFormUnitOfWork, FormUnitOfWork>();
        }
    }
}