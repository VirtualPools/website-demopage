// Fixed-step range slider — snaps to one of `options` rather than a continuous value.
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
  const index = Math.max(0, options.indexOf(value))

  return (
    <div>
      <p className="mb-2 text-center text-lg font-semibold text-brand-blue">{options[index]}</p>
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
      <div className="mt-1 flex justify-between text-xs text-brand-slate">
        <span>{options[0]}</span>
        <span>{options[options.length - 1]}</span>
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
