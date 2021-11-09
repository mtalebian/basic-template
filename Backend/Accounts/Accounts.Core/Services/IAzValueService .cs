using System.Collections.Generic;
using System.Threading.Tasks;

namespace Accounts.Core
{
    public interface IAzValueService
    {
        IList<AzValue> GetAzValueByAuthorizationId(int id);
        AzValue GetAzValue(int serial);
        void InsertAzValue(AzValue item);
        void DeleteAzValue(int serial);
        void DeleteAzValues(IList<AzValue> azValues);

    }
}