import { z } from 'zod'

export const pollOptionSchema = z.object({
  label: z
    .string()
    .min(1, { message: 'Option label is required' })
    .max(200, { message: 'Option label must be at most 200 characters' }),
})

export const createPollSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters' })
    .max(200, { message: 'Title must be at most 200 characters' }),
  description: z
    .string()
    .max(1000, { message: 'Description must be at most 1000 characters' })
    .optional()
    .or(z.literal('').transform(() => undefined)),
  isMultiple: z.boolean().default(false),
  expiresAt: z
    .string()
    .datetime({ message: 'Expires at must be a valid ISO date-time' })
    .optional(),
  options: z
    .array(pollOptionSchema)
    .min(2, { message: 'At least 2 options are required' })
    .max(10, { message: 'At most 10 options are allowed' }),
})

export type CreatePollInput = z.infer<typeof createPollSchema>


