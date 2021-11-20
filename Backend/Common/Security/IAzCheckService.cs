using System.Collections.Generic;

namespace Common.Security
{
    public interface IAzCheck
    {
        string[] Validate(string userName, string objectId, Dictionary<string, string> values);
    }
}
