using System.Collections.Generic;
using System.Threading.Tasks;

namespace Accounts.Core
{
    public interface IAuthorizationService
    {
        IList<Authorization> GetAuthorizationsByRoleId(string projectId, string roleId);
        Authorization GetAuthorization(int id);
        void InsertAuthorization(Authorization item);
        void DeleteAuthorization(int id);
    }
}