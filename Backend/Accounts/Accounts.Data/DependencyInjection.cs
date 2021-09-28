using Accounts.Core;
using Accounts.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class DependencyInjection
    {
        public static void AddAccountsContext<TUser>(this IServiceCollection services, string connectionString) where TUser : User
        {
            services.AddDbContext<AccountDbContext>(options => options
                .UseSqlServer(
                    connectionString,
                    x => x.MigrationsAssembly("Accounts.Migrations")
                ));
            services.AddScoped<IAccountUnitOfWork<TUser>, AccountUnitOfWork<TUser>>();
        }
    }
}