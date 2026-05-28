"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "./Container";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-[60px] bg-[rgba(9,9,8,0.78)] backdrop-blur-[14px] border-b border-c3-border relative">
      <Container className="flex items-center gap-6 h-full px-4 sm:px-6 lg:px-[52px] xl:px-20">
      <Link
        href="#top"
        aria-label="Cat3 Books home"
        className="inline-flex items-baseline font-disp text-[22px] tracking-[0.04em] leading-none shrink-0"
        onClick={() => setMenuOpen(false)}
      >
        CAT
        <span className="inline-flex items-center justify-center bg-c3-yellow text-[#111] w-5 h-5 text-[18px] mx-0.5 translate-y-0.5">
          3
        </span>
        <span className="text-c3-dim">BOOKS</span>
      </Link>

      {/* Desktop nav */}
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

      {/* Desktop CTA */}
      <Link
        href="#contact"
        className="hidden md:inline-flex ml-auto items-center gap-2 font-cond font-bold text-[12px] tracking-[0.10em] uppercase px-[14px] py-[10px] min-h-[44px] bg-c3-yellow text-[#111] hover:bg-c3-yellow-2 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(240,190,0,0.15)] transition-all duration-[220ms]"
      >
        Free Assessment →
      </Link>

      {/* Mobile hamburger */}
      <button
        className="md:hidden ml-auto flex flex-col justify-center items-center gap-[5px] w-11 h-11 shrink-0"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
      >
        <span
          className={`block w-6 h-[2px] bg-c3-text transition-all duration-200 origin-center ${
            menuOpen ? "rotate-45 translate-y-[7px]" : ""
          }`}
        />
        <span
          className={`block w-6 h-[2px] bg-c3-text transition-all duration-200 ${
            menuOpen ? "opacity-0 scale-x-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-[2px] bg-c3-text transition-all duration-200 origin-center ${
            menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
          }`}
        />
      </button>

      {/* Mobile dropdown nav */}
      {menuOpen && (
        <div
          id="mobile-nav"
          className="md:hidden absolute top-[60px] left-0 right-0 bg-[rgba(9,9,8,0.97)] backdrop-blur-[14px] border-b border-c3-border flex flex-col z-50"
        >
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-mono text-[12px] tracking-[0.16em] uppercase text-c3-dim hover:text-c3-yellow px-5 py-4 border-b border-c3-border transition-colors duration-200 min-h-[52px] flex items-center"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="px-5 py-4">
            <Link
              href="#contact"
              className="flex items-center justify-center gap-2 font-cond font-bold text-[14px] tracking-[0.10em] uppercase px-[14px] py-[14px] min-h-[52px] bg-c3-yellow text-[#111] hover:bg-c3-yellow-2 transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Free Assessment →
            </Link>
          </div>
        </div>
      )}
      </Container>
    </header>
  );
}
