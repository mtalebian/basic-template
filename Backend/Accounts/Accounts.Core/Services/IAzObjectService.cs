using System.Collections.Generic;
using System.Threading.Tasks;

namespace Accounts.Core
{
    public interface IAzObjectService
    {
        AzObject GetAzObjectById(string projectId,string id);
        IList<AzObject> GetAzObjects(string projectId);
    }
}