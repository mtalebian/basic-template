using System.Collections.Generic;
using System.Threading.Tasks;

namespace Accounts.Core
{
    public interface IRoleService
    {
        //.........................Authorizations
        IList<Authorization> GetAuthorizationsByRoleId(string projectId, string roleId);
        Authorization GetAuthorization(int id);
        void InsertAuthorization(Authorization item);
        void DeleteAuthorization(int id);
        //..........................AzField
        AzField GetAzField(string id);
        IList<AzField> GetAzFieldsByObjectId(string projectId, string objectId);
        //...........................AzObjectField
        IList<AzObjectField> GetAllAzObjectField(string projectId);

        //...........................RoleCompositeRole

        //..........................AzObject
        AzObject GetAzObjectById(string projectId, string id);
        IList<AzObject> GetAzObjects(string projectId);
        //..........................AzValue
        IList<AzValue> GetAzValueByAuthorizationId(int id);
        AzValue GetAzValue(int serial);
        void InsertAzValue(AzValue item);
        void DeleteAzValue(int serial);
        void DeleteAzValues(IList<AzValue> azValues);
        //..........................CompositeRoles
        IList<CompositeRole> GetAllCompositeRoles(string projectId);
        CompositeRole GetCompositeRoleById(string projectId,string id);
        void InsertCompositeRole(CompositeRole item);
        CompositeRole UpdateCompositeRole(CompositeRole item);
        void DeleteCompositeRole(string projectId, string id);
        //...........................Roles
        IList<Role> GetAllRoles(string projectId);
        Role GetRoleById(string projectId, string id);
        void InsertRole(Role item);
        Role UpdateRole(Role item);
        void DeleteRole(string projectId, string id);
        //...........................UserCompositeRole
        IList<UserCompositeRole> GetAllUserCompositeRole(string projectId, long userId);
        UserCompositeRole GetUserCompositeRole(string projectId, string compositeRoleId, long userId);
        void InsertUserCompositeRole(UserCompositeRole item);
        void DeleteUserCompositeRole(string projectId, string compositeRoleId, long userId);
        //..........................UserRole
        IList<UserRole> GetAllUserRole(string projectId, long userId);
        UserRole GetUserRole(string projectId, string roleId, long userId);
        void InsertUserRole(UserRole item);
        void DeleteUserRole(string projectId, string roleId, long userId);
        //.............................
        RoleCompositeRole GetRoleCompositeRole(string roleId, string compositeRoleId, string ProjectId);
        void InsertRoleCompositeRole(RoleCompositeRole item);
    }
}