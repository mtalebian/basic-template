using System.Collections.Generic;
using System.Data;

namespace Forms.Core
{
    public interface IAzService
    {
        bool HasPermission(string azText, string userName, Dictionary<string, object> parameters);
    }
}