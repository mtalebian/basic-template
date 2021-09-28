using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;

namespace Accounts.Data
{
    public class AccountUnitOfWork<TUser> : UnitOfWork, IAccountUnitOfWork<TUser> where TUser : User
    {
        public IProjectRepository Projects { get; }
        public IAuthorizationRepository Authorizations { get; }
        public IAzFieldRepository AzFields { get; }
        public IAzObjectRepository AzObjects { get; }
        public IAzObjectFieldRepository AzObjectFields { get; }
        public IAzValueRepository AzValues { get; }
        public ICompositeRoleRepository CompositeRoles { get; }
        public IMenuRepository Menus { get; }
        public ITCodeRepository TCodes { get; }
        public IMenuFolderRepository MenuFolders { get; }
        public IRoleRepository Roles { get; }
        public IUserRepository<TUser> Users { get; }
        public IUserAgentRepository UserAgents { get; }
        public IUserCompositeRoleRepository UserCompositeRoles { get; }
        public IUserRoleRepository UserRoles { get; }
        public IUserSessionRepository UserSessions { get; }



        public AccountUnitOfWork(AccountDbContext context) : base(context)
        {
            Projects = new ProjectRepository(context);
            Authorizations = new AuthorizationRepository(context);
            AzFields = new AzFieldRepository(context);
            AzObjects = new AzObjectRepository(context);
            AzObjectFields = new AzObjectFieldRepository(context);
            AzValues = new AzValueRepository(context);
            CompositeRoles = new CompositeRoleRepository(context);
            Menus = new MenuRepository(context);
            TCodes = new TCodeRepository(context);
            MenuFolders = new MenuFolderRepository(context);
            Roles = new RoleRepository(context);
            Users = new UserRepository<TUser>(context);
            UserAgents = new UserAgentRepository(context);
            UserCompositeRoles = new UserCompositeRoleRepository(context);
            UserRoles = new UserRoleRepository(context);
            UserSessions = new UserSessionRepository(context);
        }
    }
}