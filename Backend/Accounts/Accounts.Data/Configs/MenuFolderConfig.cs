using Accounts.Core;
using Microsoft.EntityFrameworkCore;

namespace Accounts.Data
{
    public class MenuFolderConfig 
    {
        public MenuFolderConfig(ModelBuilder modelBuilder, AccountsConfig config) 
        {
            var helper = new ConfigHelper<MenuFolder>(modelBuilder, config.MenuFoldersTableName);
            helper.HasKey(x => new { x.ProjectId, x.Id });
            helper.DefineProjectId(x => x.ProjectId);
            helper.DefineMenuFolderId(x => x.Id);
            helper.DefineMenuFolderId(x => x.ParentId, false);
            helper.DefineTitle(x => x.Title);
            helper.IsRequired(x => x.SortOrder);

            helper.Entity()
                .HasOne<Project>(x => x.Project)
                .WithMany(x => x.MenuFolders)
                .HasForeignKey(s => s.ProjectId);
        }
    }
}