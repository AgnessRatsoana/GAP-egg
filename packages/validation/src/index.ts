import { z } from 'zod';

export const apiVersionSchema = z.literal('v1');

export const applicationCreateSchema = z.object({
  preferredStartDate: z.string().date().optional(),
  notes: z.string().trim().max(2_000).optional(),
});

export type ApplicationCreateInput = z.infer<typeof applicationCreateSchema>;
