import { LOGO_WHITE_URL } from '../data/content'

// Matches the real /demo page: a thin brand-gradient bar with just the
// centered logo, no nav links or CTA button, scrolling with the page (not fixed).
export default function Header() {
  return (
    <header
      className="flex items-center justify-center py-4"
      style={{ background: 'linear-gradient(135deg, #00dcfc 0%, #035cfc 74%)' }}
    >
      <a href="#top">
        <img src={LOGO_WHITE_URL} alt="VirtualPools" className="h-7 w-auto" />
      </a>
    </header>
  )
}
