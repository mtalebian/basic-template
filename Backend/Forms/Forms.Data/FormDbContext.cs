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
            // Grid 
            //
            var Grid = new ConfigHelper<Grid>(modelBuilder, _FormsConfig.GridsTableName);
            Grid.HasKey(x => new { x.ProjectId, x.Id });
            Grid.DefineProjectId(x => x.ProjectId);
            Grid.DefineName(x => x.Id);
            Grid.IsRequired(x => x.GroupId);
            Grid.DefineTitle(x => x.Title);
            Grid.DefineDescription(x => x.Description);

            Grid.Entity()
                .HasOne(x => x.Group)
                .WithMany(x => x.Tables)
                .HasForeignKey(x => new { x.ProjectId, x.GroupId });

            
            Grid.Entity()
                .HasData(new Grid
                {
                    ProjectId = "project1",
                    Id = $"{Grid.Schema}.Projects",
                    GroupId = 1,
                    Title = "Projects",
                    FlexLayout = false,
                });


            //
            // Column 
            //
            var Column = new ConfigHelper<GridColumn>(modelBuilder, _FormsConfig.GridColumnsTableName);
            Column.HasKey(x => new { x.ProjectId, x.Id });
            Column.IsAutoIncrement(x => x.Id);
            Column.DefineProjectId(x => x.ProjectId);
            Column.DefineName(x => x.Title);
            Column.DefineTitle(x => x.Title);
            Column.IsRequired(x => x.IsPK);
            Column.IsRequired(x => x.IsNull);
            Column.VarChar(x => x.DataType, 20, false);
            Column.IsRequired(x => x.MaxLen, false);
            Column.NVarChar(x => x.DefaultValue, 500, false);
            Column.NVarChar(x => x.Filter, 20, false);
            Column.IsRequired(x => x.Width, false);

            Column.DefaultValue(x => x.IsReadOnly, 0, true);
            Column.DefaultValue(x => x.ShowInList, 1, true);
            Column.DefaultValue(x => x.ShowInEditor, 1, true);

            Column.VarChar(x => x.Display, 20, false);
            Column.VarChar(x => x.ValidValues, 2000, false);
            Column.VarChar(x => x.CellClassName, 100, false);
            Column.VarChar(x => x.ControlClassName, 100, false);

            Column.NVarChar(x => x.Category, 200, false);
            Column.DefaultValue(x => x.OrdinalPosition, 0, true);

            Column.Entity()
                .HasOne(x => x.Table)
                .WithMany(x => x.Columns)
                .HasForeignKey(x => new { x.ProjectId, x.GridId });



            //
            // GridVariant
            //
            var GridVariant = new ConfigHelper<GridVariant>(modelBuilder, _FormsConfig.GridVariantsTableName);
            GridVariant.HasKey(x => x.Serial);
            GridVariant.IsAutoIncrement(x => x.Serial);
            GridVariant.DefineProjectId(x => x.ProjectId);
            GridVariant.DefineGridId(x => x.GridId);
            GridVariant.DefineName(x => x.TableName);
            GridVariant.NVarChar(x => x.FiltersData, 2000, false);
            GridVariant.DefineUserName(x => x.CreatedBy);
            GridVariant.DefineCreatedAt(x => x.CreatedAt);




            //
            // Text
            //
            var Text = new ConfigHelper<Text>(modelBuilder, _FormsConfig.TextsTableName);
            Text.HasKey(x => new { x.LanguageCode, x.Name });
            Text.VarChar(x => x.LanguageCode, 10, true);
            Text.NVarChar(x => x.Name, 100, true);
            Text.NVarChar(x => x.Value, 1000, false);
            Text.DefineCreatedAt(x => x.CreatedAt, true);


        }
    }
}