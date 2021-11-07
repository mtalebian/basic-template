using System.Collections.Generic;
using System.Threading.Tasks;

namespace Accounts.Core
{
    public interface IAzObjectFieldService
    {
        IList<AzObjectField> GetAll(string projectId);
    }
}