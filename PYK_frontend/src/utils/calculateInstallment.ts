import type { Price } from "@/types/property";

export default function calculateInstallment(price: Price): number | null {
  if (
    !price?.amount ||
    !price?.paymentPlan ||
    !price?.paymentPlan?.installments
  )
    return null;

  const amount = Number(price.amount);
  const downPayment = Number(price.paymentPlan.downPayment) || 0;
  const year = Number(price.paymentPlan.installments.years);

  // Validate numbers
  if (isNaN(amount) || isNaN(year) || year <= 0) {
    return null;
  }

  const remainingAmount: number = amount - downPayment;
  const { frequency } = price.paymentPlan.installments;
  let totalInstallments = 0;

  switch (frequency) {
    case "monthly":
      totalInstallments = year * 12;
      break;
    case "quarterly":
      totalInstallments = year * 4;
      break;
    case "yearly":
      totalInstallments = year;
      break;
    default:
      return null;
  }

  if (totalInstallments === 0) return null;

  const result = remainingAmount / totalInstallments;
  return isNaN(result) || !isFinite(result) ? null : result;
}
