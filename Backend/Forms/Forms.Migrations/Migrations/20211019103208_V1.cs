using Microsoft.EntityFrameworkCore.Migrations;

namespace Forms.Migrations.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "tmp");

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
                name: "Tables",
                schema: "tmp",
                columns: table => new
                {
                    ProjectId = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    GroupId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    SingularTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    Sortable = table.Column<bool>(type: "bit", nullable: false),
                    Filterable = table.Column<bool>(type: "bit", nullable: false),
                    SelectSql = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InsertSql = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateSql = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeleteSql = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tables", x => new { x.ProjectId, x.Name });
                    table.ForeignKey(
                        name: "FK_Tables_Groups_ProjectId_GroupId",
                        columns: x => new { x.ProjectId, x.GroupId },
                        principalSchema: "tmp",
                        principalTable: "Groups",
                        principalColumns: new[] { "ProjectId", "Id" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Columns",
                schema: "tmp",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectId = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    TableName = table.Column<string>(type: "varchar(50)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    IsPK = table.Column<bool>(type: "bit", nullable: false),
                    IsNull = table.Column<bool>(type: "bit", nullable: false),
                    DataType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaxLen = table.Column<int>(type: "int", nullable: true),
                    DefaultValue = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    ShowInList = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    ShowInEditor = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    Direction = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Display = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ValidValues = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CellClassName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrdinalPosition = table.Column<int>(type: "int", nullable: false, defaultValue: 0)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Columns", x => new { x.ProjectId, x.Id });
                    table.ForeignKey(
                        name: "FK_Columns_Tables_ProjectId_TableName",
                        columns: x => new { x.ProjectId, x.TableName },
                        principalSchema: "tmp",
                        principalTable: "Tables",
                        principalColumns: new[] { "ProjectId", "Name" },
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                schema: "tmp",
                table: "Groups",
                columns: new[] { "Id", "ProjectId", "Title" },
                values: new object[] { 1, "project1", "System Tables" });

            migrationBuilder.InsertData(
                schema: "tmp",
                table: "Tables",
                columns: new[] { "Name", "ProjectId", "DeleteSql", "Description", "Filterable", "GroupId", "InsertSql", "SelectSql", "SingularTitle", "Sortable", "Title", "UpdateSql" },
                values: new object[] { "tmp.Projects", "project1", null, null, true, 1, null, null, "Project", true, "Projects", null });

            migrationBuilder.CreateIndex(
                name: "IX_Columns_ProjectId_TableName",
                schema: "tmp",
                table: "Columns",
                columns: new[] { "ProjectId", "TableName" });

            migrationBuilder.CreateIndex(
                name: "IX_Tables_ProjectId_GroupId",
                schema: "tmp",
                table: "Tables",
                columns: new[] { "ProjectId", "GroupId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Columns",
                schema: "tmp");

            migrationBuilder.DropTable(
                name: "Tables",
                schema: "tmp");

            migrationBuilder.DropTable(
                name: "Groups",
                schema: "tmp");
        }
    }
}
