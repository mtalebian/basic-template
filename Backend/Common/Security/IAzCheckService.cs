using System.Collections.Generic;

namespace Common.Security
{
    public interface IAzCheckService
    {
        string[] Validate(string authorizationText, string userName, string applicationId, Dictionary<string, string> parameters);
        string[] Validate(string userName, string objectId, Dictionary<string, string> values);
    }
}
