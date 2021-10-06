using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Accounts.Migrations.Migrations
{
    public partial class V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NationalCode",
                schema: "tmp",
                table: "Users",
                type: "nvarchar(15)",
                maxLength: 15,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                schema: "tmp",
                table: "Users",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "NationalCode", "SecurityStamp" },
                values: new object[] { "a3a9c726-0987-4964-8469-c5e95d28d87a", new DateTime(2021, 10, 6, 12, 22, 34, 995, DateTimeKind.Local).AddTicks(1112), "0123456789", "7cf421dd-aef8-4408-8f52-55ff59981e0f" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NationalCode",
                schema: "tmp",
                table: "Users");

            migrationBuilder.UpdateData(
                schema: "tmp",
                table: "Users",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "5c96b6c3-283c-4b8b-9bb2-c7adf25dac47", new DateTime(2021, 8, 26, 1, 6, 19, 266, DateTimeKind.Local).AddTicks(2795), "2f4ff4da-073e-4154-94b9-80c565ff02c4" });
        }
    }
}
