export default function HighlightText({
  text,
  words,
  highlightClassName = 'text-brand-cyan',
}: {
  text: string
  words: string[]
  highlightClassName?: string
}) {
  const parts = text.split(new RegExp(`(${words.join('|')})`))
  return (
    <>
      {parts.map((part, i) =>
        words.includes(part) ? (
          <span key={i} className={highlightClassName}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}
