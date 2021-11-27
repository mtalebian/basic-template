
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Common
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next; 
        private readonly IExceptionTextTranslator textTranslator;


        public ExceptionMiddleware(RequestDelegate next, IExceptionTextTranslator textTranslator)
        {
            _next = next;
            this.textTranslator = textTranslator;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                Serilog.Log.Error(ex, ExceptionTranslator.GetErrorMessage(ex));
                await HandleExceptionAsync(httpContext, ex, "0");
            }
        }


        private async Task HandleExceptionAsync(HttpContext context, Exception exception, string logId)
        {
            var msg = ExceptionTranslator.Translate(exception, textTranslator.Translate);

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.OK;
            var resp = new Response
            {
                IsSuccess = false,
                ErrorCode = "500",
                ErrorMessage = msg
            };

            var Content = JsonConvert.SerializeObject(resp, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });

            await context.Response.WriteAsync(Content);

        }
    }
}
