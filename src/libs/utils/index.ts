export const moneyFormatter = (currencyCode: string, amount: number) => {
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);

  return price;
};
