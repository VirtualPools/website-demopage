import type { ReactNode } from 'react'

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

export function PillOption({
  htmlFor,
  checked,
  children,
}: {
  htmlFor: string
  checked: boolean
  children: ReactNode
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={`cursor-pointer rounded-[5px] border px-3.5 py-2 text-center text-sm transition select-none ${
        checked
          ? 'border-brand-blue bg-brand-blue/10 text-brand-blue'
          : 'border-[#d9d8d8] bg-white text-brand-slate hover:border-brand-blue/50'
      }`}
    >
      {children}
    </label>
  )
}
