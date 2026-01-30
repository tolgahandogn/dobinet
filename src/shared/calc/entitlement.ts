export type EntitlementLine = {
  qty: number;
  unitPrice: number;
};

export type EntitlementDeduction = {
  amount: number;
};

export const calculateEntitlementTotals = (lines: EntitlementLine[], deductions: EntitlementDeduction[]) => {
  const gross = lines.reduce((total, line) => total + line.qty * line.unitPrice, 0);
  const deductionTotal = deductions.reduce((total, deduction) => total + deduction.amount, 0);
  const net = gross - deductionTotal;
  return {
    gross,
    deductionTotal,
    net
  };
};

export const calculateRemaining = (net: number, paidTotal: number) => {
  return Math.max(net - paidTotal, 0);
};
