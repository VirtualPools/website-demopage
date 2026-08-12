import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step1Schema, type Step1Values } from '../../lib/schemas'
import { submitStep1 } from '../../lib/submitLead'
import { FieldError, FieldLabel, SubmitButton, SubmitError, inputClass } from './FormAtoms'
import { PhoneField } from './PhoneField'

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
    control,
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
        <FieldLabel htmlFor="name" required>
          Name
        </FieldLabel>
        <input id="name" type="text" autoComplete="name" className={inputClass} {...register('name')} />
        <FieldError message={errors.name?.message} />
      </div>

      <div>
        <FieldLabel htmlFor="email" required>
          Business Email
        </FieldLabel>
        <input id="email" type="email" autoComplete="email" className={inputClass} {...register('email')} />
        <FieldError message={errors.email?.message} />
      </div>

      <div>
        <FieldLabel htmlFor="phone" required>
          Phone number
        </FieldLabel>
        <Controller
          control={control}
          name="phone"
          render={({ field }) => <PhoneField id="phone" value={field.value} onChange={field.onChange} />}
        />
        <FieldError message={errors.phone?.message} />
      </div>

      <div>
        <FieldLabel htmlFor="company">Company Name</FieldLabel>
        <input id="company" type="text" autoComplete="organization" className={inputClass} {...register('company')} />
        <FieldError message={errors.company?.message} />
      </div>

      <SubmitError message={submitError} />

      <SubmitButton pending={isSubmitting} label="Next" />

      <p className="text-center text-xs text-brand-slate">
        For information about how VirtualPools handles your personal data, please see our{' '}
        <a href="#" className="text-blue-700 underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  )
}
