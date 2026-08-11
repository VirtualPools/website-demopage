import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step1Schema, type Step1Values } from '../../lib/schemas'
import { submitStep1 } from '../../lib/submitLead'
import { FieldError, FieldLabel, inputClass } from './FormAtoms'

interface Step1Props {
  leadId: string
  defaultValues?: Partial<Step1Values>
  onSuccess: (values: Step1Values) => void
}

export default function Step1({ leadId, defaultValues, onSuccess }: Step1Props) {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues,
  })

  const onSubmit = async (values: Step1Values) => {
    setSubmitError(null)
    try {
      await submitStep1(leadId, values)
      onSuccess(values)
    } catch {
      // Keep the user on step 1 with their input intact — this is lead data, don't lose it.
      setSubmitError("We couldn't save your details. Please check your connection and try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <input id="name" type="text" autoComplete="name" className={inputClass} {...register('name')} />
        <FieldError message={errors.name?.message} />
      </div>

      <div>
        <FieldLabel htmlFor="email">Business Email</FieldLabel>
        <input id="email" type="email" autoComplete="email" className={inputClass} {...register('email')} />
        <FieldError message={errors.email?.message} />
      </div>

      <div>
        <FieldLabel htmlFor="phone">Phone number</FieldLabel>
        <input id="phone" type="tel" autoComplete="tel" className={inputClass} {...register('phone')} />
        <FieldError message={errors.phone?.message} />
      </div>

      <div>
        <FieldLabel htmlFor="company">Company Name</FieldLabel>
        <input id="company" type="text" autoComplete="organization" className={inputClass} {...register('company')} />
        <FieldError message={errors.company?.message} />
      </div>

      {submitError && (
        <div role="alert" className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-brand-blue px-6 py-3 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Please wait…' : 'Next'}
      </button>

      <p className="text-center text-xs text-white/50">
        For information about how VirtualPools handles your personal data, please see our Privacy Policy.
      </p>
    </form>
  )
}
