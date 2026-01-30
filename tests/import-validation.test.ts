import { describe, expect, it } from 'vitest';
import { mapImportRow } from '../src/shared/import/validation';

describe('mapImportRow', () => {
  it('maps row data with column mapping and validates', () => {
    const row = { Kod: 'CR-001', Ad: 'Demo', Email: 'demo@example.com' };
    const mapping = { Kod: 'code', Ad: 'name', Email: 'email' } as const;

    const result = mapImportRow(row, mapping);
    if (!result.success) {
      throw new Error('Validation failed');
    }

    expect(result.data.code).toBe('CR-001');
    expect(result.data.name).toBe('Demo');
    expect(result.data.email).toBe('demo@example.com');
  });

  it('returns errors when invalid', () => {
    const row = { Kod: '', Ad: '', Email: 'invalid' };
    const mapping = { Kod: 'code', Ad: 'name', Email: 'email' } as const;

    const result = mapImportRow(row, mapping);
    expect(result.success).toBe(false);
  });
});
