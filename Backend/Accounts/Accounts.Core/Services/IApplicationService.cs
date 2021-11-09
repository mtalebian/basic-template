using System.Collections.Generic;
using System.Threading.Tasks;

namespace Accounts.Core
{
    public interface IApplicationService
    {
        Application GetApplication(string id);
        Application GetApplicationByTitle(string id);
    }
}