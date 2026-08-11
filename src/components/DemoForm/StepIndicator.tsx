export default function StepIndicator({ step, totalSteps = 3 }: { step: number; totalSteps?: number }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="text-xs font-semibold tracking-wide text-brand-cyan uppercase">
        Step {step} of {totalSteps}
      </span>
      <div className="flex flex-1 gap-1.5">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i < step ? 'bg-brand-cyan' : 'bg-white/15'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
