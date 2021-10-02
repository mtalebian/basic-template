using Forms.Core;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Forms.Services
{
    internal class LocaleService : ILocaleService
    {
        private readonly IFormUnitOfWork db;


        public LocaleService(IFormUnitOfWork db)
        {
            this.db = db;
        }

        public Dictionary<string, string> GetTexts(string languageCode)
        {
            var dic = new Dictionary<string, string>();
            var texts = db.Texts.Where(x => x.LanguageCode == languageCode);
            foreach (var text in texts)
            {
                dic.Add(text.Name, text.Value);
            }
            return dic;
        }
    }
}