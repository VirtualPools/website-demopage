import type { ReactNode } from 'react'

export function FieldLabel({ htmlFor, children }: { htmlFor?: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-white/90">
      {children}
    </label>
  )
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1.5 text-sm text-red-300">{message}</p>
}

export const inputClass =
  'w-full rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-white placeholder-white/40 outline-none transition focus:border-brand-cyan focus:bg-white/15'

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
      className={`cursor-pointer rounded-lg border px-3.5 py-2 text-center text-sm transition select-none ${
        checked
          ? 'border-brand-cyan bg-brand-cyan/15 text-white'
          : 'border-white/15 bg-white/5 text-white/80 hover:border-white/30'
      }`}
    >
      {children}
    </label>
  )
}
