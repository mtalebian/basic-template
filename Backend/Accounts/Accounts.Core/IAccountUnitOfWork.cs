using Common.Data;

namespace Accounts.Core
{
    public interface IAccountUnitOfWork<TUser> : IUnitOfWork where TUser : User
    {
        IProjectRepository Projects { get; }
        IAuthorizationRepository Authorizations { get; }
        IAzFieldRepository AzFields { get; }
        IAzObjectRepository AzObjects { get; }
        IAzObjectFieldRepository AzObjectFields { get; }
        IAzValueRepository AzValues { get; }
        ICompositeRoleRepository CompositeRoles { get; }
        IRoleCompositeRoleRepository RoleCompositeRoles { get; }
        IMenuRepository Menus { get; }
        ITCodeRepository TCodes { get; }
        IMenuFolderRepository MenuFolders { get; }
        IRoleRepository Roles { get; }
        IUserRepository<TUser> Users { get; }
        IUserAgentRepository UserAgents { get; }
        IUserCompositeRoleRepository UserCompositeRoles { get; }
        IUserRoleRepository UserRoles { get; }
        IUserSessionRepository UserSessions { get; }
        IApplicationRepository Applications { get; }
        
    }
}