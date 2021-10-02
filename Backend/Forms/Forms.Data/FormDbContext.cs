using Forms.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;

namespace Forms.Data
{
    public class FormDbContext : DbContext
    {
        private readonly FormsConfig _FormsConfig;



        public FormDbContext(DbContextOptions<FormDbContext> options, IOptions<FormsConfig> formsConfig) : base(options)
        {
            _FormsConfig = formsConfig.Value;
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var schema = ConfigHelper<object>.GetSchema(_FormsConfig.TableFormsTableName);

            
            //
            // Group 
            //
            var Group = new ConfigHelper<Group>(modelBuilder, _FormsConfig.GroupsTableName);
            Group.HasKey(x => new { x.ProjectId, x.Id });
            Group.DefineProjectId(x => x.ProjectId);
            Group.IsAutoIncrement(x => x.Id);
            Group.DefineTitle(x => x.Title);

            Group.Entity()
                .HasData(new Group { Id = 1, ProjectId = "project1", Title = "System Tables" });

            //
            // Table 
            //
            var Table = new ConfigHelper<Table>(modelBuilder, _FormsConfig.TablesTableName);
            Table.HasKey(x => new { x.ProjectId, x.Name });
            Table.DefineName(x => x.Name);
            Table.IsRequired(x => x.GroupId);
            Table.DefineTitle(x => x.Title);
            Table.DefineDescription(x => x.Description);

            Table.Entity()
                .HasOne(x => x.Group)
                .WithMany(x => x.Tables)
                .HasForeignKey(x => new { x.ProjectId, x.GroupId });

            Table.Entity()
                .HasData(new Table
                {
                    ProjectId = "project1",
                    Name = $"{schema}.Projects",
                    GroupId=1,
                    Title = "Projects",
                    SingularTitle = "Project",
                    Sortable = true,
                    Filterable = true,
                });


            //
            // Column 
            //
            var Column = new ConfigHelper<Column>(modelBuilder, _FormsConfig.ColumnsTableName);
            Column.HasKey(x => new { x.ProjectId, x.Id });
            Column.IsAutoIncrement(x => x.Id);
            Column.Varchar50(x => x.Alias, false);
            Column.DefineTitle(x => x.Title);
            Column.DefineDescription(x => x.Description);

            Column.Entity()
                .HasOne(x => x.Table)
                .WithMany(x => x.Columns)
                .HasForeignKey(x => new { x.ProjectId, x.TableName });

            Column.Entity()
                .HasData(new Column
                {
                    Id = 1,
                    ProjectId = "project1",
                    TableName = $"{schema}.Projects",
                    Name = "Id",
                    Title = "Id",
                    IsPK = true,
                    IsRequired = true,
                    ToggleOnClick = true,
                    HiddenInEditor = false,
                    HiddenInTable = false,
                });
            
            
            //
            // Text
            //
            var Text= new ConfigHelper<Text>(modelBuilder, _FormsConfig.TextTableName);
            Text.HasKey(x => new { x.LanguageCode, x.Name});
            Text.Varchar20(x => x.LanguageCode, true);
            Text.Varchar100(x => x.Name, true);
            Text.HasMaxLength(x => x.Value, 1000, true);

            Column.Entity()
                .HasOne(x => x.Table)
                .WithMany(x => x.Columns)
                .HasForeignKey(x => new { x.ProjectId, x.TableName });

        }
    }
}