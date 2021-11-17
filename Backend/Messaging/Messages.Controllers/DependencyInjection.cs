

namespace Microsoft.Extensions.DependencyInjection
{
    public static class DependencyInjection
    {
        public static void AddEmailServices(this IServiceCollection services) 
        {
            services.AddEmailService();
        }
    }
}