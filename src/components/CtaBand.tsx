import { CTA_BAND } from '../data/content'

// Deliberate simplification vs. the live site, which mounts a second, fully
// independent 3-step form further down the page. Here the CTA just scrolls
// back up to the one hero form instance. Revert to a second <DemoForm />
// mounted here (with its own leadId/step state) if you want that back.
export default function CtaBand() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold text-brand-ink sm:text-4xl">{CTA_BAND.heading}</h2>
        <p className="mt-4 text-brand-slate">{CTA_BAND.body}</p>
        <a
          href="#demo-form"
          className="mt-8 inline-block rounded-[10px] bg-brand-blue px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          {CTA_BAND.buttonLabel}
        </a>
      </div>
    </section>
  )
}
