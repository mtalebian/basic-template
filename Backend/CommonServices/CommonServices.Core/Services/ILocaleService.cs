using System.Collections.Generic;

namespace CommonServices.Core
{
    public interface ILocaleService
    {
        Dictionary<string, string> GetTexts(string languageCode);
        void AddText(string languageCode, string name, string value);
    }
}