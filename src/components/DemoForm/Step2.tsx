import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  GOAL_OPTIONS,
  POOLS_SOLD_PER_YEAR_OPTIONS,
  POOL_TYPE_OPTIONS,
  ROLE_OPTIONS,
  step2Schema,
  type Step1Values,
  type Step2Values,
} from '../../lib/schemas'
import { submitStep2 } from '../../lib/submitLead'
import { FieldError, FieldLabel, PillOption, SubmitButton, SubmitError, inputClass } from './FormAtoms'

interface Step2Props {
  leadId: string
  step1Values: Step1Values
  defaultValues?: Partial<Step2Values>
  onSuccess: (values: Step2Values) => void
}

export default function Step2({ leadId, step1Values, defaultValues, onSuccess }: Step2Props) {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Step2Values>({
    resolver: zodResolver(step2Schema),
    defaultValues: { goals: [], wantsUpdates: false, ...defaultValues },
  })

  const selectedRole = watch('role')
  const selectedPoolsPerYear = watch('poolsSoldPerYear')
  const selectedGoals = watch('goals') ?? []
  const selectedPoolType = watch('poolType')
  const selectedRenovations = watch('doesRenovations')

  const onSubmit = async (values: Step2Values) => {
    setSubmitError(null)
    try {
      await submitStep2(leadId, step1Values, values)
      onSuccess(values)
    } catch {
      setSubmitError("We couldn't save your details. Please check your connection and try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <FieldLabel htmlFor="companyWebsite">Company website</FieldLabel>
        <input
          id="companyWebsite"
          type="text"
          placeholder="https://"
          className={inputClass}
          {...register('companyWebsite')}
        />
        <FieldError message={errors.companyWebsite?.message} />
      </div>

      <div>
        <FieldLabel required>Role</FieldLabel>
        <div className="grid grid-cols-2 gap-2">
          {ROLE_OPTIONS.map((opt) => (
            <PillOption key={opt} htmlFor={`role-${opt}`} checked={selectedRole === opt}>
              <input type="radio" id={`role-${opt}`} value={opt} className="sr-only" {...register('role')} />
              {opt}
            </PillOption>
          ))}
        </div>
        <FieldError message={errors.role?.message} />
      </div>

      <div>
        <FieldLabel required>How many pools do you sell per year?</FieldLabel>
        <div className="grid grid-cols-4 gap-2">
          {POOLS_SOLD_PER_YEAR_OPTIONS.map((opt) => (
            <PillOption key={opt} htmlFor={`pools-${opt}`} checked={selectedPoolsPerYear === opt}>
              <input
                type="radio"
                id={`pools-${opt}`}
                value={opt}
                className="sr-only"
                {...register('poolsSoldPerYear')}
              />
              {opt}
            </PillOption>
          ))}
        </div>
        <FieldError message={errors.poolsSoldPerYear?.message} />
      </div>

      <div>
        <FieldLabel htmlFor="salesTeamSize" required>
          How many people at your company are responsible for sales?
        </FieldLabel>
        <input
          id="salesTeamSize"
          type="number"
          min={0}
          inputMode="numeric"
          className={inputClass}
          {...register('salesTeamSize')}
        />
        <FieldError message={errors.salesTeamSize?.message} />
      </div>

      <div>
        <FieldLabel required>What would you like to achieve with our tool?</FieldLabel>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {GOAL_OPTIONS.map((opt) => (
            <PillOption key={opt} htmlFor={`goal-${opt}`} checked={selectedGoals.includes(opt)}>
              <input type="checkbox" id={`goal-${opt}`} value={opt} className="sr-only" {...register('goals')} />
              {opt}
            </PillOption>
          ))}
        </div>
        <FieldError message={errors.goals?.message} />
      </div>

      <div>
        <FieldLabel>Which type of pools do you sell?</FieldLabel>
        <div className="grid grid-cols-3 gap-2">
          {POOL_TYPE_OPTIONS.map((opt) => (
            <PillOption key={opt} htmlFor={`poolType-${opt}`} checked={selectedPoolType === opt}>
              <input type="radio" id={`poolType-${opt}`} value={opt} className="sr-only" {...register('poolType')} />
              {opt}
            </PillOption>
          ))}
        </div>
        <FieldError message={errors.poolType?.message} />
      </div>

      <div>
        <FieldLabel required>Do you do pool renovations?</FieldLabel>
        <div className="grid grid-cols-2 gap-2">
          <PillOption htmlFor="renovations-yes" checked={selectedRenovations === 'yes'}>
            <input
              type="radio"
              id="renovations-yes"
              value="yes"
              className="sr-only"
              {...register('doesRenovations')}
            />
            Yes
          </PillOption>
          <PillOption htmlFor="renovations-no" checked={selectedRenovations === 'no'}>
            <input type="radio" id="renovations-no" value="no" className="sr-only" {...register('doesRenovations')} />
            No
          </PillOption>
        </div>
        <FieldError message={errors.doesRenovations?.message} />
      </div>

      <div>
        <FieldLabel htmlFor="hearAboutUs" required>
          How did you hear about us?
        </FieldLabel>
        <input id="hearAboutUs" type="text" className={inputClass} {...register('hearAboutUs')} />
        <FieldError message={errors.hearAboutUs?.message} />
      </div>

      <label className="flex items-start gap-2.5 text-sm text-brand-slate">
        <input type="checkbox" className="mt-0.5 size-4 rounded border-[#d9d8d8] accent-brand-blue" {...register('wantsUpdates')} />
        I want to receive occasional updates from you.
      </label>

      <SubmitError message={submitError} />

      <SubmitButton pending={isSubmitting} label="Book a demo" />
    </form>
  )
}
