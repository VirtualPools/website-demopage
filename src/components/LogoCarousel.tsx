import { useMemo } from 'react'
import { CLIENT_LOGOS } from '../data/content'

const VISIBLE = 4
// Fraction of each 1s step spent holding in place before sliding to the next logo.
const HOLD_RATIO = 0.7

// Pure-CSS carousel: no JS timers, so there's no reset/flicker to get right.
// The track is duplicated once and stepped through via generated keyframes —
// each step holds, then eases into a slide, rather than jumping instantly.
export default function LogoCarousel() {
  const logos = useMemo(() => [...CLIENT_LOGOS, ...CLIENT_LOGOS], [])
  const steps = CLIENT_LOGOS.length
  const stepPercent = 100 / steps
  const shiftPerStep = 50 / steps // track-relative %; the full loop covers -50% of the doubled track

  const keyframes = useMemo(() => {
    const stops: string[] = []
    for (let i = 0; i <= steps; i++) {
      const holdStart = i * stepPercent
      const translate = -(i * shiftPerStep)
      stops.push(`${holdStart}% { transform: translateX(${translate}%); }`)
      if (i < steps) {
        const holdEnd = holdStart + stepPercent * HOLD_RATIO
        stops.push(`${holdEnd}% { transform: translateX(${translate}%); }`)
      }
    }
    return stops.join('\n')
  }, [steps, stepPercent, shiftPerStep])

  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
      }}
    >
      <div
        className="flex"
        style={{
          width: `${(logos.length / VISIBLE) * 100}%`,
          animation: `logo-carousel ${steps}s ease-in-out infinite`,
        }}
      >
        {logos.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex shrink-0 items-center justify-center px-4"
            style={{ width: `${100 / logos.length}%` }}
          >
            <img src={logo.src} alt={logo.name} className="h-8 w-auto object-contain sm:h-9" />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes logo-carousel {
          ${keyframes}
        }
      `}</style>
    </div>
  )
}
