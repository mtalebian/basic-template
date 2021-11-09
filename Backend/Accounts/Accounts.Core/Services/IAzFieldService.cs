using System.Collections.Generic;
using System.Threading.Tasks;

namespace Accounts.Core
{
    public interface IAzFieldService
    {
        AzField GetAzField(string id);
        IList<AzField> GetAzFieldsByObjectId(string projectId,string objectId);
    }
}