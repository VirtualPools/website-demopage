import { useEffect, useMemo, useRef, useState } from 'react'
import { getCountryCallingCode } from 'react-phone-number-input'

// Flags are served as static SVGs from public/flags/<CODE>.svg (copied from
// country-flag-icons/3x2) rather than imported as React components or rendered as
// unicode flag emoji. Importing all ~250 flag components by dynamic key defeats
// tree-shaking and bloats the JS bundle; unicode flag emoji don't render as actual
// flags on Windows (shows the raw two-letter code instead) — plain <img> tags are
// small, cacheable, and only fetched for flags actually shown.
function FlagIcon({ country, className }: { country: string; className?: string }) {
  return <img src={`/flags/${country}.svg`} alt="" className={className} />
}

interface CountryOption {
  value?: string
  label: string
  divider?: boolean
}

// Custom replacement for react-phone-number-input's default country <select> — a
// searchable dropdown with flags and "(+code)" next to each country, matching the
// intl-tel-input / Twilio style rather than a bare native select popup.
export function CountrySelect({
  value,
  onChange,
  options,
}: {
  value?: string
  onChange: (value?: string) => void
  options: CountryOption[]
  // Extra props PhoneInput may pass through (disabled, readOnly, className, iconComponent, ...) — unused here.
  [key: string]: unknown
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const countries = useMemo(
    () => options.filter((o): o is CountryOption & { value: string } => Boolean(o.value) && !o.divider),
    [options],
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase().replace('+', '')
    if (!q) return countries
    return countries.filter(
      (c) => c.label.toLowerCase().includes(q) || getCountryCallingCode(c.value as never).includes(q),
    )
  }, [countries, search])

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  useEffect(() => {
    if (open) {
      setSearch('')
      requestAnimationFrame(() => searchRef.current?.focus())
    }
  }, [open])

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Select country"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-[4px] px-1 py-1 outline-none transition hover:bg-black/5"
      >
        {value ? (
          <FlagIcon country={value} className="h-4 w-6 shrink-0 rounded-sm object-cover" />
        ) : (
          <span className="h-4 w-6 shrink-0 rounded-sm bg-slate-200" />
        )}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-3 w-3 shrink-0 text-brand-slate transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 w-72 overflow-hidden rounded-[8px] border border-[#d9d8d8] bg-white shadow-lg">
          <div className="flex items-center gap-2 border-b border-[#d9d8d8] px-3 py-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 shrink-0 text-brand-slate"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="w-full text-sm text-brand-ink outline-none placeholder:text-brand-slate/50"
            />
          </div>
          <ul role="listbox" className="max-h-64 overflow-y-auto py-1">
            {filtered.map((c) => {
              const selected = c.value === value
              return (
                <li key={c.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onChange(c.value)
                      setOpen(false)
                    }}
                    className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors ${
                      selected ? 'bg-brand-blue/5 text-brand-blue' : 'text-brand-ink hover:bg-slate-50'
                    }`}
                  >
                    <FlagIcon country={c.value} className="h-4 w-6 shrink-0 rounded-sm object-cover" />
                    <span className="flex-1 truncate">{c.label}</span>
                    <span className="shrink-0 text-brand-slate">(+{getCountryCallingCode(c.value as never)})</span>
                  </button>
                </li>
              )
            })}
            {filtered.length === 0 && <li className="px-3 py-2 text-sm text-brand-slate">No countries found</li>}
          </ul>
        </div>
      )}
    </div>
  )
}
