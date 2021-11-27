using Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Backend.Api.Controllers
{
    public class ExceptionTextTranslator : IExceptionTextTranslator
    {
        public IHttpContextAccessor httpContextAccessor { get; }


        public ExceptionTextTranslator(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        public string Translate(string text)
        {
            var lang = httpContextAccessor.HttpContext.Request.Cookies["i18next"];
            return lang == "fa" && text == "LOGIN" ? "ورود" : text;

            //Logger.Fatal(new Exception(text), "Exception not translated");
        }
    }
}