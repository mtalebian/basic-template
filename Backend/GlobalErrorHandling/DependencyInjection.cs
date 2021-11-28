using Accounts.Core;
using GlobalErrorHandling.Extention;
using Microsoft.AspNetCore.Builder;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class DependencyInjection
    {
        public static void AddExceptionHandlerServices(this IApplicationBuilder builder)
        {
            ExceptionMiddlewareExtensions.ConfigureExceptionHandler(builder);
        }
    }
}