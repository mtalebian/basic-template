using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Accounts.Migrations.Migrations
{
    public partial class V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "WindowsAuthenticate",
                schema: "tmp",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                schema: "tmp",
                table: "Users",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "0bee1803-4352-44ab-8dbb-7d674fa39af8", new DateTime(2021, 10, 6, 14, 51, 44, 771, DateTimeKind.Local).AddTicks(7325), "92f8407f-f2c7-496b-978a-f4a31f9fcfc9" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WindowsAuthenticate",
                schema: "tmp",
                table: "Users");

            migrationBuilder.UpdateData(
                schema: "tmp",
                table: "Users",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "a3a9c726-0987-4964-8469-c5e95d28d87a", new DateTime(2021, 10, 6, 12, 22, 34, 995, DateTimeKind.Local).AddTicks(1112), "7cf421dd-aef8-4408-8f52-55ff59981e0f" });
        }
    }
}
