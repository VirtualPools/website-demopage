import { LOGO_WHITE_URL } from '../data/content'

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <a href="#top" className="flex min-w-0 shrink items-center">
          <img src={LOGO_WHITE_URL} alt="VirtualPools" className="h-5 w-auto sm:h-7" />
        </a>
        <a
          href="#demo-form"
          className="shrink-0 whitespace-nowrap rounded-lg border border-white/20 px-3 py-1.5 text-xs font-medium text-white transition hover:border-white/40 hover:bg-white/10 sm:px-4 sm:py-2 sm:text-sm"
        >
          Book a demo
        </a>
      </div>
    </header>
  )
}
