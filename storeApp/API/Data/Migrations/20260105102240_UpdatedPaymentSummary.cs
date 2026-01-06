using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedPaymentSummary : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentSummary_Brand",
                table: "Orders2");

            migrationBuilder.DropColumn(
                name: "PaymentSummary_ExpMonth",
                table: "Orders2");

            migrationBuilder.DropColumn(
                name: "PaymentSummary_ExpYear",
                table: "Orders2");

            migrationBuilder.DropColumn(
                name: "PaymentSummary_Last4",
                table: "Orders2");

            migrationBuilder.AddColumn<string>(
                name: "PaymentSummary_RzpOrderId",
                table: "Orders2",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PaymentSummary_RzpPaymentId",
                table: "Orders2",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PaymentSummary_RzpSignature",
                table: "Orders2",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentSummary_RzpOrderId",
                table: "Orders2");

            migrationBuilder.DropColumn(
                name: "PaymentSummary_RzpPaymentId",
                table: "Orders2");

            migrationBuilder.DropColumn(
                name: "PaymentSummary_RzpSignature",
                table: "Orders2");

            migrationBuilder.AddColumn<string>(
                name: "PaymentSummary_Brand",
                table: "Orders2",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PaymentSummary_ExpMonth",
                table: "Orders2",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PaymentSummary_ExpYear",
                table: "Orders2",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PaymentSummary_Last4",
                table: "Orders2",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
