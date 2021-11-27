using CommonServices.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace CommonServices.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LocalesController : ControllerBase
    {
        private readonly ILocaleService service;
        private readonly IConfiguration _Configuration;

        public LocalesController(ILocaleService localeService, IConfiguration configuration)
        {
            this.service = localeService;
            _Configuration = configuration;
        }


        [AllowAnonymous]
        [EnableCors("react")]
        [HttpGet("get-{language}")]
        public Dictionary<string, string> Get(string language)
        {
            var list = service.GetTexts(language);
            foreach (var k in list.Keys)
            {
                if (string.IsNullOrEmpty(list[k])) list[k] = k;
            }
            return list;
        }

        [AllowAnonymous]
        [EnableCors("react")]
        [HttpPost("add-{language}")]
        public void Add(string language, [FromBody] Dictionary<string, string> words)
        {
            if (words == null) return;
            foreach (var w in words.Keys)
            {
                service.AddText(language, w, null);
            }
        }

    }
}
