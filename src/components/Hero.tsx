import { motion } from 'framer-motion'
import { HERO_CONTENT } from '../data/content'
import DemoForm from './DemoForm/DemoForm'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#05070f] pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Decorative brand-gradient glow. Site's real hero bg is white; going dark+gradient
          here per the brand's gradient (cyan -> blue) as a deliberate style upgrade. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[560px] w-[560px] rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, #00dcfc 0%, #035cfc 70%, transparent 100%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #035cfc 0%, transparent 100%)' }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">{HERO_CONTENT.heading}</h1>
          <p className="mt-5 text-lg text-white/70">{HERO_CONTENT.subheading}</p>

          <ul className="mt-8 space-y-3">
            {HERO_CONTENT.valueProps.map((line) => (
              <li key={line} className="flex items-start gap-3 text-white/85">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue/20 text-brand-cyan">
                  ✓
                </span>
                {line}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          id="demo-form"
          className="scroll-mt-28"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <DemoForm />
        </motion.div>
      </div>
    </section>
  )
}
