interface GlossaryNavProps {
  /**
   * The letters that actually have terms in this glossary.
   * Any letter listed here gets a clickable link; others render as dim text.
   * Example: "ABCDEGILMNOPQRSTW"
   */
  letters: string;
}

/**
 * Alphabetical jump-navigation for glossary posts.
 * Each letter links to an anchor in the MDX body formatted as #letter-{a-z}.
 * Active letters (present in the `letters` prop) are clickable and yellow on
 * hover; letters with no terms are rendered dimly as non-links.
 */
export default function GlossaryNav({ letters }: GlossaryNavProps) {
  const activeSet = new Set(letters.toUpperCase().split(""));
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <nav
      aria-label="Jump to letter"
      className="not-prose flex flex-wrap gap-1 my-8 p-4 bg-c3-card border border-c3-border"
    >
      {alphabet.map((letter) => {
        const active = activeSet.has(letter);
        return active ? (
          <a
            key={letter}
            href={`#letter-${letter.toLowerCase()}`}
            className="font-mono text-[11px] tracking-[0.14em] w-7 h-7 flex items-center justify-center text-c3-mid hover:text-c3-yellow hover:bg-c3-border transition-colors duration-150"
            aria-label={`Jump to ${letter}`}
          >
            {letter}
          </a>
        ) : (
          <span
            key={letter}
            aria-hidden="true"
            className="font-mono text-[11px] tracking-[0.14em] w-7 h-7 flex items-center justify-center text-c3-dim/40 cursor-default"
          >
            {letter}
          </span>
        );
      })}
    </nav>
  );
}
