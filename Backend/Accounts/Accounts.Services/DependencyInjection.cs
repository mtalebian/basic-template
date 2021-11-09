using Accounts.Core;
using Accounts.Services;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class DependencyInjection
    {
        public static void AddMenuService(this IServiceCollection services) 
        {
            services.AddScoped<IMenuService, MenuService>();
        }

        public static void AddWindowsAccountsService<TUser>(this IServiceCollection services) where TUser : User
        {
            services.AddScoped<IAuthenticationService<TUser>, WindowsAuthenticationService<TUser>>();
        }

        public static void AddFormAccountsService<TUser>(this IServiceCollection services) where TUser : User
        {
            services.AddScoped<IAuthenticationService<TUser>, FormAuthenticationService<TUser>>();
        }

        public static void AddUserManagmentService(this IServiceCollection services)
        {
            services.AddScoped<IUserService, UserService>();
        }
        public static void AddAuthorizationService<TUser>(this IServiceCollection services) where TUser : User
        {
            services.AddScoped<IRoleService<TUser>, RoleService<TUser>>();
            services.AddScoped<IAzObjectFieldService, AzObjectFieldService>();
            services.AddScoped<IAzObjectService, AzObjectService>();
            services.AddScoped<IAzFieldService, AzFieldService>();
            services.AddScoped<IAuthorizationService, AuthorizationService>();
            services.AddScoped<IAzValueService, AzValueService>();
            services.AddScoped<IApplicationService, ApplicationService>();
        }

    }
}