export const moneyFormatter = (currencyCode: string | undefined = "INR", amount: number) => {
  const price = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);

  return price;
};
