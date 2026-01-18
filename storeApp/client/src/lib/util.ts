import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import type { PaymentSummary, ShippingAddress } from "../app/Models/order";

export function currencyFormat(amount: number) {
  return "$" + (amount / 100).toFixed(2);
}

export function filterEmptyValues(values: object) {
  return Object.fromEntries(
    Object.entries(values).filter(
      ([, value]) =>
        value !== "" &&
        value !== null &&
        value !== undefined &&
        value.length !== 0,
    ),
  );
}
export function getAddressString(address: ShippingAddress) {
  return `${address.name} ${address.line1}, ${address.city}, ${address.state}, ${address.postal_code}, ${address.country}`;
}
export function getPaymentString(paymentSummary: PaymentSummary) {
  if (!paymentSummary) return "Pending";
  // demo-safe display
  return `Razorpay - ID ${paymentSummary.rzpPaymentId}`;
}

export function handleApiError<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
  fieldNames: Path<T>[], // array of strings represinting schemes present in that createProductSchema
) {
  const apiError = (error as { message: string }) || {};
  // take message from string or we don't know what format it came

  if (apiError.message && typeof apiError.message === "string") {
    const errorArray = apiError.message.split(","); // we get as CSV list

    errorArray.forEach((e) => {
      const matchedField = fieldNames.find((fieldName) =>
        e.toLowerCase().includes(fieldName.toString().toLowerCase()),
      );

      if (matchedField) setError(matchedField, { message: e.trim() });
    });
  }
}
