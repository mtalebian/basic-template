using Common.Data;
using System.Collections.Generic;

namespace Accounts.Core
{
    public interface IAzValueRepository : IRepository<AzValue, int>
    {
        IList<AzValue> GetAzValues(int userId, string objectId);
    }
}