using Forms.Core;
using Forms.Services;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class DependencyInjection
    {

        public static void AddFormService(this IServiceCollection services)
        {
            services.AddScoped<IGridBuilderService, GridBuilderService>();
            services.AddScoped<IGridService, GridService>();
            services.AddScoped<ILocaleService, LocalesService>();
        }

    }
}