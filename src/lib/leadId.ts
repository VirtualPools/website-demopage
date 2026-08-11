const STORAGE_KEY = 'vp_demo_lead_id'

/**
 * One lead ID per form session, generated on first mount and cached in
 * sessionStorage so a refresh mid-flow doesn't spawn a second lead record.
 */
export function getOrCreateLeadId(): string {
  const existing = sessionStorage.getItem(STORAGE_KEY)
  if (existing) return existing

  const id = crypto.randomUUID()
  sessionStorage.setItem(STORAGE_KEY, id)
  return id
}
