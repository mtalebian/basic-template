using CommonServices.Core;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CommonServices.Services
{
    internal class LocalesService : ILocaleService
    {
        private static readonly object sync = new object();
        private readonly ICommonServiceUnitOfWork db;


        public LocalesService(ICommonServiceUnitOfWork db)
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

        public void AddText(string languageCode, string name, string value)
        {
            //if (string.IsNullOrEmpty(value))
            //{
            //    var sb = new StringBuilder();
            //    var cap = true;
            //    foreach (var c in name)
            //    {
            //        if (char.IsWhiteSpace(c)) sb.Append(c);
            //        else if (c == '-')
            //        {
            //            sb.Append(' ');
            //            cap = true;
            //        }
            //        else
            //        {
            //            sb.Append(cap ? char.ToUpper(c) : c);
            //            cap = false;
            //        }
            //    }
            //    value = sb.ToString();
            //}
            lock (sync)
            {
                var t = db.Texts.FirstOrDefault(x => x.LanguageCode == languageCode && x.Name == name);
                if (t != null) return;
                db.Texts.Add(new Text { LanguageCode = languageCode, Name = name, Value = value });
                db.SaveChanges();
            }
        }


    }
}