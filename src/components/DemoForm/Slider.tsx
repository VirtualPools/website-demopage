import { useId } from 'react'
import { motion } from 'framer-motion'

// Fixed-step range slider — snaps to one of `options`. Every value is listed below
// the track (clickable too), with the active one highlighted and tracked by a
// sliding underline that glides between positions via a shared `layoutId`.
export function RangeSlider({
  id,
  options,
  value,
  onChange,
}: {
  id: string
  options: readonly string[]
  value: string
  onChange: (value: string) => void
}) {
  const sliderId = useId()
  const index = Math.max(0, options.indexOf(value))

  return (
    <div>
      <input
        id={id}
        type="range"
        min={0}
        max={options.length - 1}
        step={1}
        value={index}
        onChange={(e) => onChange(options[Number(e.target.value)])}
        className="brand-range w-full"
      />
      {/* A native range thumb's center sits at `thumbRadius + fraction * (trackWidth -
          thumbDiameter)`, not at a plain `fraction * 100%` — `flex justify-between`
          lays labels out with a different formula entirely, so they only ever lined
          up by coincidence. Positioning each label with that same thumb formula
          (10px = half of the 20px thumb) keeps every label centered under its dot. */}
      <div className="relative mt-2 h-8">
        {options.map((opt, i) => {
          const active = i === index
          const fraction = options.length > 1 ? i / (options.length - 1) : 0
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              style={{ left: `calc(10px + ${fraction} * (100% - 20px))` }}
              className={`absolute top-0 -translate-x-1/2 px-0.5 pb-2 text-center text-[11px] whitespace-nowrap transition-colors sm:text-xs ${
                active ? 'font-semibold text-brand-blue' : 'text-brand-slate/60 hover:text-brand-slate'
              }`}
            >
              {opt}
              {active && (
                <motion.span
                  layoutId={`slider-tick-${sliderId}`}
                  className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-brand-blue"
                  transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                />
              )}
            </button>
          )
        })}
      </div>

      <style>{`
        .brand-range {
          -webkit-appearance: none;
          appearance: none;
          height: 20px;
          background: transparent;
          cursor: pointer;
        }
        .brand-range::-webkit-slider-runnable-track {
          height: 6px;
          border-radius: 999px;
          background: #d9d8d8;
        }
        .brand-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          margin-top: -7px;
          border-radius: 50%;
          background: #035cfc;
          border: 3px solid #fff;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
        }
        .brand-range::-moz-range-track {
          height: 6px;
          border-radius: 999px;
          background: #d9d8d8;
        }
        .brand-range::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #035cfc;
          border: 3px solid #fff;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  )
}
