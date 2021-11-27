using Microsoft.AspNetCore.Builder;
using System;

namespace Common.Extensions
{
    public static class ExceptionMiddlewareExtensions
    {
        public static void UseCommonExceptionHandler(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddleware>();
        }
    }
}
