using CommonServices.Core;
using CommonServices.Services;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class DependencyInjection
    {

        public static void AddCommonServicesService(this IServiceCollection services)
        {
            services.AddScoped<ILocaleService, LocalesService>();
            services.AddScoped<INumberRangeService, NumberRangeService>();
        }

    }
}