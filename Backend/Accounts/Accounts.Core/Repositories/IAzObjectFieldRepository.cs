using Common.Data;
using System.Collections.Generic;

namespace Accounts.Core
{
    public interface IAzObjectFieldRepository : IRepository<AzObjectField, string, string>
    {
        IList<AzObjectField> GetAllAzObjectField(string projectId);
    }
}