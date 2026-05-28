import Link from "next/link";
import { site } from "@/lib/site";
import Container from "./Container";

export default function SiteFooter() {
  return (
    <footer className="bg-c3-dark pt-10 lg:pt-[60px] pb-8 lg:pb-[30px]">
      <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 lg:gap-12">
        <div>
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
          <p className="font-body text-[13px] text-c3-mid mt-4 leading-[1.75] max-w-[300px]">
            The only bookkeeping firm built from the ground up for restoration
            contractors. Restoration only. Always.
          </p>
        </div>

        <div>
          <h5 className="font-mono text-[10px] tracking-[0.22em] text-c3-dim mb-[18px] uppercase">
            Field Notes
          </h5>
          {[
            ["Job Costing", "/field-notes"],
            ["P&L Management", "/field-notes"],
            ["Software Reviews", "/field-notes"],
            ["Supplements & TPAs", "/field-notes"],
            ["The Cleanup Playbook", "/field-notes"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="block font-mono text-[11px] text-c3-mid py-[7px] hover:text-c3-text transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>

        <div>
          <h5 className="font-mono text-[10px] tracking-[0.22em] text-c3-dim mb-[18px] uppercase">
            Cat3 Books
          </h5>
          {[
            ["Services", "/#services"],
            ["Pricing", "/#pricing"],
            ["About", "/#about"],
            ["Contact", "/#contact"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="block font-mono text-[11px] text-c3-mid py-[7px] hover:text-c3-text transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>

        <div>
          <h5 className="font-mono text-[10px] tracking-[0.22em] text-c3-dim mb-[18px] uppercase">
            Get in Touch
          </h5>
          <a
            href={`mailto:${site.email}`}
            className="block font-mono text-[11px] text-c3-mid py-[7px] hover:text-c3-text transition-colors duration-200"
          >
            {site.email}
          </a>
          {[
            ["Schedule a Call", "#contact"],
            ["QuickBooks ProAdvisor", "#"],
            ["RIA Member", "#"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="block font-mono text-[11px] text-c3-mid py-[7px] hover:text-c3-text transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-c3-border flex justify-between flex-wrap gap-6 font-mono text-[10px] tracking-[0.18em] text-c3-dim uppercase">
        <div>© 2026 Cat3 Books · All Rights Reserved · Restoration Bookkeeping Specialists</div>
        <div>QuickBooks ProAdvisor · Xactimate Fluent · RIA Member</div>
      </div>
      </Container>
    </footer>
  );
}
