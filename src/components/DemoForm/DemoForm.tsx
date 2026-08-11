import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getOrCreateLeadId } from '../../lib/leadId'
import type { Step1Values, Step2Values } from '../../lib/schemas'
import StepIndicator from './StepIndicator'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

const stepVariants = {
  enter: { opacity: 0, x: 32 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -32 },
}

export default function DemoForm() {
  const leadId = useMemo(() => getOrCreateLeadId(), [])
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [step1Values, setStep1Values] = useState<Step1Values | null>(null)
  const [step2Values, setStep2Values] = useState<Step2Values | null>(null)

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-sm sm:p-8">
      {step < 3 && (
        <h2 className="mb-1 text-lg font-bold text-white">Request a demo with one of the founders</h2>
      )}

      <StepIndicator step={step} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          {step === 1 && (
            <Step1
              leadId={leadId}
              defaultValues={step1Values ?? undefined}
              onSuccess={(values) => {
                setStep1Values(values)
                setStep(2)
              }}
            />
          )}

          {step === 2 && step1Values && (
            <Step2
              leadId={leadId}
              step1Values={step1Values}
              defaultValues={step2Values ?? undefined}
              onSuccess={(values) => {
                setStep2Values(values)
                setStep(3)
              }}
            />
          )}

          {step === 3 && step1Values && <Step3 step1Values={step1Values} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
