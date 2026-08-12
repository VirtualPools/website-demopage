import type { Step1Values, Step2Values } from './schemas'

export interface Step1Payload {
  leadId: string
  step: 1
  name: string
  email: string
  phone: string
  company?: string
}

export interface Step2Payload extends Omit<Step1Payload, 'step'> {
  step: 2
  companyWebsite?: string
  role: string
  poolsSoldPerYear: string
  salesTeamSize: number
  goals: string[]
  poolType?: string
  doesRenovations: boolean
  hearAboutUs: string
  wantsUpdates: boolean
}

// Same endpoint for both steps, differentiated by `step`. If it's cleaner on the
// n8n side, split this into two env vars (e.g. VITE_N8N_WEBHOOK_URL_STEP1 /
// _STEP2) and point each submit call at its own URL instead.
const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined
const WEBHOOK_AUTH = import.meta.env.VITE_N8N_WEBHOOK_AUTH as string | undefined

export class LeadSubmitError extends Error {}

async function postToWebhook(payload: Step1Payload | Step2Payload): Promise<void> {
  if (!WEBHOOK_URL) {
    // No webhook configured yet (local dev without .env) — log instead of failing the flow.
    console.warn('VITE_N8N_WEBHOOK_URL is not set; skipping lead POST', payload)
    return
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (WEBHOOK_AUTH) headers.Authorization = `Bearer ${WEBHOOK_AUTH}`

  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new LeadSubmitError(`Webhook responded with ${response.status}`)
  }
}

export function submitStep1(leadId: string, values: Step1Values): Promise<void> {
  return postToWebhook({
    leadId,
    step: 1,
    name: values.name,
    email: values.email,
    phone: values.phone,
    company: values.company,
  })
}

// Re-sends step 1's fields alongside step 2's, per the current payload spec
// (simpler for the frontend; n8n matches/updates by leadId rather than merging).
// Swap to a partial payload if the n8n workflow would rather look up step 1 itself.
export function submitStep2(leadId: string, step1Values: Step1Values, step2Values: Step2Values): Promise<void> {
  return postToWebhook({
    leadId,
    step: 2,
    name: step1Values.name,
    email: step1Values.email,
    phone: step1Values.phone,
    company: step1Values.company,
    companyWebsite: step2Values.companyWebsite,
    role: step2Values.role,
    poolsSoldPerYear: step2Values.poolsSoldPerYear,
    salesTeamSize: Number(step2Values.salesTeamSize),
    goals: step2Values.goals,
    poolType: step2Values.poolType === '' ? undefined : step2Values.poolType,
    doesRenovations: step2Values.doesRenovations === 'yes',
    hearAboutUs: step2Values.hearAboutUs,
    wantsUpdates: step2Values.wantsUpdates,
  })
}
