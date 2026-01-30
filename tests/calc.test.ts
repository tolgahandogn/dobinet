import { describe, expect, it } from 'vitest';
import { calculateEntitlementTotals, calculateRemaining } from '../src/shared/calc/entitlement';

describe('calculateEntitlementTotals', () => {
  it('calculates gross, deductions, net', () => {
    const result = calculateEntitlementTotals(
      [
        { qty: 10, unitPrice: 1500 },
        { qty: 5, unitPrice: 2000 }
      ],
      [{ amount: 2500 }, { amount: 1500 }]
    );

    expect(result.gross).toBe(10 * 1500 + 5 * 2000);
    expect(result.deductionTotal).toBe(4000);
    expect(result.net).toBe(result.gross - 4000);
  });
});

describe('calculateRemaining', () => {
  it('never returns negative remaining', () => {
    expect(calculateRemaining(10000, 12000)).toBe(0);
  });
});
