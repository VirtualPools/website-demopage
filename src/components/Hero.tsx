import { motion } from 'framer-motion'
import { CLIENT_LOGOS, HERO_CONTENT } from '../data/content'
import DemoForm from './DemoForm/DemoForm'

// FontAwesome "check" glyph — matches the icon used on the live /demo page.
function CheckIcon() {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" className="h-4 w-4">
      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
    </svg>
  )
}

// The live page highlights "own" and "unique" in the brand cyan — split the
// heading copy around those two words rather than hardcoding markup in content.ts.
function Heading({ text }: { text: string }) {
  const parts = text.split(/(own|unique)/)
  return (
    <>
      {parts.map((part, i) =>
        part === 'own' || part === 'unique' ? (
          <span key={i} className="text-brand-cyan">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}

export default function Hero() {
  return (
    <section id="top" className="bg-white pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold leading-tight text-brand-ink sm:text-5xl">
            <Heading text={HERO_CONTENT.heading} />
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
            <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4">
              {CLIENT_LOGOS.map((logo) => (
                <img key={logo.name} src={logo.src} alt={logo.name} className="h-7 w-auto object-contain" />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div id="demo-form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <DemoForm />
        </motion.div>
      </div>
    </section>
  )
}
