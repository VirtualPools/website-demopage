import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
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
import { FieldError, FieldLabel, MultiSelectOption, Select, SubmitButton, SubmitError, inputClass } from './FormAtoms'

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
    control,
    formState: { errors, isSubmitting },
  } = useForm<Step2Values>({
    resolver: zodResolver(step2Schema),
    defaultValues: { goals: [], poolType: '', wantsUpdates: false, ...defaultValues },
  })

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
        <FieldLabel htmlFor="role" required>
          Role
        </FieldLabel>
        <Select id="role" placeholder="Select your role" options={ROLE_OPTIONS} registration={register('role')} />
        <FieldError message={errors.role?.message} />
      </div>

      <div>
        <FieldLabel htmlFor="poolsSoldPerYear" required>
          How many pools do you sell per year?
        </FieldLabel>
        <Select
          id="poolsSoldPerYear"
          placeholder="Select a range"
          options={POOLS_SOLD_PER_YEAR_OPTIONS}
          registration={register('poolsSoldPerYear')}
        />
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
        <Controller
          control={control}
          name="goals"
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {GOAL_OPTIONS.map((opt) => {
                const selected = field.value?.includes(opt) ?? false
                return (
                  <MultiSelectOption
                    key={opt}
                    selected={selected}
                    onClick={() => {
                      const current = field.value ?? []
                      field.onChange(selected ? current.filter((v) => v !== opt) : [...current, opt])
                    }}
                  >
                    {opt}
                  </MultiSelectOption>
                )
              })}
            </div>
          )}
        />
        <FieldError message={errors.goals?.message} />
      </div>

      <div>
        <FieldLabel htmlFor="poolType">Which type of pools do you sell?</FieldLabel>
        <Select
          id="poolType"
          placeholder="No preference"
          options={POOL_TYPE_OPTIONS}
          registration={register('poolType')}
        />
        <FieldError message={errors.poolType?.message} />
      </div>

      <div>
        <FieldLabel htmlFor="doesRenovations" required>
          Do you do pool renovations?
        </FieldLabel>
        <Select
          id="doesRenovations"
          placeholder="Select an option"
          options={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ]}
          registration={register('doesRenovations')}
        />
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
