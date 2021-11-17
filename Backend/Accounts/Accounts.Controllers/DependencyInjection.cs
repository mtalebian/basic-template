using Accounts.Core;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class DependencyInjection
    {
        public static void AddAccountsServices<TUser>(this IServiceCollection services, bool formsAutentication, string connectionString) where TUser : User
        {
            services.AddAccountsContext<TUser>(connectionString);
            if (formsAutentication)
            {
                services.AddFormAccountsService<TUser>();
            }
            else
            {
                services.AddWindowsAccountsService<TUser>();
            }
            services.AddMenuService();
            services.AddUserManagmentService();
            services.AddAuthorizationService<TUser>();
        }
    }
}