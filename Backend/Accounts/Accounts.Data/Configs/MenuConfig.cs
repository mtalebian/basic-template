using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;
using System;

namespace Accounts.Data
{
    public class MenuConfig
    {
        public MenuConfig(ModelBuilder modelBuilder, AccountsConfig config)
        {
            var Menu = new ConfigHelper<Menu>(modelBuilder, config.MenusTableName);
            Menu.HasKey(x => new { x.ProjectId, x.Id });

            Menu.DefineMenuFolderId(x => x.ParentId);
            Menu.DefineTitle(x => x.Title);
            Menu.DefineUrl(x => x.Url);

            Menu.HasMaxLength(x => x.Id, 20);
            Menu.HasMaxLength(x => x.ParentId, 20, false);
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
                .HasForeignKey(s => s.ProjectId);
        }
    }
}