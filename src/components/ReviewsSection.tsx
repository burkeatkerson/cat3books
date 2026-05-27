import Overline from "./Overline";

const reviews = [
  {
    initials: "SK",
    name: "Sarah K.",
    role: "Ops Manager · Phoenix, AZ",
    quote: (
      <>
        &ldquo;Our supplements were a black hole. Submit, hope, never see them
        again. Three months in we had a monthly recovery report I actually
        trusted —{" "}
        <span className="text-c3-yellow">
          $47K we&rsquo;d already written off in our heads
        </span>{" "}
        showed up in the bank.&rdquo;
      </>
    ),
    stats: [
      { label: "Company", value: "$2.1M", yellow: false },
      { label: "Engaged", value: "14 mo", yellow: false },
      { label: "Recovered", value: "$47K", yellow: true },
    ],
  },
  {
    initials: "DT",
    name: "Dan T.",
    role: "Owner · Tampa, FL",
    quote: (
      <>
        &ldquo;I thought our books were fine. Their team walked me through
        job-by-job margins from last quarter and{" "}
        <span className="text-c3-yellow">
          two of my biggest &lsquo;wins&rsquo; had been break-even at best.
        </span>{" "}
        Changed who I bid for the next month.&rdquo;
      </>
    ),
    stats: [
      { label: "Company", value: "$1.4M", yellow: false },
      { label: "Engaged", value: "8 mo", yellow: false },
      { label: "Margin lift", value: "+6pt", yellow: true },
    ],
  },
  {
    initials: "RP",
    name: "Renee P.",
    role: "Dir. of Finance · Atlanta, GA",
    quote: (
      <>
        &ldquo;We hired Cat3 to get clean before our line-of-credit renewal. Our
        bank&rsquo;s commercial RM{" "}
        <span className="text-c3-yellow">
          actually called to ask who&rsquo;d prepared the statements.
        </span>{" "}
        That had never happened.&rdquo;
      </>
    ),
    stats: [
      { label: "Company", value: "$5.8M", yellow: false },
      { label: "Engaged", value: "22 mo", yellow: false },
      { label: "LOC raised", value: "2.4×", yellow: true },
    ],
  },
];

const trustChips = [
  "QuickBooks ProAdvisor",
  "RIA Member",
  "Xactimate Fluent",
  "Sage 100 / Acumatica / Foundation",
  "Servpro · PuroClean · Paul Davis franchise experience",
];

export default function ReviewsSection() {
  return (
    <section className="relative px-[52px] py-[108px] bg-c3-dark md:px-5 md:py-16">
      <Overline>Other Owners. Other Books. Same Story.</Overline>
      <h2 className="font-disp text-[clamp(40px,5vw,68px)] tracking-[0.025em] leading-[0.95]">
        Three more{" "}
        <span className="text-c3-yellow">restoration owners</span>
        <br />
        who&rsquo;ve been on the wrong side
        <br />
        of bad books.
      </h2>
      <p className="font-body font-light text-[17px] text-c3-mid mt-[18px] max-w-[720px] leading-[1.7]">
        Anonymized only on request. Real companies, real numbers, real
        engagements between 6 and 28 months.
      </p>

      <div className="grid grid-cols-3 md:grid-cols-1 gap-[2px] bg-c3-border mt-12">
        {reviews.map(({ initials, name, role, quote, stats }) => (
          <div
            key={name}
            className="bg-c3-card p-[30px] flex flex-col"
          >
            <div className="flex items-center gap-[14px]">
              <div className="w-[46px] h-[46px] shrink-0 bg-c3-card border border-c3-yellow text-c3-yellow flex items-center justify-center font-disp text-[18px] tracking-[0.02em]">
                {initials}
              </div>
              <div>
                <div className="font-cond font-bold text-[16px] text-c3-text uppercase tracking-[0.04em] leading-[1.1]">
                  {name}
                </div>
                <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim mt-1">
                  {role}
                </div>
              </div>
            </div>

            <blockquote className="font-cond font-semibold italic text-[18px] text-c3-text leading-[1.5] mt-5 flex-1 not-italic">
              {quote}
            </blockquote>

            <div className="mt-[22px] pt-4 border-t border-dashed border-c3-border flex justify-between gap-3">
              {stats.map(({ label, value, yellow }) => (
                <div key={label} className="flex-1">
                  <div className="font-mono text-[8.5px] tracking-[0.18em] uppercase text-c3-dim">
                    {label}
                  </div>
                  <div
                    className={`font-disp text-[24px] leading-none mt-1 tracking-[0.02em] ${
                      yellow ? "text-c3-yellow" : "text-c3-text"
                    }`}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 py-6 px-7 bg-c3-card border border-c3-border flex items-center justify-between gap-6 flex-wrap">
        <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-yellow">
          Trusted across the restoration ecosystem
        </div>
        <div className="flex flex-wrap gap-1.5">
          {trustChips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center font-mono text-[10px] tracking-[0.18em] uppercase px-[10px] py-[6px] border border-c3-b2 text-c3-mid hover:border-c3-yellow hover:text-c3-yellow transition-all duration-200 cursor-default"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
