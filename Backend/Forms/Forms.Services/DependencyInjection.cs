using Forms.Core;
using Forms.Services;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class DependencyInjection
    {

        public static void AddFormService(this IServiceCollection services)
        {
            services.AddScoped<IFormDesignerService, FormDesignerService>();
            services.AddScoped<IFormService, FormService>();
        }

    }
}