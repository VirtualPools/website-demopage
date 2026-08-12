import { motion } from "framer-motion";
import { TEXT_TESTIMONIALS } from "../data/content";

export default function TextTestimonials() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 sm:grid-cols-3">
        {TEXT_TESTIMONIALS.map((t, i) => (
          <motion.figure
            key={t.company}
            className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <figcaption className="mt-6 flex flex-col mb-4 items-center justify-center gap-3">
              <img
                src={t.logoSrc}
                alt={t.company}
                className="h-16 w-auto object-contain"
              />
              <span className="text-sm font-semibold text-brand-ink">
                {t.company}
              </span>
            </figcaption>
            <blockquote className="text-brand-slate">“{t.quote}”</blockquote>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
