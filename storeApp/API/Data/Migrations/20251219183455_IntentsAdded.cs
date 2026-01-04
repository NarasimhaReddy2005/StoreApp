using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class IntentsAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Addresses_AddressId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderItem_Orders2_OrderId",
                table: "OrderItem");

            migrationBuilder.DropTable(
                name: "Orders2");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Addresses",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "BasketId",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "BasketId",
                table: "Orders");

            migrationBuilder.RenameTable(
                name: "Addresses",
                newName: "Address");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Orders",
                newName: "ShippingAddress_State");

            migrationBuilder.RenameColumn(
                name: "ShippingAddressId",
                table: "Orders",
                newName: "Subtotal");

            migrationBuilder.RenameColumn(
                name: "PaymentId",
                table: "Orders",
                newName: "ShippingAddress_Line2");

            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "Orders",
                newName: "PaymentSummary_Brand");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Orders",
                newName: "ShippingAddress_PostalCode");

            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "Orders",
                newName: "PaymentSummary_Last4");

            migrationBuilder.AlterColumn<string>(
                name: "PaymentId",
                table: "Payments",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BuyerEmail",
                table: "Orders",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<long>(
                name: "DeliveryFee",
                table: "Orders",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "Discount",
                table: "Orders",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<DateTime>(
                name: "OrderDate",
                table: "Orders",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "OrderStatus",
                table: "Orders",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PaymentSummary_ExpMonth",
                table: "Orders",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PaymentSummary_ExpYear",
                table: "Orders",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress_City",
                table: "Orders",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress_Country",
                table: "Orders",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress_Line1",
                table: "Orders",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress_Name",
                table: "Orders",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Address",
                table: "Address",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "OrderIntents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    OrderId = table.Column<string>(type: "TEXT", nullable: true),
                    PaymentId = table.Column<string>(type: "TEXT", nullable: true),
                    Amount = table.Column<long>(type: "INTEGER", nullable: false),
                    Status = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ShippingAddress_Name = table.Column<string>(type: "TEXT", nullable: false),
                    ShippingAddress_Line1 = table.Column<string>(type: "TEXT", nullable: false),
                    ShippingAddress_Line2 = table.Column<string>(type: "TEXT", nullable: true),
                    ShippingAddress_City = table.Column<string>(type: "TEXT", nullable: false),
                    ShippingAddress_State = table.Column<string>(type: "TEXT", nullable: false),
                    ShippingAddress_PostalCode = table.Column<string>(type: "TEXT", nullable: false),
                    ShippingAddress_Country = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderIntents", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Address_AddressId",
                table: "AspNetUsers",
                column: "AddressId",
                principalTable: "Address",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItem_Orders_OrderId",
                table: "OrderItem",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Address_AddressId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderItem_Orders_OrderId",
                table: "OrderItem");

            migrationBuilder.DropTable(
                name: "OrderIntents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Address",
                table: "Address");

            migrationBuilder.DropColumn(
                name: "BuyerEmail",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "DeliveryFee",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Discount",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "OrderDate",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "OrderStatus",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "PaymentSummary_ExpMonth",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "PaymentSummary_ExpYear",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ShippingAddress_City",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ShippingAddress_Country",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ShippingAddress_Line1",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ShippingAddress_Name",
                table: "Orders");

            migrationBuilder.RenameTable(
                name: "Address",
                newName: "Addresses");

            migrationBuilder.RenameColumn(
                name: "Subtotal",
                table: "Orders",
                newName: "ShippingAddressId");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_State",
                table: "Orders",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_PostalCode",
                table: "Orders",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_Line2",
                table: "Orders",
                newName: "PaymentId");

            migrationBuilder.RenameColumn(
                name: "PaymentSummary_Last4",
                table: "Orders",
                newName: "Amount");

            migrationBuilder.RenameColumn(
                name: "PaymentSummary_Brand",
                table: "Orders",
                newName: "OrderId");

            migrationBuilder.AlterColumn<string>(
                name: "PaymentId",
                table: "Payments",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<string>(
                name: "BasketId",
                table: "Payments",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BasketId",
                table: "Orders",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Addresses",
                table: "Addresses",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Orders2",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    BuyerEmail = table.Column<string>(type: "TEXT", nullable: false),
                    DeliveryFee = table.Column<long>(type: "INTEGER", nullable: false),
                    Discount = table.Column<long>(type: "INTEGER", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    OrderStatus = table.Column<int>(type: "INTEGER", nullable: false),
                    Subtotal = table.Column<long>(type: "INTEGER", nullable: false),
                    PaymentSummary_Brand = table.Column<string>(type: "TEXT", nullable: true),
                    PaymentSummary_ExpMonth = table.Column<int>(type: "INTEGER", nullable: false),
                    PaymentSummary_ExpYear = table.Column<int>(type: "INTEGER", nullable: false),
                    PaymentSummary_Last4 = table.Column<int>(type: "INTEGER", nullable: false),
                    ShippingAddress_City = table.Column<string>(type: "TEXT", nullable: false),
                    ShippingAddress_Country = table.Column<string>(type: "TEXT", nullable: false),
                    ShippingAddress_Line1 = table.Column<string>(type: "TEXT", nullable: false),
                    ShippingAddress_Line2 = table.Column<string>(type: "TEXT", nullable: true),
                    ShippingAddress_Name = table.Column<string>(type: "TEXT", nullable: false),
                    ShippingAddress_PostalCode = table.Column<string>(type: "TEXT", nullable: false),
                    ShippingAddress_State = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders2", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Addresses_AddressId",
                table: "AspNetUsers",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItem_Orders2_OrderId",
                table: "OrderItem",
                column: "OrderId",
                principalTable: "Orders2",
                principalColumn: "Id");
        }
    }
}
