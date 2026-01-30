import { z } from 'zod';

export const partyImportSchema = z.object({
  code: z.string().min(1, 'Kod zorunludur'),
  name: z.string().min(1, 'Ad zorunludur'),
  phone: z.string().optional(),
  email: z.string().email('E-posta formatı geçersiz').optional(),
  status: z.enum(['active', 'closed']).default('active')
});

export type PartyImportRow = z.infer<typeof partyImportSchema>;

export const mapImportRow = (row: Record<string, string>, mapping: Record<string, keyof PartyImportRow>) => {
  const mapped: Record<string, string> = {};
  Object.entries(mapping).forEach(([column, field]) => {
    mapped[field] = row[column] ?? '';
  });

  const parsed = partyImportSchema.safeParse(mapped);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.issues.map((issue) => issue.message)
    };
  }

  return {
    success: true,
    data: parsed.data
  };
};
