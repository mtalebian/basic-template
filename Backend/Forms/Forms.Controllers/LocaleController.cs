using Forms.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace Forms.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LocaleController : ControllerBase
    {
        private readonly ILocaleService service;
        private readonly IConfiguration _Configuration;

        public LocaleController(ILocaleService localeService, IConfiguration configuration)
        {
            this.service = localeService;
            _Configuration = configuration;
        }


        [AllowAnonymous]
        [EnableCors("react")]
        [HttpGet("{language}")]
        public Dictionary<string, string> Get(string language)
        {
            return service.GetTexts(language);
        }

    }
}
