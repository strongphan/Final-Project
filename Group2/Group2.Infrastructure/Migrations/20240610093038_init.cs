using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Group2.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "CreatedBy", "Email", "IsDeleted", "ModifiedAt", "ModifiedBy", "Name", "Password", "Role" },
                values: new object[,]
                {
                    { new Guid("466db3c8-8f3f-4923-8346-733b8990690f"), new DateTime(2024, 6, 10, 16, 30, 37, 692, DateTimeKind.Local).AddTicks(8560), null, "user3@example.com", null, new DateTime(2024, 6, 10, 16, 30, 37, 692, DateTimeKind.Local).AddTicks(8561), null, "user3", "$2a$12$0NPISodxxD/AH/OGrKghM.xTFgZHmg1MZlDC.FJo6SS7gYSdhdo9i", 0 },
                    { new Guid("8163ba0d-8552-4503-b3fd-ac8fda07c1bb"), new DateTime(2024, 6, 10, 16, 30, 37, 692, DateTimeKind.Local).AddTicks(8562), null, "user4@example.com", null, new DateTime(2024, 6, 10, 16, 30, 37, 692, DateTimeKind.Local).AddTicks(8563), null, "user4", "$2a$12$0NPISodxxD/AH/OGrKghM.xTFgZHmg1MZlDC.FJo6SS7gYSdhdo9i", 0 },
                    { new Guid("d999eefb-7869-4ced-b21d-be5f5c3597cb"), new DateTime(2024, 6, 10, 16, 30, 37, 692, DateTimeKind.Local).AddTicks(8530), null, "user1@example.com", null, new DateTime(2024, 6, 10, 16, 30, 37, 692, DateTimeKind.Local).AddTicks(8548), null, "user1", "$2a$12$0NPISodxxD/AH/OGrKghM.xTFgZHmg1MZlDC.FJo6SS7gYSdhdo9i", 0 },
                    { new Guid("de969699-763b-407d-a86b-a615a427fbe9"), new DateTime(2024, 6, 10, 16, 30, 37, 692, DateTimeKind.Local).AddTicks(8558), null, "admin@example.com", null, new DateTime(2024, 6, 10, 16, 30, 37, 692, DateTimeKind.Local).AddTicks(8558), null, "admin", "$2a$12$0NPISodxxD/AH/OGrKghM.xTFgZHmg1MZlDC.FJo6SS7gYSdhdo9i", 1 },
                    { new Guid("f27fc38a-046b-44fd-8091-ad98939c6310"), new DateTime(2024, 6, 10, 16, 30, 37, 692, DateTimeKind.Local).AddTicks(8555), null, "user2@example.com", null, new DateTime(2024, 6, 10, 16, 30, 37, 692, DateTimeKind.Local).AddTicks(8555), null, "user2", "$2a$12$0NPISodxxD/AH/OGrKghM.xTFgZHmg1MZlDC.FJo6SS7gYSdhdo9i", 0 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
