import type { Step1Values } from '../../lib/schemas'

export default function Step3({ step1Values }: { step1Values: Step1Values }) {
  // TODO: Lemcal embed. Drop the real snippet in below.
  // Nice-to-have if Lemcal supports it — prefill name/email via query params:
  // const prefillUrl = `${LEMCAL_URL}?name=${encodeURIComponent(step1Values.name)}&email=${encodeURIComponent(step1Values.email)}`
  void step1Values

  return (
    <div className="space-y-5 text-center">
      <h3 className="text-2xl font-bold text-brand-ink">You're all set — pick a time</h3>
      <p className="text-brand-slate">
        Thanks, {step1Values.name.split(' ')[0]}! Choose a slot below and one of our founders will meet you there.
      </p>

      {/* TODO: Lemcal embed */}
      <div className="flex min-h-[420px] items-center justify-center rounded-[10px] border border-dashed border-[#d9d8d8] bg-slate-50 text-sm text-brand-slate">
        Lemcal booking widget placeholder
      </div>
    </div>
  )
}
