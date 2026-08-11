import { CLIENT_LOGOS } from '../data/content'

export default function LogoStrip() {
  // Duplicated once so the CSS marquee can loop seamlessly.
  const logos = [...CLIENT_LOGOS, ...CLIENT_LOGOS]

  return (
    <section className="border-y border-black/5 bg-white py-10">
      <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wide text-brand-slate/70">
        Trusted by
      </p>
      <div className="group overflow-hidden">
        <div className="flex w-max animate-[marquee_32s_linear_infinite] items-center gap-14 group-hover:[animation-play-state:paused]">
          {logos.map((logo, i) => (
            <img
              key={`${logo.name}-${i}`}
              src={logo.src}
              alt={logo.name}
              className="h-9 w-auto shrink-0 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
