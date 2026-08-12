import { motion } from 'framer-motion'
import { HERO_CONTENT } from '../data/content'
import HighlightText from './HighlightText'
import LogoCarousel from './LogoCarousel'

// FontAwesome "check" glyph — matches the icon used on the live /demo page.
function CheckIcon() {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" className="h-4 w-4">
      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
    </svg>
  )
}

// The hero copy + inline "Trusted by" carousel — shown only on step 1, matching the
// real /demo page. Steps 2/3 drop all of this in favor of a centered form (see
// DemoExperience.tsx and StepHeading.tsx).
export default function HeroCopy() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="text-4xl font-bold leading-tight text-brand-ink sm:text-5xl">
        <HighlightText text={HERO_CONTENT.heading} words={['own', 'unique']} highlightClassName="text-brand-cyan" />
      </h1>
      <p className="mt-5 text-lg text-brand-slate">{HERO_CONTENT.subheading}</p>

      <ul className="mt-8 space-y-3">
        {HERO_CONTENT.valueProps.map((line) => (
          <li key={line} className="flex items-start gap-3 text-brand-ink">
            <span className="mt-0.5 shrink-0 text-brand-blue">
              <CheckIcon />
            </span>
            {line}
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <p className="text-sm font-medium text-brand-ink">Trusted by:</p>
        <div className="mt-4">
          <LogoCarousel />
        </div>
      </div>
    </motion.div>
  )
}
