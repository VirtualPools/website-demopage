import HighlightText from './HighlightText'

const COPY: Record<2 | 3, { heading: string; highlight: string[]; subheading: string }> = {
  2: {
    heading: "You're almost there!",
    highlight: ['almost'],
    subheading: 'We just need some more information before the demo.',
  },
  3: {
    heading: "You're all set!",
    highlight: ['all set'],
    subheading: 'Pick a time below and one of our founders will meet you there.',
  },
}

// Page-level heading shown above the centered form on steps 2 and 3, matching the
// real /demo-step2 / /demo-step3 pages (no hero copy, no testimonials on those steps).
export default function StepHeading({ step }: { step: 2 | 3 }) {
  const copy = COPY[step]
  return (
    <>
      <h1 className="text-3xl font-bold text-brand-ink sm:text-4xl">
        <HighlightText text={copy.heading} words={copy.highlight} highlightClassName="text-brand-blue" />
      </h1>
      <p className="mt-3 text-brand-slate">{copy.subheading}</p>
    </>
  )
}
