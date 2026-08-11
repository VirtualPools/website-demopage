import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FAQ_ITEMS } from '../data/content'

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center text-3xl font-bold text-brand-ink sm:text-4xl">
          Have questions before you book?
        </h2>
        <p className="mt-3 text-center text-brand-slate">Here are the three most frequently asked questions.</p>

        <div className="mt-10 divide-y divide-black/10 border-y border-black/10">
          {FAQ_ITEMS.map((item, i) => {
            const open = openIndex === i
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold text-brand-ink"
                >
                  {item.question}
                  <span className={`shrink-0 text-brand-blue transition-transform ${open ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-brand-slate">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
