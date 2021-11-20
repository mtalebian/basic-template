using Accounts.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Accounts.Data
{
    public class AccountDbContext : DbContext
    {
        private readonly AccountsConfig _AccountsConfig;



        public AccountDbContext(DbContextOptions<AccountDbContext> options, IOptions<AccountsConfig> AccountsConfig) : base(options)
        {
            _AccountsConfig = AccountsConfig.Value;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //
            // Project 
            //
            var Project = new ConfigHelper<Project>(modelBuilder, _AccountsConfig.ProjectsTableName);
            Project.HasKey(x => x.Id);
            Project.DefineProjectId(x => x.Id);
            Project.DefineTitle(x => x.Title);
            Project.Entity().HasData(new Project { Id = "project1", Title = "Project 1" });

            //
            // Authorization
            // 
            var Authorization = new ConfigHelper<Authorization>(modelBuilder, _AccountsConfig.AuthorizationsTableName);
            Authorization.HasKey(x => x.Id);
            Authorization.IsAutoIncrement(x => x.Id);
            Authorization.DefineProjectId(x => x.ProjectId);
            Authorization.DefineObjectId(x => x.ObjectId);
            Authorization.DefineRoleId(x => x.RoleId);

            Authorization.Entity()
               .HasOne(x => x.Role)
               .WithMany(x => x.Authorizations)
               .HasForeignKey(x => new { x.ProjectId, x.RoleId });


            //
            // AzField
            //
            var AzField = new ConfigHelper<AzField>(modelBuilder, _AccountsConfig.AzFieldsTableName);
            AzField.HasKey(x => x.Id);
            AzField.DefineFieldId(x => x.Id);
            AzField.DefineTitle(x => x.Title);

            //
            // AzObjectField
            //
            var AzObjectField = new ConfigHelper<AzObjectField>(modelBuilder, _AccountsConfig.AzObjectFieldsTableName);
            AzObjectField.HasKey(x => new { x.ObjectId, x.FieldId });
            AzObjectField.DefineObjectId(x => x.ObjectId);
            AzObjectField.DefineFieldId(x => x.FieldId);

            AzObjectField.Entity()
                .HasOne<AzObject>(x => x.AzObject)
                .WithMany(x => x.AzObjectFields)
                .HasForeignKey(s => s.ObjectId);

            AzObjectField.Entity()
                .HasOne<AzField>(x => x.AzField)
                .WithMany(x => x.AzObjectFields)
                .HasForeignKey(s => s.FieldId);

            //
            // RoleCompositeRole
            //
            var RoleCompositeRole = new ConfigHelper<RoleCompositeRole>(modelBuilder, _AccountsConfig.RoleCompositeRoleTableName);
            RoleCompositeRole.HasKey(x => new { x.ProjectId, x.RoleId,x.CompositeRoleId });
            RoleCompositeRole.DefineProjectId(x => x.ProjectId);
            RoleCompositeRole.DefineRoleId(x => x.RoleId);
            RoleCompositeRole.DefineRoleId(x => x.CompositeRoleId);
            RoleCompositeRole.Entity()
               .HasOne<Role>(x => x.Role)
               .WithMany(x => x.RoleCompositeRoles)
               .HasForeignKey(x => new { x.ProjectId, x.RoleId });


            RoleCompositeRole.Entity()
                .HasOne<CompositeRole>(x => x.CompositeRole)
                .WithMany(x => x.RoleCompositeRoles)
               .HasForeignKey(x => new { x.ProjectId, x.CompositeRoleId });

            //
            // AzObject
            //
            var AzObject = new ConfigHelper<AzObject>(modelBuilder, _AccountsConfig.AzObjectsTableName);
            AzObject.HasKey(x => x.Id);
            AzObject.DefineObjectId(x => x.Id);
            AzObject.DefineTitle(x => x.Title);

            //
            // AzValue
            //
            var AzValue = new ConfigHelper<AzValue>(modelBuilder, _AccountsConfig.AzValuesTableName);
            AzValue.HasKey(x => x.Serial);
            AzValue.IsAutoIncrement(x => x.Serial);
            AzValue.DefineObjectId(x => x.ObjectId);
            AzValue.DefineFieldId(x => x.FieldId);

            AzValue.Entity()
                .HasOne(x => x.Authorization)
                .WithMany(x => x.Values)
                .HasForeignKey(x => x.AuthorizationId);

            AzValue.Entity()
                .HasOne(x => x.AzObjectField)
                .WithMany(x => x.Values)
                .HasForeignKey(x => new { x.ObjectId, x.FieldId });

            //
            // CompositeRole
            //
            var CompositeRole = new ConfigHelper<CompositeRole>(modelBuilder, _AccountsConfig.CompositeRolesTableName);
            CompositeRole.HasKey(x => new { x.ProjectId, x.Id });
            CompositeRole.DefineProjectId(x => x.ProjectId);
            CompositeRole.DefineCompositeRoleId(x => x.Id);
            CompositeRole.DefineTitle(x => x.Title);
            CompositeRole.DefineUserName(x => x.LastUpdatedBy);
            CompositeRole.DefineUserName(x => x.CreatedBy);
            CompositeRole.DefaultGetDate(x => x.LastUpdate);
            CompositeRole.DefaultGetDate(x => x.CreatedAt);


            //
            // MenuFolder
            // 
            var MenuFolder = new ConfigHelper<MenuFolder>(modelBuilder, _AccountsConfig.MenuFoldersTableName);
            MenuFolder.HasKey(x => new { x.ProjectId, x.Id });
            MenuFolder.DefineProjectId(x => x.ProjectId);
            MenuFolder.DefineMenuFolderId(x => x.Id);
            MenuFolder.DefineMenuFolderId(x => x.ParentId, false);
            MenuFolder.DefineTitle(x => x.Title);
            MenuFolder.IsRequired(x => x.SortOrder);

            MenuFolder.Entity()
                .HasOne<Project>(x => x.Project)
                .WithMany(x => x.MenuFolders)
                .HasForeignKey(x => x.ProjectId);

            MenuFolder.Entity()
                .HasOne(x => x.Parent)
                .WithMany(x => x.SubFolders)
                .HasForeignKey(x => new { x.ProjectId, x.ParentId });

            MenuFolder.Entity()
                .HasData(
                    new MenuFolder { ProjectId = "project1", Id = "config", Title = "Project Configuration" },
                    new MenuFolder { ProjectId = "project1", Id = "admin", Title = "Project Administartion" }
                    );

            //
            // Menu
            //
            var Menu = new ConfigHelper<Menu>(modelBuilder, _AccountsConfig.MenusTableName);
            Menu.HasKey(x => new { x.ProjectId, x.Id });

            Menu.DefineMenuId(x => x.Id);
            Menu.DefineMenuFolderId(x => x.ParentId);
            Menu.DefineTitle(x => x.Title);
            Menu.DefineUrl(x => x.Url);

            Menu.DefineMenuFolderId(x => x.ParentId, false);
            Menu.IsRequired(x => x.OpenInNewTab);
            Menu.IsRequired(x => x.SortOrder);
            Menu.DefaultGetDate(x => x.CreatedAt);

            Menu.Entity()
                .HasOne(x => x.Parent)
                .WithMany(x => x.Menus)
                .HasForeignKey(x => new { x.ProjectId, x.ParentId });

            Menu.Entity()
                .HasOne(x => x.Application)
                .WithMany(x => x.Menus)
                .HasForeignKey(s => s.ApplicationId);

            Menu.Entity()
                .HasOne(x => x.Project)
                .WithMany(x => x.Menus)
                .HasForeignKey(x => x.ProjectId);

            Menu.Entity()
                .HasData(
                    new Menu { ProjectId = "project1", Id = "config-grid-builder", ParentId = "config", Title = "Grid builder", Url = "/admin/grid-builder" },
                    new Menu { ProjectId = "project1", Id = "config-grids", ParentId = "config", Title = "Maintain base tables", Url = "/admin/grids" },
                    new Menu { ProjectId = "project1", Id = "config-grid", ParentId = "config", Title = "Maintain table", Url = "/admin/grid" },

                    new Menu { ProjectId = "project1", Id = "config-menu", ParentId = "config", Title = "Maintain project menu", Url = "/admin/menu" },

                    new Menu { ProjectId = "project1", Id = "users", ParentId = "admin", Title = "Manage Users", Url = "/admin/users" },
                     new Menu { ProjectId = "project1", Id = "roles", ParentId = "admin", Title = "Manage Roles", Url = "/admin/roles" },
                     new Menu { ProjectId = "project1", Id = "composite-roles", ParentId = "admin", Title = "Manage Composite Role", Url = "/admin/composite-roles" }
                );

            //
            // Role 
            //
            var Role = new ConfigHelper<Role>(modelBuilder, _AccountsConfig.RolesTableName);
            Role.HasKey(x => new { x.ProjectId, x.Id });
            Role.DefineProjectId(x => x.ProjectId);
            Role.DefineRoleId(x => x.Id);
            Role.DefineTitle(x => x.Title);
            Role.DefineUserName(x => x.LastUpdatedBy);
            Role.DefineUserName(x => x.CreatedBy);
            Role.DefaultGetDate(x => x.LastUpdate);
            Role.DefaultGetDate(x => x.CreatedAt);

            Role.Entity()
                .HasOne<Application>(x => x.Application)
                .WithMany(x => x.Roles)
                .HasForeignKey(x => x.ApplicationId);


            //
            // UserAgent 
            //
            var UserAgent = new ConfigHelper<UserAgent>(modelBuilder, _AccountsConfig.UserAgentsTableName);
            UserAgent.HasKey(x => x.Id);
            UserAgent.IsAutoIncrement(x => x.Id);
            UserAgent.IsRequired(x => x.Value);
            UserAgent.Varchar100(x => x.OS);
            UserAgent.Varchar100(x => x.Browser);
            UserAgent.Varchar100(x => x.Device);
            UserAgent.Varchar100(x => x.Brand);
            UserAgent.Varchar100(x => x.Model);
            UserAgent.DefaultGetDate(x => x.CreatedAt);

            //
            // UserCompositeRole
            //
            var UserCompositeRole = new ConfigHelper<UserCompositeRole>(modelBuilder, _AccountsConfig.UserCompositeRolesTableName);
            UserCompositeRole.HasKey(x => new { x.UserId, x.ProjectId, x.CompositeRoleId });
            UserCompositeRole.DefineProjectId(x => x.ProjectId);
            UserCompositeRole.DefineCompositeRoleId(x => x.CompositeRoleId);
            UserCompositeRole.DefineUserName(x => x.CreatedBy);
            UserCompositeRole.DefaultGetDate(x => x.CreatedAt);

            UserCompositeRole.Entity()
                .HasOne<User>(x => x.User)
                .WithMany(x => x.UserCompositeRoles)
                .HasForeignKey(x => x.UserId);

            UserCompositeRole.Entity()
                .HasOne<CompositeRole>(x => x.CompositeRole)
                .WithMany(x => x.UserCompositeRoles)
                .HasForeignKey(x => new { x.ProjectId, x.CompositeRoleId });


            //
            // UserRole 
            //
            var UserRole = new ConfigHelper<UserRole>(modelBuilder, _AccountsConfig.UserRolesTableName);
            UserRole.HasKey(x => new { x.UserId, x.ProjectId, x.RoleId });
            UserRole.DefineProjectId(x => x.ProjectId);
            UserRole.DefineRoleId(x => x.RoleId);
            UserRole.DefineUserName(x => x.CreatedBy);
            UserRole.DefaultGetDate(x => x.CreatedAt);

            UserRole.Entity()
                .HasOne<User>(x => x.User)
                .WithMany(x => x.UserRoles)
                .HasForeignKey(x => x.UserId);

            UserRole.Entity()
                .HasOne<Role>(x => x.Role)
                .WithMany(x => x.UserRoles)
                .HasForeignKey(x => new { x.ProjectId, x.RoleId });

            //
            // User 
            //
            var User = new ConfigHelper<User>(modelBuilder, _AccountsConfig.UsersTableName);
            User.HasKey(x => x.Id);
            User.IsAutoIncrement(x => x.Id);
            User.DefineUserName(x => x.UserName);
            User.Varchar50(x => x.FirstName);
            User.Varchar50(x => x.LastName);
            User.HasMaxLength(x => x.NationalCode, 15, false);
            User.Varchar100(x => x.PasswordHash, false);
            User.DefineUrl(x => x.Email, false);
            User.IsRequired(x => x.EmailConfirmed);
            User.HasMaxLength(x => x.PhoneNumber, 15, false);
            User.IsRequired(x => x.PhoneNumberConfirmed);
            User.IsRequired(x => x.AccessFailedCount);
            User.IsRequired(x => x.LockoutEnabled);
            User.IsRequired(x => x.WindowsAuthenticate);
            User.IsRequired(x => x.IsDeleted);
            User.IsRequired(x => x.IsDisabled);
            User.DefaultGetDate(x => x.LastUpdate);
            User.DefaultGetDate(x => x.CreatedAt);

            var admin = new User
            {
                Id = 1,
                UserName = "admin",
                FirstName = "",
                LastName = "Administrator",
                PasswordHash = Common.Cryptography.Helper.HashPassword("123"),
            };
            User.Entity().HasData(admin);

            //
            // UserSession 
            //
            var UserSession = new ConfigHelper<UserSession>(modelBuilder, _AccountsConfig.UserSessionsTableName);
            UserSession.HasKey(x => x.Id);
            UserSession.IsAutoIncrement(x => x.Id);
            UserSession.Varchar50(x => x.RefreshToken);
            UserSession.IsRequired(x => x.RefreshCount);
            UserSession.IsRequired(x => x.RefreshTokenDate);
            UserSession.DefineProjectId(x => x.ProjectId);
            UserSession.DefineIP(x => x.IP);
            UserSession.DefineIP(x => x.LastIP);
            UserSession.IsRequired(x => x.IPList);
            UserSession.IsRequired(x => x.UserAgentId);
            UserSession.DefaultValue(x => x.IsDeleted, false);
            UserSession.DefaultGetDate(x => x.CreatedAt);

            UserSession.Entity()
                .HasOne<UserAgent>(x => x.UserAgent)
                .WithMany(x => x.UserSessions)
                .HasForeignKey(s => s.UserAgentId);

            UserSession.Entity()
                .HasOne<User>(x => x.User)
                .WithMany(x => x.UserSessions)
                .HasForeignKey(x => x.UserId);
        }
    }
}