import { z } from 'zod'

export const ROLE_OPTIONS = [
  'CEO / Founder / Owner',
  'Sales / Finances / Administration',
  'Technician / Employee',
  'Other',
] as const

export const POOLS_SOLD_PER_YEAR_OPTIONS = ['1-5', '6-15', '16-30', '31-60', '61-120', '121-240', '240+'] as const

export const GOAL_OPTIONS = [
  'More leads or project deals',
  'Increase in revenue',
  'Shorter lifecycles',
  'Add innovation to my proposals',
  'Not sure / nothing',
] as const

// No more "Both" option — it's a multi-select now, so picking both options directly covers that case.
export const POOL_TYPE_OPTIONS = ['Traditional (custom-built)', 'Monoblock (one-piece)'] as const

export const step1Schema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().min(1, 'Business email is required').email('Enter a valid email address'),
  phone: z.string().trim().min(1, 'Phone number is required'),
  company: z.string().trim().optional(),
})

export type Step1Values = z.infer<typeof step1Schema>

export const step2Schema = z.object({
  companyWebsite: z.string().trim().optional(),
  role: z.enum(ROLE_OPTIONS, { message: 'Select your role' }),
  poolsSoldPerYear: z.enum(POOLS_SOLD_PER_YEAR_OPTIONS, { message: 'Select how many pools you sell per year' }),
  // Kept as a string field (validated as a whole number) rather than z.coerce.number()
  // so the form's input type and the parsed output type stay identical — simpler
  // typing with react-hook-form. Converted to a real number in submitLead.ts.
  salesTeamSize: z
    .string()
    .trim()
    .min(1, 'Enter a number')
    .refine((v) => /^\d+$/.test(v), 'Enter a whole number'),
  goals: z.array(z.enum(GOAL_OPTIONS)).min(1, 'Select at least one option'),
  // Multi-select, optional — an empty array means no preference.
  poolType: z.array(z.enum(POOL_TYPE_OPTIONS)),
  // Modeled as a yes/no enum (rather than boolean) so it binds to native radio
  // inputs cleanly; converted to a real boolean when building the webhook payload.
  doesRenovations: z.enum(['yes', 'no'], { message: 'Select yes or no' }),
  hearAboutUs: z.string().trim().min(1, 'This field is required'),
  // No .default() here — the input/output types must match for the resolver's
  // typing to line up with react-hook-form; the actual default lives in
  // useForm's defaultValues in Step2.tsx instead.
  wantsUpdates: z.boolean(),
})

export type Step2Values = z.infer<typeof step2Schema>
