import Link from "next/link";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 h-[60px] px-[52px] flex items-center gap-8 bg-[rgba(9,9,8,0.78)] backdrop-blur-[14px] border-b border-c3-border">
      <Link
        href="#top"
        aria-label="Cat3 Books home"
        className="inline-flex items-baseline font-disp text-[22px] tracking-[0.04em] leading-none"
      >
        CAT
        <span className="inline-flex items-center justify-center bg-c3-yellow text-[#111] w-5 h-5 text-[18px] mx-0.5 translate-y-0.5">
          3
        </span>
        <span className="text-c3-dim">BOOKS</span>
      </Link>

      <nav className="hidden md:flex gap-[22px] ml-6" aria-label="Primary">
        {navLinks.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="font-mono text-[11px] tracking-[0.14em] uppercase text-c3-dim hover:text-c3-yellow transition-colors duration-200"
          >
            {label}
          </Link>
        ))}
      </nav>

      <Link
        href="#contact"
        className="ml-auto inline-flex items-center gap-2 font-cond font-bold text-[12px] tracking-[0.10em] uppercase px-[14px] py-[10px] bg-c3-yellow text-[#111] hover:bg-c3-yellow-2 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(240,190,0,0.15)] transition-all duration-[220ms]"
      >
        Free Assessment →
      </Link>
    </header>
  );
}
