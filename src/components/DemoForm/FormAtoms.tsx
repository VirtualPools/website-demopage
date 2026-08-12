import { useId, type ReactNode } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'

export function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor?: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-brand-slate">
      {children}
      {required && <span className="ml-0.5 text-brand-blue">*</span>}
    </label>
  )
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1.5 text-sm text-red-600">{message}</p>
}

export const inputClass =
  'w-full rounded-[5px] border border-[#d9d8d8] bg-white px-4 py-2.5 text-brand-ink placeholder-brand-slate/50 outline-none transition focus:border-brand-blue focus:ring-1 focus:ring-brand-blue'

export function SubmitError({ message }: { message: string | null }) {
  if (!message) return null
  return (
    <div role="alert" className="rounded-[5px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {message}
    </div>
  )
}

// FontAwesome "arrow-right-long" glyph, matching the icon on the live page's submit buttons.
function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" className="h-4 w-4">
      <path d="M320 96c0-10.4 6.3-19.8 16-23.6s20.7-1.2 27.7 6.4l160 176c8.5 9.4 8.5 23.4 0 32.7l-160 176c-7.1 7.6-18.2 10.1-27.7 6.4s-16-13.3-16-23.6l0-104-192 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l192 0 0-104z" />
    </svg>
  )
}

export function SubmitButton({ pending, label }: { pending: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-brand-blue px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? 'Please wait…' : label}
      {!pending && <ArrowRightIcon />}
    </button>
  )
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

type SelectOption = string | { value: string; label: string }

// Single-select fields render as a native <select> — simpler and more familiar than a
// grid of radio pills, and the browser handles keyboard/mobile affordances for free.
// Options can be plain strings (value === label) or { value, label } pairs when the
// stored value needs to differ from its display text (e.g. 'yes' vs. "Yes").
export function Select({
  id,
  placeholder,
  options,
  registration,
}: {
  id: string
  placeholder: string
  options: readonly SelectOption[]
  registration: UseFormRegisterReturn
}) {
  const normalized = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o))
  return (
    <div className="relative">
      <select
        id={id}
        defaultValue=""
        className="w-full appearance-none rounded-[5px] border border-[#d9d8d8] bg-white px-4 py-2.5 pr-10 text-brand-ink outline-none transition focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
        {...registration}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {normalized.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronIcon />
    </div>
  )
}

// Animated multi-select chip: a checkmark badge springs in/out and the chip's own
// width smooths via `layout` — the moment of picking something should feel alive,
// not like a plain checkbox with a border swap.
export function MultiSelectOption({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <motion.button
      type="button"
      layout
      onClick={onClick}
      aria-pressed={selected}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 500, damping: 32 }}
      className={`flex items-center rounded-[5px] border px-3.5 py-2 text-sm transition-colors select-none ${
        selected
          ? 'border-brand-blue bg-brand-blue/5 text-brand-blue'
          : 'border-[#d9d8d8] bg-white text-brand-slate hover:border-brand-blue/50'
      }`}
    >
      <AnimatePresence initial={false}>
        {selected && (
          <motion.span
            initial={{ scale: 0, opacity: 0, width: 0, marginRight: 0 }}
            animate={{ scale: 1, opacity: 1, width: 14, marginRight: 6 }}
            exit={{ scale: 0, opacity: 0, width: 0, marginRight: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 32 }}
            className="inline-flex h-3.5 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-blue text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
      {children}
    </motion.button>
  )
}

// PrimeNG-style SelectButton: a connected segmented control where the active option
// gets a solid fill that glides between buttons via a shared `layoutId`, rather than
// each button independently swapping its own background.
export function SelectButtonGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
}) {
  const groupId = useId()
  return (
    <div className="inline-flex gap-1 rounded-[5px] border border-[#d9d8d8] bg-white p-1">
      {options.map((opt) => {
        const selected = opt.value === value
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(opt.value)}
            className={`relative rounded-[4px] px-4 py-1.5 text-sm font-medium transition-colors ${
              selected ? 'text-white' : 'text-brand-slate hover:text-brand-ink'
            }`}
          >
            {selected && (
              <motion.span
                layoutId={`select-button-${groupId}`}
                className="absolute inset-0 rounded-[4px] bg-brand-blue"
                transition={{ type: 'spring', stiffness: 500, damping: 32 }}
              />
            )}
            <span className="relative z-10">{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}
