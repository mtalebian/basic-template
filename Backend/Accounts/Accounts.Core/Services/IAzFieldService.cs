using System.Collections.Generic;
using System.Threading.Tasks;

namespace Accounts.Core
{
    public interface IAzFieldService
    {
        IList<AzField> GetAzFieldsByObjectId(string projectId,string objectId);
     
    }
}