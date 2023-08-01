export const moneyFormatter = (
  currencyCode: string | undefined = "INR",
  amount: number
) => {
  const price = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);

  return price;
};

export const statusMessage = (code: string) => {
  const translation: Record<string, string> = {
    UNFULFILLED: "Unfulfilled",
    PARTIALLY_FULFILLED: "Partially Fulfilled",
    FULFILLED: "Fulfilled",
    RESTOCKED: "Restocked",
    PENDING_FULFILLMENT: "Pending Fulfillment",
    OPEN: "Open",
    IN_PROGRESS: "In Progress",
    ON_HOLD: "On Hold",
    SCHEDULED: "Scheduled",
  };
  return translation[code]
};


