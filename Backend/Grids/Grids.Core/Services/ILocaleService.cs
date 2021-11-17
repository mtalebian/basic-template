using System.Collections.Generic;

namespace Forms.Core
{
    public interface ILocaleService
    {
        Dictionary<string, string> GetTexts(string languageCode);
        void AddText(string languageCode, string name, string value);
    }
}