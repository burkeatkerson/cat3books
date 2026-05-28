import Overline from "./Overline";

const creds = [
  "QuickBooks ProAdvisor Certified",
  "Fluent in Xactimate, Albi, Dash, JobNimbus, and Encircle workflows",
  "Sage 100, Acumatica, and Foundation ERP experience",
  "RIA member — embedded in the restoration industry community",
  "CPA-coordinated monthly deliverables — your accountant will notice the difference",
];

const tagGroups = [
  {
    label: "Restoration Specializations",
    chips: [
      { label: "Water Damage", on: true },
      { label: "Fire & Smoke", on: true },
      { label: "Mold Remediation", on: true },
      { label: "Storm & Large Loss", on: true },
      { label: "Contents Restoration", on: false },
      { label: "Emergency Services", on: false },
      { label: "Reconstruction", on: false },
      { label: "Biohazard / Trauma", on: false },
      { label: "Asbestos Abatement", on: false },
    ],
  },
  {
    label: "TPA Programs We Track",
    chips: [
      { label: "Contractor Connection", on: true },
      { label: "Alacrity", on: true },
      { label: "Code Blue", on: true },
      { label: "Sedgwick", on: true },
      { label: "Crawford", on: false },
      { label: "Worley", on: false },
      { label: "Broadspire", on: false },
      { label: "Gallagher Bassett", on: false },
    ],
  },
  {
    label: "Franchise Systems Served",
    chips: [
      { label: "Servpro", on: false },
      { label: "PuroClean", on: false },
      { label: "Paul Davis", on: false },
      { label: "Restoration 1", on: false },
      { label: "Rainbow International", on: false },
      { label: "DKI Network", on: false },
    ],
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative px-[52px] py-[108px] bg-c3-dark md:px-5 md:py-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
        <div>
          <Overline>Who We Are</Overline>
          <h2 className="font-disp text-[clamp(40px,5vw,68px)] tracking-[0.025em] leading-[0.95]">
            Restoration only.
            <br />
            <span className="text-c3-yellow">Always.</span>
          </h2>
          <p className="font-body font-light text-[15px] text-c3-mid mt-4 leading-[1.85]">
            Cat3 Books serves restoration companies exclusively. Water, fire,
            mold, storm — that&rsquo;s our entire world. We didn&rsquo;t add a
            restoration page to a generalist firm&rsquo;s website. We built this
            from the ground up for one industry, because restoration bookkeeping
            is different enough to deserve a firm that thinks about nothing else.
          </p>
          <p className="font-body font-light text-[15px] text-c3-mid mt-4 leading-[1.85]">
            Every bookkeeper on our team is trained on how restoration money
            moves. The difference between ACV and RCV. Why TPA programs require
            separate revenue tracking. What a supplement is and why it needs its
            own line. How equipment billing works. Why cash flow in restoration
            is so deceptive.
          </p>
          <p className="font-body font-light text-[15px] text-c3-mid mt-4 leading-[1.85]">
            When your books need to support a bank line, a bonding application,
            a new line of credit, or a serious conversation with your CPA —
            they&rsquo;re built to hold up under scrutiny.
          </p>

          <div className="mt-6 bg-c3-card py-1.5">
            {creds.map((item) => (
              <div
                key={item}
                className="py-[13px] px-5 mx-[22px] border-b border-dashed border-c3-border last:border-b-0 border-l-[2px] border-l-c3-yellow [border-left-style:solid] font-body text-[13.5px] text-c3-text leading-relaxed"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {tagGroups.map(({ label, chips }) => (
            <div key={label}>
              <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim mb-3">
                {label}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {chips.map(({ label: chip, on }) => (
                  <span
                    key={chip}
                    className={`inline-flex items-center font-mono text-[10px] tracking-[0.18em] uppercase px-[10px] py-[6px] border transition-all duration-200 cursor-default ${
                      on
                        ? "border-c3-yellow-dim text-c3-yellow bg-[rgba(240,190,0,0.04)]"
                        : "border-c3-b2 text-c3-mid hover:border-c3-yellow hover:text-c3-yellow"
                    }`}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
