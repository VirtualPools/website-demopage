import { LOGO_WHITE_URL, FOOTER_TEXT } from '../data/content'

export default function Footer() {
  return (
    <footer className="bg-[#05070f] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <img src={LOGO_WHITE_URL} alt="VirtualPools" className="h-6 w-auto" />
        <p className="text-sm text-white/50">{FOOTER_TEXT}</p>
      </div>
    </footer>
  )
}
