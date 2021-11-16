using Common.Data;
using Common.Security;
using Forms.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Forms.Data
{
    public class FormDbContext : BaseDbContext
    {
        private readonly FormsConfig _FormsConfig;


        public FormDbContext(DbContextOptions<FormDbContext> options, IOptions<FormsConfig> formsConfig, ICurrentUserNameService currentUserNameService)
            : base(options, currentUserNameService)
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
            Grid.DefaultValue(x => x.FlexLayout, 0, true);
            Grid.NVarChar(x => x.SelectSql, 2000, false);
            Grid.NVarChar(x => x.InsertSql, 1000, false);
            Grid.NVarChar(x => x.UpdateSql, 1000, false);
            Grid.NVarChar(x => x.DeleteSql, 1000, false);
            Grid.NVarChar(x => x.DefaultFilter, 1000, false);

            Grid.NVarChar(x => x.AzGrid, 1000, false);
            Grid.NVarChar(x => x.AzSelect, 1000, false);
            Grid.NVarChar(x => x.AzInsert, 1000, false);
            Grid.NVarChar(x => x.AzUpdate, 1000, false);
            Grid.NVarChar(x => x.AzDelete, 1000, false);

            Grid.DefineUserName(x => x.CreatedBy, "");
            Grid.DefineUserName(x => x.ModifiedBy, "");
            Grid.DefineCreatedAt(x => x.CreatedAt, "");
            Grid.DefineCreatedAt(x => x.ModifiedAt, "");

            Grid.Entity()
                .HasOne(x => x.Group)
                .WithMany(x => x.Tables)
                .HasForeignKey(x => new { x.ProjectId, x.GroupId });



            Grid.Entity()
                .HasData(
                new Grid { ProjectId = "project1", Id = $"{Grid.Schema}.Projects", TableName = $"{Grid.Schema}.Projects", GroupId = 1, Title = "Projects", FlexLayout = false, },
                new Grid { ProjectId = "project1", Id = $"{Grid.Schema}.AzObjects", TableName = $"{Grid.Schema}.AzObjects", GroupId = 1, Title = "AzObjects", FlexLayout = false, },
                new Grid { ProjectId = "project1", Id = $"{Grid.Schema}.AzObjectFields", TableName = $"{Grid.Schema}.AzObjectFields", GroupId = 1, Title = "AzObjectFields", FlexLayout = false, },
                new Grid { ProjectId = "project1", Id = $"{Grid.Schema}.AzFields", TableName = $"{Grid.Schema}.AzFields", GroupId = 1, Title = "AzFields", FlexLayout = false, },
                new Grid { ProjectId = "project1", Id = $"{Grid.Schema}.Applications", TableName = $"{Grid.Schema}.Applications", GroupId = 1, Title = "Applications", FlexLayout = false, }
                );


            //
            // Column 
            //
            var Column = new ConfigHelper<GridColumn>(modelBuilder, _FormsConfig.GridColumnsTableName);
            Column.HasKey(x => new { x.Id });
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
            Column.DefaultValue(x => x.FilterRequired, 0, true);
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
            GridVariant.DefineName(x => x.GridId);
            GridVariant.DefineTitle(x => x.Title);
            GridVariant.DefaultValue(x => x.IsDefault, 0, true);
            GridVariant.DefaultValue(x => x.IsPublic, 0, true);
            GridVariant.DefaultValue(x => x.AutoApply, 0, true);
            GridVariant.NVarChar(x => x.FiltersData, 2000, false);
            GridVariant.NVarChar(x => x.ColumnsData, 500, false);
            GridVariant.NVarChar(x => x.SortsData, 500, false);
            
            GridVariant.DefineUserName(x => x.CreatedBy, "");
            GridVariant.DefineUserName(x => x.ModifiedBy, "");
            GridVariant.DefineCreatedAt(x => x.CreatedAt, "");
            GridVariant.DefineCreatedAt(x => x.ModifiedAt, "");

            GridVariant.Entity()
                .HasOne(x => x.Grid)
                .WithMany(x => x.Variants)
                .HasForeignKey(x => new { x.ProjectId, x.GridId });



            //
            // Text
            //
            var Text = new ConfigHelper<Text>(modelBuilder, _FormsConfig.TextsTableName);
            Text.HasKey(x => new { x.LanguageCode, x.Name });
            Text.VarChar(x => x.LanguageCode, 10, true);
            Text.NVarChar(x => x.Name, 100, true);
            Text.NVarChar(x => x.Value, 1000, false);
            Text.DefineCreatedAt(x => x.CreatedAt, "_CreatedAt");



            //
            // ChangeDocumentHeader
            //
            var CDHDR = new ConfigHelper<ChangeDocumentHeader>(modelBuilder, _FormsConfig.CDHDRTableName);
            CDHDR.HasKey(x => x.Serial);
            CDHDR.IsAutoIncrement(x => x.Serial);
            CDHDR.VarChar(x => x.ObjectClass, 20, true);
            CDHDR.VarChar(x => x.ObjectValue, 200, true);
            CDHDR.NVarChar(x => x.Url, 300, true);
            CDHDR.DefineUserName(x => x.UserName, "");
            CDHDR.DefineCreatedAt(x => x.CreatedAt, "");

            //
            // ChangeDocumentHeader
            //
            var CDPOS = new ConfigHelper<ChangeDocumentItem>(modelBuilder, _FormsConfig.CDPOSTableName);
            CDPOS.HasKey(x => x.Serial);
            CDPOS.IsAutoIncrement(x => x.Serial);
            CDPOS.IsRequired(x => x.HeaderSerial, true);
            CDPOS.VarChar(x => x.TableName, 50, true);
            CDPOS.VarChar(x => x.TableKey, 200, true);
            CDPOS.VarChar(x => x.FieldName, 30, true);
            CDPOS.VarChar(x => x.ChangeType, 1, true);
            CDPOS.NVarChar(x => x.OldValue, 1000, true);
            CDPOS.NVarChar(x => x.NewValue, 1000, true);

            CDPOS.Entity()
                .HasOne(x => x.Header)
                .WithMany(x => x.Items)
                .HasForeignKey(x => x.HeaderSerial);



        }
    }
}