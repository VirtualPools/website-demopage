import { motion } from 'framer-motion'
import { FEATURE_BLOCKS } from '../data/content'

export default function FeatureSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl space-y-20 px-6">
        {FEATURE_BLOCKS.map((block, i) => {
          const reversed = i % 2 === 1
          return (
            <div key={block.heading} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <motion.img
                src={block.imageSrc}
                alt={block.imageAlt}
                loading="lazy"
                className={`w-full rounded-2xl border border-black/5 shadow-lg ${reversed ? 'lg:order-2' : ''}`}
                initial={{ opacity: 0, x: reversed ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              />
              <motion.div
                className={reversed ? 'lg:order-1' : ''}
                initial={{ opacity: 0, x: reversed ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-2xl font-bold text-brand-ink sm:text-3xl">{block.heading}</h3>
                <p className="mt-4 text-brand-slate">{block.body}</p>
              </motion.div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
