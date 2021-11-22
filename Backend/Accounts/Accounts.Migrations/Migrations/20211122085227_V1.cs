using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Accounts.Migrations.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "tmp");

            migrationBuilder.CreateTable(
                name: "Application",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Application", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CompositeRoles",
                schema: "tmp",
                columns: table => new
                {
                    ProjectId = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Id = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    LastUpdatedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    LastUpdate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    CreatedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompositeRoles", x => new { x.ProjectId, x.Id });
                });

            migrationBuilder.CreateTable(
                name: "Logs",
                schema: "tmp",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectId = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    SessionId = table.Column<long>(type: "bigint", nullable: false),
                    LogType = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateOn = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Logs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                schema: "tmp",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserAgents",
                schema: "tmp",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OS = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Browser = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Device = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Brand = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Model = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAgents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                schema: "tmp",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    NationalCode = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    PasswordHash = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false),
                    LastAccessFailedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LockoutEndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    WindowsAuthenticate = table.Column<bool>(type: "bit", nullable: false),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    IsDisabled = table.Column<bool>(type: "bit", nullable: false),
                    LastUpdate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                schema: "tmp",
                columns: table => new
                {
                    ProjectId = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Id = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ApplicationId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    LastUpdatedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    LastUpdate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    CreatedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => new { x.ProjectId, x.Id });
                    table.ForeignKey(
                        name: "FK_Roles_Application_ApplicationId",
                        column: x => x.ApplicationId,
                        principalTable: "Application",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AzFields",
                schema: "tmp",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    ValidValues = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ValuesQuery = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectId = table.Column<string>(type: "nvarchar(30)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AzFields", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AzFields_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalSchema: "tmp",
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AzObjects",
                schema: "tmp",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    ProjectId = table.Column<string>(type: "nvarchar(30)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AzObjects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AzObjects_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalSchema: "tmp",
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MenuFolders",
                schema: "tmp",
                columns: table => new
                {
                    ProjectId = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Id = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    ParentId = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    Title = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuFolders", x => new { x.ProjectId, x.Id });
                    table.ForeignKey(
                        name: "FK_MenuFolders_MenuFolders_ProjectId_ParentId",
                        columns: x => new { x.ProjectId, x.ParentId },
                        principalSchema: "tmp",
                        principalTable: "MenuFolders",
                        principalColumns: new[] { "ProjectId", "Id" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MenuFolders_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalSchema: "tmp",
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserCompositeRoles",
                schema: "tmp",
                columns: table => new
                {
                    ProjectId = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    CompositeRoleId = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserCompositeRoles", x => new { x.UserId, x.ProjectId, x.CompositeRoleId });
                    table.ForeignKey(
                        name: "FK_UserCompositeRoles_CompositeRoles_ProjectId_CompositeRoleId",
                        columns: x => new { x.ProjectId, x.CompositeRoleId },
                        principalSchema: "tmp",
                        principalTable: "CompositeRoles",
                        principalColumns: new[] { "ProjectId", "Id" },
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserCompositeRoles_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "tmp",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserSessions",
                schema: "tmp",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RefreshToken = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    RefreshCount = table.Column<int>(type: "int", nullable: false),
                    RefreshTokenDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProjectId = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    LastIP = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    IPList = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IP = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    UserAgentId = table.Column<int>(type: "int", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSessions_UserAgents_UserAgentId",
                        column: x => x.UserAgentId,
                        principalSchema: "tmp",
                        principalTable: "UserAgents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserSessions_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "tmp",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Authorizations",
                schema: "tmp",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectId = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    ObjectId = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Authorizations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Authorizations_Roles_ProjectId_RoleId",
                        columns: x => new { x.ProjectId, x.RoleId },
                        principalSchema: "tmp",
                        principalTable: "Roles",
                        principalColumns: new[] { "ProjectId", "Id" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RoleCompositeRoles",
                schema: "tmp",
                columns: table => new
                {
                    RoleId = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CompositeRoleId = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ProjectId = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleCompositeRoles", x => new { x.ProjectId, x.RoleId, x.CompositeRoleId });
                    table.ForeignKey(
                        name: "FK_RoleCompositeRoles_CompositeRoles_ProjectId_CompositeRoleId",
                        columns: x => new { x.ProjectId, x.CompositeRoleId },
                        principalSchema: "tmp",
                        principalTable: "CompositeRoles",
                        principalColumns: new[] { "ProjectId", "Id" },
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RoleCompositeRoles_Roles_ProjectId_RoleId",
                        columns: x => new { x.ProjectId, x.RoleId },
                        principalSchema: "tmp",
                        principalTable: "Roles",
                        principalColumns: new[] { "ProjectId", "Id" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                schema: "tmp",
                columns: table => new
                {
                    ProjectId = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => new { x.UserId, x.ProjectId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_UserRoles_Roles_ProjectId_RoleId",
                        columns: x => new { x.ProjectId, x.RoleId },
                        principalSchema: "tmp",
                        principalTable: "Roles",
                        principalColumns: new[] { "ProjectId", "Id" },
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRoles_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "tmp",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AzObjectFields",
                schema: "tmp",
                columns: table => new
                {
                    ObjectId = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    FieldId = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AzObjectFields", x => new { x.ObjectId, x.FieldId });
                    table.ForeignKey(
                        name: "FK_AzObjectFields_AzFields_FieldId",
                        column: x => x.FieldId,
                        principalSchema: "tmp",
                        principalTable: "AzFields",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AzObjectFields_AzObjects_ObjectId",
                        column: x => x.ObjectId,
                        principalSchema: "tmp",
                        principalTable: "AzObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Menus",
                schema: "tmp",
                columns: table => new
                {
                    ProjectId = table.Column<string>(type: "nvarchar(30)", nullable: false),
                    Id = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    ParentId = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    Title = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Url = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    ApplicationId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    OpenInNewTab = table.Column<bool>(type: "bit", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Menus", x => new { x.ProjectId, x.Id });
                    table.ForeignKey(
                        name: "FK_Menus_Application_ApplicationId",
                        column: x => x.ApplicationId,
                        principalTable: "Application",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Menus_MenuFolders_ProjectId_ParentId",
                        columns: x => new { x.ProjectId, x.ParentId },
                        principalSchema: "tmp",
                        principalTable: "MenuFolders",
                        principalColumns: new[] { "ProjectId", "Id" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Menus_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalSchema: "tmp",
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AzValues",
                schema: "tmp",
                columns: table => new
                {
                    Serial = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AuthorizationId = table.Column<int>(type: "int", nullable: false),
                    ObjectId = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    FieldId = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AzValues", x => x.Serial);
                    table.ForeignKey(
                        name: "FK_AzValues_Authorizations_AuthorizationId",
                        column: x => x.AuthorizationId,
                        principalSchema: "tmp",
                        principalTable: "Authorizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AzValues_AzObjectFields_ObjectId_FieldId",
                        columns: x => new { x.ObjectId, x.FieldId },
                        principalSchema: "tmp",
                        principalTable: "AzObjectFields",
                        principalColumns: new[] { "ObjectId", "FieldId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                schema: "tmp",
                table: "Projects",
                columns: new[] { "Id", "Title" },
                values: new object[] { "project1", "Project 1" });

            migrationBuilder.InsertData(
                schema: "tmp",
                table: "Users",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "CreatedAt", "Email", "EmailConfirmed", "FirstName", "IsDeleted", "IsDisabled", "LastAccessFailedDate", "LastName", "LockoutEnabled", "LockoutEndDate", "NationalCode", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "UserName", "WindowsAuthenticate" },
                values: new object[] { 1, 0, "4745abd2-e819-448a-999d-76c47b0043e8", new DateTime(2021, 11, 22, 12, 22, 27, 517, DateTimeKind.Local).AddTicks(4915), null, false, "", false, false, null, "Administrator", false, null, null, "PABPyu6/prVEQ4QbBrmcATJsjw/1yoli07rNI6EJ764=", null, false, "f1d4dd24-f7e3-4e57-b001-72ff63556393", "admin", false });

            migrationBuilder.InsertData(
                schema: "tmp",
                table: "MenuFolders",
                columns: new[] { "Id", "ProjectId", "ParentId", "SortOrder", "Title" },
                values: new object[] { "config", "project1", null, 0, "Project Configuration" });

            migrationBuilder.InsertData(
                schema: "tmp",
                table: "MenuFolders",
                columns: new[] { "Id", "ProjectId", "ParentId", "SortOrder", "Title" },
                values: new object[] { "admin", "project1", null, 0, "Project Administartion" });

            migrationBuilder.InsertData(
                schema: "tmp",
                table: "Menus",
                columns: new[] { "Id", "ProjectId", "ApplicationId", "OpenInNewTab", "ParentId", "SortOrder", "Title", "Url" },
                values: new object[,]
                {
                    { "config-grid-builder", "project1", null, false, "config", 0, "Grid builder", "/admin/grid-builder" },
                    { "config-grids", "project1", null, false, "config", 0, "Maintain base tables", "/admin/grids" },
                    { "config-grid", "project1", null, false, "config", 0, "Maintain table", "/admin/grid" },
                    { "config-menu", "project1", null, false, "config", 0, "Maintain project menu", "/admin/menu" },
                    { "users", "project1", null, false, "admin", 0, "Manage Users", "/admin/users" },
                    { "roles", "project1", null, false, "admin", 0, "Manage Roles", "/admin/roles" },
                    { "composite-roles", "project1", null, false, "admin", 0, "Manage Composite Role", "/admin/composite-roles" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Authorizations_ProjectId_RoleId",
                schema: "tmp",
                table: "Authorizations",
                columns: new[] { "ProjectId", "RoleId" });

            migrationBuilder.CreateIndex(
                name: "IX_AzFields_ProjectId",
                schema: "tmp",
                table: "AzFields",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_AzObjectFields_FieldId",
                schema: "tmp",
                table: "AzObjectFields",
                column: "FieldId");

            migrationBuilder.CreateIndex(
                name: "IX_AzObjects_ProjectId",
                schema: "tmp",
                table: "AzObjects",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_AzValues_AuthorizationId",
                schema: "tmp",
                table: "AzValues",
                column: "AuthorizationId");

            migrationBuilder.CreateIndex(
                name: "IX_AzValues_ObjectId_FieldId",
                schema: "tmp",
                table: "AzValues",
                columns: new[] { "ObjectId", "FieldId" });

            migrationBuilder.CreateIndex(
                name: "IX_MenuFolders_ProjectId_ParentId",
                schema: "tmp",
                table: "MenuFolders",
                columns: new[] { "ProjectId", "ParentId" });

            migrationBuilder.CreateIndex(
                name: "IX_Menus_ApplicationId",
                schema: "tmp",
                table: "Menus",
                column: "ApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_Menus_ProjectId_ParentId",
                schema: "tmp",
                table: "Menus",
                columns: new[] { "ProjectId", "ParentId" });

            migrationBuilder.CreateIndex(
                name: "IX_RoleCompositeRoles_ProjectId_CompositeRoleId",
                schema: "tmp",
                table: "RoleCompositeRoles",
                columns: new[] { "ProjectId", "CompositeRoleId" });

            migrationBuilder.CreateIndex(
                name: "IX_Roles_ApplicationId",
                schema: "tmp",
                table: "Roles",
                column: "ApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCompositeRoles_ProjectId_CompositeRoleId",
                schema: "tmp",
                table: "UserCompositeRoles",
                columns: new[] { "ProjectId", "CompositeRoleId" });

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_ProjectId_RoleId",
                schema: "tmp",
                table: "UserRoles",
                columns: new[] { "ProjectId", "RoleId" });

            migrationBuilder.CreateIndex(
                name: "IX_UserSessions_UserAgentId",
                schema: "tmp",
                table: "UserSessions",
                column: "UserAgentId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSessions_UserId",
                schema: "tmp",
                table: "UserSessions",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AzValues",
                schema: "tmp");

            migrationBuilder.DropTable(
                name: "Logs",
                schema: "tmp");

            migrationBuilder.DropTable(
                name: "Menus",
                schema: "tmp");

            migrationBuilder.DropTable(
                name: "RoleCompositeRoles",
                schema: "tmp");

            migrationBuilder.DropTable(
                name: "UserCompositeRoles",
                schema: "tmp");

            migrationBuilder.DropTable(
                name: "UserRoles",
                schema: "tmp");

            migrationBuilder.DropTable(
                name: "UserSessions",
                schema: "tmp");

            migrationBuilder.DropTable(
                name: "Authorizations",
                schema: "tmp");

            migrationBuilder.DropTable(
                name: "AzObjectFields",
                schema: "tmp");

            migrationBuilder.DropTable(
                name: "MenuFolders",
                schema: "tmp");

            migrationBuilder.DropTable(
                name: "CompositeRoles",
                schema: "tmp");

            migrationBuilder.DropTable(
                name: "UserAgents",
                schema: "tmp");

            migrationBuilder.DropTable(
                name: "Users",
                schema: "tmp");

            migrationBuilder.DropTable(
                name: "Roles",
                schema: "tmp");

            migrationBuilder.DropTable(
                name: "AzFields",
                schema: "tmp");

            migrationBuilder.DropTable(
                name: "AzObjects",
                schema: "tmp");

            migrationBuilder.DropTable(
                name: "Application");

            migrationBuilder.DropTable(
                name: "Projects",
                schema: "tmp");
        }
    }
}
