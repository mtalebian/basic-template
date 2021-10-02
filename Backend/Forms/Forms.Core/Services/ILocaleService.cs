using System.Collections.Generic;

namespace Forms.Core
{
    public interface ILocaleService
    {
        Dictionary<string, string> GetTexts(string languageCode);
    }
}