using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Forms.Migrations.Migrations
{
    public partial class V3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "tmp");

            migrationBuilder.CreateTable(
                name: "CDHDR",
                schema: "tmp",
                columns: table => new
                {
                    Serial = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ObjectClass = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    ObjectValue = table.Column<string>(type: "varchar(200)", unicode: false, maxLength: 200, nullable: false),
                    Url = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    UserName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CDHDR", x => x.Serial);
                });

            migrationBuilder.CreateTable(
                name: "Groups",
                schema: "tmp",
                columns: table => new
                {
                    ProjectId = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => new { x.ProjectId, x.Id });
                });

            migrationBuilder.CreateTable(
                name: "Texts",
                schema: "tmp",
                columns: table => new
                {
                    LanguageCode = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Value = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Texts", x => new { x.LanguageCode, x.Name });
                });

            migrationBuilder.CreateTable(
                name: "CDPOS",
                schema: "tmp",
                columns: table => new
                {
                    Serial = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HeaderSerial = table.Column<long>(type: "bigint", nullable: false),
                    TableName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    TableKey = table.Column<string>(type: "varchar(200)", unicode: false, maxLength: 200, nullable: false),
                    FieldName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: false),
                    ChangeType = table.Column<string>(type: "varchar(1)", unicode: false, maxLength: 1, nullable: false),
                    OldValue = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    NewValue = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CDPOS", x => x.Serial);
                    table.ForeignKey(
                        name: "FK_CDPOS_CDHDR_HeaderSerial",
                        column: x => x.HeaderSerial,
                        principalSchema: "tmp",
                        principalTable: "CDHDR",
                        principalColumn: "Serial",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Grids",
                schema: "tmp",
                columns: table => new
                {
                    ProjectId = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    Id = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    TableName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GroupId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    Filterable = table.Column<bool>(type: "bit", nullable: false),
                    HasFilterVariant = table.Column<bool>(type: "bit", nullable: false),
                    DefaultFilter = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    FlexLayout = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    SelectSql = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    InsertSql = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    UpdateSql = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    DeleteSql = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    AzGrid = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    AzSelect = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    AzInsert = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    AzUpdate = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    AzDelete = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedBy = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    ModifiedBy = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grids", x => new { x.ProjectId, x.Id });
                    table.ForeignKey(
                        name: "FK_Grids_Groups_ProjectId_GroupId",
                        columns: x => new { x.ProjectId, x.GroupId },
                        principalSchema: "tmp",
                        principalTable: "Groups",
                        principalColumns: new[] { "ProjectId", "Id" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GridColumns",
                schema: "tmp",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectId = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    GridId = table.Column<string>(type: "varchar(50)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    IsPK = table.Column<bool>(type: "bit", nullable: false),
                    IsNull = table.Column<bool>(type: "bit", nullable: false),
                    DataType = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    MaxLen = table.Column<int>(type: "int", nullable: true),
                    DefaultValue = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Width = table.Column<int>(type: "int", nullable: true),
                    Filter = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    FilterRequired = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CheckGrid = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CheckField = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    ShowInList = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    ShowInEditor = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    Display = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    ValidValues = table.Column<string>(type: "varchar(2000)", unicode: false, maxLength: 2000, nullable: true),
                    CellClassName = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    ControlClassName = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    Category = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    OrdinalPosition = table.Column<int>(type: "int", nullable: false, defaultValue: 0)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GridColumns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GridColumns_Grids_ProjectId_GridId",
                        columns: x => new { x.ProjectId, x.GridId },
                        principalSchema: "tmp",
                        principalTable: "Grids",
                        principalColumns: new[] { "ProjectId", "Id" },
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "GridVariants",
                schema: "tmp",
                columns: table => new
                {
                    Serial = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectId = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    GridId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    IsDefault = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    IsPublic = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    AutoApply = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    FiltersData = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    ColumnsData = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    SortsData = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    CreatedBy = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    ModifiedBy = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GridVariants", x => x.Serial);
                    table.ForeignKey(
                        name: "FK_GridVariants_Grids_ProjectId_GridId",
                        columns: x => new { x.ProjectId, x.GridId },
                        principalSchema: "tmp",
                        principalTable: "Grids",
                        principalColumns: new[] { "ProjectId", "Id" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                schema: "tmp",
                table: "Groups",
                columns: new[] { "Id", "ProjectId", "Title" },
                values: new object[] { 1, "project1", "System Tables" });

            migrationBuilder.InsertData(
                schema: "tmp",
                table: "Grids",
                columns: new[] { "Id", "ProjectId", "AzDelete", "AzGrid", "AzInsert", "AzSelect", "AzUpdate", "CreatedAt", "CreatedBy", "DefaultFilter", "DeleteSql", "Description", "Filterable", "GroupId", "HasFilterVariant", "InsertSql", "ModifiedAt", "ModifiedBy", "SelectSql", "TableName", "Title", "UpdateSql" },
                values: new object[,]
                {
                    { "tmp.Projects", "project1", null, null, null, null, null, new DateTime(2021, 11, 17, 8, 38, 56, 930, DateTimeKind.Utc).AddTicks(6168), "", null, null, null, true, 1, false, null, new DateTime(2021, 11, 17, 8, 38, 56, 930, DateTimeKind.Utc).AddTicks(6178), "", null, "tmp.Projects", "Projects", null },
                    { "tmp.AzObjects", "project1", null, null, null, null, null, new DateTime(2021, 11, 17, 8, 38, 56, 930, DateTimeKind.Utc).AddTicks(7415), "", null, null, null, true, 1, false, null, new DateTime(2021, 11, 17, 8, 38, 56, 930, DateTimeKind.Utc).AddTicks(7416), "", null, "tmp.AzObjects", "AzObjects", null },
                    { "tmp.AzObjectFields", "project1", null, null, null, null, null, new DateTime(2021, 11, 17, 8, 38, 56, 930, DateTimeKind.Utc).AddTicks(7421), "", null, null, null, true, 1, false, null, new DateTime(2021, 11, 17, 8, 38, 56, 930, DateTimeKind.Utc).AddTicks(7421), "", null, "tmp.AzObjectFields", "AzObjectFields", null },
                    { "tmp.AzFields", "project1", null, null, null, null, null, new DateTime(2021, 11, 17, 8, 38, 56, 930, DateTimeKind.Utc).AddTicks(7423), "", null, null, null, true, 1, false, null, new DateTime(2021, 11, 17, 8, 38, 56, 930, DateTimeKind.Utc).AddTicks(7424), "", null, "tmp.AzFields", "AzFields", null },
                    { "tmp.Applications", "project1", null, null, null, null, null, new DateTime(2021, 11, 17, 8, 38, 56, 930, DateTimeKind.Utc).AddTicks(7425), "", null, null, null, true, 1, false, null, new DateTime(2021, 11, 17, 8, 38, 56, 930, DateTimeKind.Utc).AddTicks(7426), "", null, "tmp.Applications", "Applications", null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CDPOS_HeaderSerial",
                schema: "tmp",
                table: "CDPOS",
                column: "HeaderSerial");

            migrationBuilder.CreateIndex(
                name: "IX_GridColumns_ProjectId_GridId",
                schema: "tmp",
                table: "GridColumns",
                columns: new[] { "ProjectId", "GridId" });

            migrationBuilder.CreateIndex(
                name: "IX_Grids_ProjectId_GroupId",
                schema: "tmp",
                table: "Grids",
                columns: new[] { "ProjectId", "GroupId" });

            migrationBuilder.CreateIndex(
                name: "IX_GridVariants_ProjectId_GridId",
                schema: "tmp",
                table: "GridVariants",
                columns: new[] { "ProjectId", "GridId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CDPOS",
                schema: "tmp");

            migrationBuilder.DropTable(
                name: "GridColumns",
                schema: "tmp");

            migrationBuilder.DropTable(
                name: "GridVariants",
                schema: "tmp");

            migrationBuilder.DropTable(
                name: "Texts",
                schema: "tmp");

            migrationBuilder.DropTable(
                name: "CDHDR",
                schema: "tmp");

            migrationBuilder.DropTable(
                name: "Grids",
                schema: "tmp");

            migrationBuilder.DropTable(
                name: "Groups",
                schema: "tmp");
        }
    }
}
