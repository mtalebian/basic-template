﻿using Forms.Core;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class DependencyInjection
    {
        public static void AddFormsServices(this IServiceCollection services, string connectionString) 
        {
            services.AddFormsContext(connectionString);
            services.AddFormService();
        }
    }
}