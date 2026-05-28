"use client";

import { useState } from "react";
import Container from "@/components/Container";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: wire to Resend / ConvertKit / your email provider
    setSubmitted(true);
  }

  return (
    <section className="relative text-center py-[120px] border-t border-c3-border"
      style={{ background: "radial-gradient(ellipse at top, rgba(240,190,0,.08), transparent 65%), #090908" }}
    >
      <Container>
        <div className="font-mono text-[10px] tracking-[0.28em] text-c3-yellow uppercase">
          The Cleanup Crew · Monthly
        </div>

        <h2 className="font-disp text-[clamp(48px,7vw,88px)] leading-[0.92] mt-[18px] tracking-[0.025em]">
          One email.<br />
          <span className="text-c3-yellow">Once a month.</span><br />
          Restoration only.
        </h2>

        <p className="font-body font-light text-[17px] text-c3-mid max-w-[560px] mx-auto mt-6 leading-[1.75]">
          The best of Field Notes, plus one new piece of original analysis you won&rsquo;t find on the blog. Read by 3,400 restoration owners and finance leads. No sales pitch in the body. Unsubscribe in one click.
        </p>

        {submitted ? (
          <div className="mt-9 inline-flex items-center gap-3 font-mono text-[12px] tracking-[0.18em] uppercase text-c3-yellow border border-c3-yellow px-6 py-4">
            <span className="w-2 h-2 rounded-full bg-c3-yellow" />
            Subscribed — you&rsquo;re in.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-9 flex justify-center max-w-[520px] mx-auto"
          >
            <input
              type="email"
              required
              placeholder="you@your-restoration-co.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 min-w-0 bg-transparent border border-c3-b2 border-r-0 px-[18px] py-[14px] font-mono text-[12px] tracking-[0.06em] text-c3-text outline-none focus:border-c3-yellow placeholder:text-c3-dim placeholder:tracking-[0.14em] placeholder:text-[11px] placeholder:uppercase transition-colors duration-200"
            />
            <button
              type="submit"
              className="shrink-0 bg-c3-yellow text-[#111] font-cond font-bold text-[13px] tracking-[0.10em] uppercase px-[22px] py-[14px] hover:bg-[#FFD000] transition-colors duration-200"
            >
              Subscribe →
            </button>
          </form>
        )}

        <div className="mt-[18px] font-mono text-[10px] tracking-[0.22em] text-c3-dim uppercase">
          No tracking pixels · No drip campaigns · No upsells inside the email
        </div>
      </Container>
    </section>
  );
}
