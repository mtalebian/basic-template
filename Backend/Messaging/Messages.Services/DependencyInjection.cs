using Message.Core;
using Messages.Services;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class DependencyInjection
    {
        public static void AddEmailService(this IServiceCollection services)
        {
            services.AddScoped<ISendEmailService, SendEmailServices>();
        }

    }
}