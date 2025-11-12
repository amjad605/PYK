export default function formatPrice(price: number, listingType: string) {
  if (listingType === "rent") {
    return `EGP ${price.toLocaleString()}/month`;
  }
  if (price >= 1000000) {
    return `EGP ${(price / 1000000).toFixed(1)}M`;
  }
  return `EGP ${price.toLocaleString()}`;
}
