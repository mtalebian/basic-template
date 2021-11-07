using System.Collections.Generic;
using System.Threading.Tasks;

namespace Accounts.Core
{
    public interface IAzObjectService
    {
        IList<AzObject> GetAzObjects(string projectId);
        AzObject GetAzObjectById(string projectId,string id);
    }
}