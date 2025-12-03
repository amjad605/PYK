import type { Price } from "@/types/property";

export default function calculateInstallment(price: Price): number | null {
  if (!price.amount || !price.paymentPlan || !price.paymentPlan.installments)
    return null;

  const remainingAmount: number =
    price.amount - (price.paymentPlan.downPayment ?? 0);
  const { year, frequency } = price.paymentPlan.installments;

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
  }

  return remainingAmount / totalInstallments;
}
