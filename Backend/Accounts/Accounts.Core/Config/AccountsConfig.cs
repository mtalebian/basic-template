namespace Accounts.Core
{
    public class AccountsConfig
    {
        public const string SectionName = "Accounts";

        public int SessionExpiry { get; set; }
        
        public string ProjectsTableName { get; set; }
        public string AuthorizationsTableName { get; set; }
        public string AzFieldsTableName { get; set; }
        public string AzObjectsTableName { get; set; }
        public string AzObjectFieldsTableName { get; set; }
        public string AzValuesTableName { get; set; }
        public string CompositeRolesTableName { get; set; }
        public string MenusTableName { get; set; }
        public string ApplicationsTableName { get; set; }
        public string MenuFoldersTableName { get; set; }
        public string RolesTableName { get; set; }
        public string UsersTableName { get; set; }
        public string UserAgentsTableName { get; set; }
        public string UserCompositeRolesTableName { get; set; }
        public string UserRolesTableName { get; set; }
        public string UserSessionsTableName { get; set; }
        public string RoleCompositeRoleTableName { get; set; }
        public string LogTableName { get; set; }
    }
}