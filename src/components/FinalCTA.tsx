import { site } from "@/lib/site";

export default function FinalCTA() {
  return (
    <section
      id="contact"
      className="relative text-center final-cta-bg px-5 md:px-8 lg:px-[52px] xl:px-20 py-20 xl:py-[130px]"
    >
      <div className="font-mono text-[10px] tracking-[0.28em] text-c3-yellow uppercase">
        Free · No Obligation · 30 Minutes
      </div>
      <h2 className="font-disp text-[clamp(60px,8vw,112px)] leading-[0.9] mt-6 tracking-[0.025em]">
        STOP
        <br />
        DRIVING
        <br />
        <span className="text-c3-yellow animate-glowPulse">BLIND.</span>
      </h2>
      <p className="font-body font-light text-[17px] text-c3-mid max-w-[520px] mx-auto mt-7 leading-[1.75]">
        We look at your actual books. Tell you exactly what category they&rsquo;re
        in. Quantify what it&rsquo;s costing you. And give you a clear
        remediation plan — whether you hire us or not.
      </p>
      <div className="mt-[34px] flex gap-[14px] justify-center flex-wrap">
        <a
          href={`mailto:${site.email}`}
          className="inline-flex items-center gap-2 font-cond font-bold text-[14px] tracking-[0.10em] uppercase px-[22px] py-[14px] bg-c3-yellow text-[#111] hover:bg-c3-yellow-2 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(240,190,0,0.15)] transition-all duration-[220ms]"
        >
          Schedule Free Assessment →
        </a>
        <a
          href={`tel:${site.phone}`}
          className="inline-flex items-center gap-2 font-cond font-bold text-[14px] tracking-[0.10em] uppercase px-[22px] py-[14px] border border-c3-b2 text-c3-mid hover:border-c3-mid hover:text-c3-text transition-all duration-[220ms]"
        >
          Call Us Directly
        </a>
      </div>
      <div className="mt-[30px] font-mono text-[10px] tracking-[0.22em] text-c3-dim uppercase">
        No annual contracts · Cancel anytime · Response within 24 hours
      </div>
    </section>
  );
}
