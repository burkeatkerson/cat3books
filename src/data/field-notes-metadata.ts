/**
 * ─────────────────────────────────────────────────────────────────────────────
 * MAINTENANCE INSTRUCTION FOR AI ASSISTANTS
 * ─────────────────────────────────────────────────────────────────────────────
 * This file is the OG image lookup table for all Field Notes blog posts.
 * It exists because the OG image route runs on the edge runtime, which cannot
 * access the filesystem — so it can't read MDX frontmatter directly.
 *
 * WHENEVER A NEW MDX POST IS CREATED in src/content/field-notes/, you MUST
 * also add a matching entry to the `fieldNotesMeta` object below. Use the
 * MDX filename (without .mdx) as the key, and copy title, categoryLabel, and
 * excerpt from the post's frontmatter.
 *
 * If this file is not updated, the new post's social preview image will fall
 * back to a generic "Field Notes" image instead of showing the post title.
 *
 * See src/content/field-notes/_template.mdx for the full new-post checklist.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const fieldNotesMeta: Record<
  string,
  { title: string; categoryLabel: string; excerpt: string }
> = {
  "how-to-read-a-job-level-pl": {
    title: "How to Read a Job-Level P&L Like a Restoration Owner",
    categoryLabel: "Job Costing",
    excerpt:
      "Five rows of data. Three minutes of looking. Most restoration owners can't answer which jobs made money last quarter — not because the data is missing, but because nobody taught them which columns to actually read.",
  },
  "xactimate-vs-symbility": {
    title: "Xactimate vs. Symbility: Which Estimating Platform Actually Maps Cleanly Into Your Books?",
    categoryLabel: "Software Reviews",
    excerpt:
      "Both export. Only one exports in a way you can reconcile without a bookkeeper losing an afternoon. We ran the same job through both for three months.",
  },
  "four-cost-categories-restoration-job-pl": {
    title: "The Four Cost Categories Every Restoration Job P&L Must Split",
    categoryLabel: "Job Costing",
    excerpt:
      "Labor, materials, subs, equipment. Sounds obvious. Most restoration books bundle two of them into 'Cost of Goods' and lose the ability to ever answer where the margin is going.",
  },
  "code-blue-test-tpa-programs": {
    title: "The Code Blue Test: How to Decide Which TPA Programs to Drop",
    categoryLabel: "Profitability",
    excerpt:
      "A simple two-line P&L overlay per program tells you which carriers to keep, which to renegotiate, and which to walk away from on principle.",
  },
  "qbo-class-tracking-restoration": {
    title: "Class Tracking for Restoration Jobs in QuickBooks Online — The Right Way",
    categoryLabel: "QuickBooks Guides",
    excerpt:
      "Classes are powerful and unforgiving. Set them up wrong and you've baked the wrong taxonomy into a year of transactions. Here's the exact structure we deploy on every engagement.",
  },
  "supplements-disappear-xactimate-quickbooks": {
    title: "Why Your Supplements Disappear Between Xactimate and QuickBooks",
    categoryLabel: "Supplements & TPAs",
    excerpt:
      "Approved by the adjuster. Worked by the crew. Never reconciled to the books. The dollar size of the leak in a typical $2M shop will surprise you.",
  },
  "owners-reading-order-monthly-pl": {
    title: "The Owner's Reading Order for a Monthly P&L (It's Not Top-to-Bottom)",
    categoryLabel: "P&L Management",
    excerpt:
      "If you read a restoration P&L in account order, you'll get bored before you find anything actionable. There's a better sequence that surfaces the real story in 4 minutes.",
  },
  "equipment-day-reconciliation-habit": {
    title: "Equipment-Day Reconciliation: The 15-Minute Weekly Habit That Saves $20K a Year",
    categoryLabel: "Profitability",
    excerpt:
      "Air movers, dehumidifiers, scrubbers. The most consistently under-billed line in the industry. Here's the Friday-afternoon ritual we set up with every client.",
  },
  "albi-dash-jobnimbus-comparison": {
    title: "Albi vs. Dash vs. JobNimbus: A Job-Costing Perspective",
    categoryLabel: "Software Reviews",
    excerpt:
      "Each is a credible job-management platform. Each handles costs differently when the data lands in your books. Side-by-side from a bookkeeper's lens.",
  },
  "13-week-cash-forecast-restoration": {
    title: "Building a 13-Week Cash Forecast for Restoration",
    categoryLabel: "Cash Flow & Working Capital",
    excerpt:
      "Standard 13-week templates assume bills get paid in 30 days. In restoration, 'collected' can mean three different things across five different time horizons.",
  },
  "what-restoration-bookkeeping-actually-means": {
    title: "What 'Restoration Bookkeeping' Actually Means",
    categoryLabel: "Job Costing",
    excerpt:
      "Most bookkeepers can balance a ledger. Very few understand the difference between ACV and RCV, why TPA fees belong on their own line, or how to reconcile equipment revenue.",
  },

  // ── Decision Framework Series ────────────────────────────────────────────
  "should-you-outsource-restoration-bookkeeping": {
    title: "Should You Outsource Your Restoration Company's Bookkeeping? A Complete Decision Framework",
    categoryLabel: "Decision Frameworks",
    excerpt:
      "The decision to outsource bookkeeping isn't about cost — it's about whether your current setup can produce the financial information a restoration company actually needs to operate.",
  },
  "when-restoration-company-needs-fractional-cfo": {
    title: "When Should a Restoration Company Hire a Fractional CFO? The Revenue-Stage Framework",
    categoryLabel: "Decision Frameworks",
    excerpt:
      "A Fractional CFO isn't a luxury for large companies. At the right stage, it's the difference between knowing what's happening in your business and finding out six months later.",
  },
  "should-you-switch-from-quickbooks-restoration": {
    title: "Should You Switch from QuickBooks to a Restoration-Specific Platform? A Decision Framework",
    categoryLabel: "Decision Frameworks",
    excerpt:
      "For most $500K–$5M restoration companies, QuickBooks with proper configuration outperforms any platform switch. Here's when the math actually changes.",
  },
  "should-you-accept-pe-acquisition-offer": {
    title: "Should You Accept That PE Acquisition Offer? A Restoration Owner's Decision Framework",
    categoryLabel: "Decision Frameworks",
    excerpt:
      "A PE acquisition offer is one of the most complex financial decisions a restoration owner will make. It's not just about the number — it's about structure, timeline, and what you're actually agreeing to.",
  },
  "should-you-take-big-restoration-job": {
    title: "Should You Take On That Big Restoration Job? A Profitability Decision Framework",
    categoryLabel: "Decision Frameworks",
    excerpt:
      "A large restoration job looks like a revenue win. It might be a cash flow trap, a margin drain, or an opportunity cost you can't afford. Here's the framework to decide in the field.",
  },

  // ── Industry Research Series ─────────────────────────────────────────────
  "restoration-industry-statistics-2026": {
    title: "50+ Restoration Industry Statistics Every Owner Should Know in 2026",
    categoryLabel: "Industry Research",
    excerpt:
      "The U.S. damage restoration industry spans $15–$20B in direct services revenue across more than 70,000 businesses — growing at 4–6% annually. Here are the statistics that matter, sourced and cited across market size, claims data, profitability, M&A, and more.",
  },
  "restoration-profitability-benchmarks-analysis": {
    title: "Restoration Company Profitability Benchmarks: A Data-Driven Analysis",
    categoryLabel: "Industry Research",
    excerpt:
      "Restoration companies average 30–50% gross margins and 8–18% EBITDA margins — but the range is wide. Revenue tier, service mix, TPA dependency, and bookkeeping quality all drive the variance. This analysis covers every major financial benchmark by revenue stage.",
  },
  "restoration-ma-trends-2026": {
    title: "The State of Restoration Industry M&A in 2026: Multiples, Buyers, and Trends",
    categoryLabel: "Industry Research",
    excerpt:
      "PE has been buying restoration companies at 4–8× EBITDA since 2018, and the consolidation wave is ongoing. This report covers who's buying, what they're paying, what they look for, and what restoration owners need to know about their exit options.",
  },
  "insurance-restoration-claims-data": {
    title: "Insurance Restoration Claims Data: Trends, Frequency, and Severity Analysis",
    categoryLabel: "Industry Research",
    excerpt:
      "Water damage averages $12,514 per homeowner claim. Fire claims average $77,000–$84,000. Billion-dollar disasters now occur 18–20 times per year — triple the 1980s rate. This report compiles the claims data that drives restoration industry demand.",
  },
  "cost-of-doing-business-restoration-2026": {
    title: "The Cost of Doing Business in Restoration: 2026 Industry Report",
    categoryLabel: "Industry Research",
    excerpt:
      "Workers' comp at $8–$18 per $100 of payroll, Xactimate at $1,800–$4,200/user/year, GL insurance, equipment depreciation, IICRC certification — restoration overhead stacks to 22–32% of revenue. This report benchmarks every major cost category.",
  },

  // ── Industry Analysis Series ─────────────────────────────────────────────
  "why-restoration-needs-specialized-bookkeepers": {
    title: "Why Restoration Companies Need Specialized Bookkeepers (Not Generic Services)",
    categoryLabel: "Decision Frameworks",
    excerpt:
      "Restoration revenue mechanics — Xactimate billing, ACV/RCV splits, supplement tracking, TPA referral fees — require accounting workflows that don't exist in standard QBO setups. Generic bookkeepers consistently misclassify these transactions. Here's the structured argument.",
  },
  "hidden-cost-generic-bookkeeping-restoration": {
    title: "The Hidden Cost of Generic Bookkeeping for Restoration Contractors",
    categoryLabel: "Decision Frameworks",
    excerpt:
      "Generic bookkeeping for restoration companies isn't just imprecise — it's expensive. Unbilled supplements, misclassified TPA fees, improper revenue recognition, valuation discounts, and tied-up AR add up to $75,000–$175,000 in annual value erosion for a typical $2M restoration company.",
  },
  "mitigation-companies-unique-accounting-needs": {
    title: "Why Mitigation Companies Have Unique Accounting Needs Different from General Construction",
    categoryLabel: "Decision Frameworks",
    excerpt:
      "Water mitigation accounting isn't construction accounting with a different coat of paint. Equipment-day billing, drying log reconciliation, AFD depreciation timing, and emergency-response labor burden require workflows that construction bookkeepers have never encountered.",
  },
  "contents-restoration-bookkeeping-differences": {
    title: "Contents Restoration Bookkeeping: Why It's Different from Structural Work",
    categoryLabel: "Decision Frameworks",
    excerpt:
      "Contents restoration — pack-outs, cleaning, storage, item-by-item valuation, total loss settlements — has an accounting reality that structural restoration bookkeepers don't automatically understand. Here's the case for contents-specific financial management.",
  },
  "cpa-vs-restoration-specific-bookkeeper": {
    title: "Why Your CPA Doesn't Replace a Restoration-Specific Bookkeeper",
    categoryLabel: "Decision Frameworks",
    excerpt:
      "Most restoration owners have a CPA for tax compliance and a generic bookkeeper for operations. What they're missing is the specialized layer — a bookkeeper who understands restoration billing mechanics. These are three distinct roles, not interchangeable ones.",
  },

  // ── Definitive Guides (Pillar Content) ──────────────────────────────────
  "complete-guide-bookkeeping-restoration-companies": {
    title: "The Complete Guide to Bookkeeping for Restoration Companies (2026)",
    categoryLabel: "Definitive Guides",
    excerpt:
      "The definitive bookkeeping guide for restoration companies — covering chart of accounts, job costing, insurance receivables, supplement tracking, TPA fee handling, equipment revenue, and the monthly close process specific to water, fire, mold, and rebuild operations.",
  },
  "complete-guide-job-costing-restoration-mitigation": {
    title: "The Complete Guide to Job Costing for Restoration and Mitigation Contractors",
    categoryLabel: "Definitive Guides",
    excerpt:
      "How job costing works in insurance restoration — QBO setup, direct cost categories, loaded labor rates, Xactimate-to-actual reconciliation, service-line margin analysis, and the original Restoration Job Costing Framework with five named tiers.",
  },
  "complete-guide-insurance-billing-accounting-restoration": {
    title: "The Complete Guide to Insurance Billing Accounting for Restoration Contractors",
    categoryLabel: "Definitive Guides",
    excerpt:
      "How to account for insurance receivables in restoration — covering the full billing lifecycle, ACV vs. RCV vs. holdback accounting, supplement tracking, two-party checks, TPA fee treatment, AR aging by job stage, and the Insurance AR Lifecycle framework.",
  },
  "complete-guide-restoration-company-financial-management": {
    title: "The Complete Guide to Restoration Company Financial Management",
    categoryLabel: "Definitive Guides",
    excerpt:
      "How to manage the finances of a restoration business — P&L structure, WIP schedules, 13-week cash flow forecasting, working capital math, KPIs by revenue stage, banking relationships, tax planning, owner compensation, and the Restoration Financial Maturity Model.",
  },
  "complete-guide-selling-restoration-business": {
    title: "The Complete Guide to Selling a Restoration Business",
    categoryLabel: "Definitive Guides",
    excerpt:
      "How to sell a restoration company — industry M&A landscape, SDE vs. EBITDA valuation, acquisition multiples by company size, what moves the multiple, 24-month prep checklist, Quality of Earnings, deal structures, and tax implications for restoration owners.",
  },

  // ── Glossaries (Reference Content) ──────────────────────────────────────
  "restoration-insurance-glossary": {
    title: "The Complete Restoration Insurance Glossary: 50+ Terms Every Owner Should Know",
    categoryLabel: "Reference",
    excerpt:
      "Canonical definitions for every insurance term a restoration contractor encounters — from ACV and RCV to supplements, TPA programs, appraisal, bad faith, and psychrometrics. Each entry is a complete, citable definition written for restoration industry use.",
  },
  "restoration-accounting-terminology-reference": {
    title: "The Restoration Job Costing & Accounting Terminology Reference",
    categoryLabel: "Reference",
    excerpt:
      "Canonical definitions for every accounting and job costing term specific to restoration — from job costing and labor burden to WIP, over/under billing, EBITDA, and lien waivers. Each entry is a complete, standalone definition written for restoration industry use.",
  },
  "restoration-software-glossary": {
    title: "Restoration Software Glossary: What Every Tool Does",
    categoryLabel: "Reference",
    excerpt:
      "Comprehensive overview of every major restoration software tool — Xactimate, Symbility, Albi, Dash, JobNimbus, Encircle, CompanyCam, QBO, and more. For each: what it does, pricing, who it's right for, and how it integrates with QuickBooks Online.",
  },
  "restoration-certifications-standards-explained": {
    title: "Restoration Industry Certifications and Standards Explained",
    categoryLabel: "Reference",
    excerpt:
      "Complete guide to IICRC certifications (WRT, ASD, AMRT, FSRT, OCT, CCT, CDS, RRT), RIA designations (CR, WLS, FLS, CLS), industry standards (S500, S520, S540), EPA RRP, OSHA requirements, and other credentials relevant to restoration contractors.",
  },
  "restoration-tax-legal-terminology": {
    title: "Restoration Tax and Legal Terminology: A Reference for Owners",
    categoryLabel: "Reference",
    excerpt:
      "Canonical definitions for every tax and legal term a restoration business owner encounters — from entity types and depreciation elections to lien laws, payroll taxes, workers' comp classification, surety bonds, and public adjuster regulations.",
  },

  // ── Software Reviews ─────────────────────────────────────────────────────
  "dash-cotality-restoration-review": {
    title: "Dash (Cotality) Review for Restoration Companies: What It Does — And What It Doesn't Do for Your Books",
    categoryLabel: "Software Reviews",
    excerpt:
      "Dash is the most mature TPA management platform in restoration and a reliable job workflow tool. The QBO integration works — but it's not a bookkeeping replacement, and the one-way data flow leaves more accounting work than most owners expect.",
  },
  "albi-vs-quickbooks-restoration": {
    title: "Albi vs. QuickBooks for Restoration: Does Albi Replace My Bookkeeping?",
    categoryLabel: "Software Reviews",
    excerpt:
      "Albi is the best restoration-native job management platform on the market. It doesn't replace QuickBooks — it feeds it. Here's exactly what transfers, what doesn't, and where the accounting work still lives.",
  },
  "encircle-review-restoration": {
    title: "Encircle Review: Documentation Tool or Accounting Replacement? What Restoration Owners Need to Know",
    categoryLabel: "Software Reviews",
    excerpt:
      "Encircle is the best field documentation tool in restoration — photos, drying logs, moisture maps, equipment tracking. It has no accounting functionality. Understanding what it does and doesn't do prevents a specific, common mistake.",
  },
  "psa-canam-vs-quickbooks-restoration": {
    title: "PSA (Canam) vs. QuickBooks Online for Restoration: When Does Switching Make Sense?",
    categoryLabel: "Software Reviews",
    excerpt:
      "PSA by Canam is one of the few platforms built to handle the insurance payment cycle natively. It's also complex, expensive, and right-sized for $7M+ multi-location operations. Below that threshold, the switch cost rarely pays off.",
  },
  "best-apps-restoration-quickbooks": {
    title: "Best Apps for Restoration Companies That Integrate with QuickBooks Online",
    categoryLabel: "Software Reviews",
    excerpt:
      "A categorized guide to every app category a restoration company needs around QuickBooks Online — job management, documentation, time tracking, payroll, AP, and expense management. What integrates, what doesn't, and what works at each revenue stage.",
  },
  "symbility-vs-xactimate-bookkeeping": {
    title: "Symbility vs. Xactimate: Does the Estimating Platform Affect Your Bookkeeping?",
    categoryLabel: "Software Reviews",
    excerpt:
      "Your estimating platform choice does affect your bookkeeping workflow — but probably less than you think. The core accounting steps are the same. The differences are in export quality, supplement tracking, and manual mapping work.",
  },

  // ── Hiring & Outsourcing ─────────────────────────────────────────────────
  "real-cost-in-house-bookkeeper-restoration": {
    title: "The Real Cost of Hiring an In-House Bookkeeper for a Restoration Company ($65K Isn't the Answer)",
    categoryLabel: "Hiring & Outsourcing",
    excerpt:
      "The Indeed listing says $45K–$65K. The real all-in cost — salary, burden, ramp time, training, turnover risk, and your own management overhead — runs $80,000–$110,000 per year. Here's the full math, line by line.",
  },
  "in-house-vs-outsourcing-bookkeeping-restoration": {
    title: "Hiring an In-House Bookkeeper vs. Outsourcing: The Real Cost Comparison for a $2M Restoration Company",
    categoryLabel: "Hiring & Outsourcing",
    excerpt:
      "A side-by-side comparison of every meaningful dimension — cost, time-to-productivity, restoration expertise, scalability, and risk — for a $2M restoration company choosing between in-house and outsourced bookkeeping. The math favors outsourcing in Year 1. The Year 3 picture is even more lopsided.",
  },
  "bookkeeper-vs-controller-vs-cfo-restoration": {
    title: "Bookkeeper, Controller, or CFO: Which One Does Your Restoration Company Need?",
    categoryLabel: "Hiring & Outsourcing",
    excerpt:
      "Three roles. Three different functions. Most restoration owners conflate them — and either overpay for overhead they don't need yet, or underpay and leave financial blind spots that compound. Here's the plain-English breakdown mapped to your revenue stage.",
  },
  "questions-to-ask-bookkeeper-restoration": {
    title: "5 Questions to Ask Before Hiring a Bookkeeper for Your Restoration Company",
    categoryLabel: "Hiring & Outsourcing",
    excerpt:
      "Most restoration owners can't tell a specialist from a generalist in an interview. These five questions change that — each one has a wrong answer that's easy to give, and a right answer that only someone with actual restoration bookkeeping experience would know.",
  },
  "fractional-cfo-restoration-company": {
    title: "When Does a Restoration Company Need a Fractional CFO? The Deliverables That Pay for Themselves",
    categoryLabel: "Hiring & Outsourcing",
    excerpt:
      "A fractional CFO isn't a luxury title or a vague 'strategic advisor.' For a $3M–$7M restoration company, it's four specific deliverables: a 13-week cash forecast, WIP reporting, bank covenant prep, and sale preparation. Here's what each one costs and what each one returns.",
  },
  "office-manager-doing-books-restoration": {
    title: "My Office Manager Is Doing My Books. Here's When That Stops Working.",
    categoryLabel: "Hiring & Outsourcing",
    excerpt:
      "It starts with practicality and ends with a problem that's hard to see because it grew slowly. The office manager–bookkeeper arrangement works fine at $500K. By $1.5M–$2M it's costing you real money — in errors, missed supplements, and financial blind spots. Here's what to watch for.",
  },

  // ── Industry Benchmarks ──────────────────────────────────────────────────
  "restoration-company-financial-benchmarks": {
    title: "Restoration Company Financial Benchmarks: What Gross Margin, AR, and Net Profit Should Look Like at $1M, $3M, and $5M",
    categoryLabel: "Industry Benchmarks",
    excerpt:
      "The RIA Cost of Doing Business Report puts average gross margin at 50%, net margin at 14%, and overhead at 38% for insurance restoration contractors. Here's what those numbers look like broken down by revenue tier — and what it means if yours are different.",
  },
  "is-your-restoration-company-profitable": {
    title: "Is Your Restoration Company Actually Profitable? 5 Numbers Every Owner Should Be Able to Answer",
    categoryLabel: "Industry Benchmarks",
    excerpt:
      "Most restoration owners have a rough sense of whether money is coming in. Fewer know their gross margin by service line, their WIP balance, their labor efficiency ratio, or what percentage of their AR is sitting past 90 days. These five numbers tell you whether your company is actually profitable — or just busy.",
  },
  "ten-and-ten-myth-restoration": {
    title: "The '10 and 10' Myth: Why Xactimate Overhead and Profit Doesn't Cover Your Actual Costs",
    categoryLabel: "Industry Benchmarks",
    excerpt:
      "Xactimate's default 10% overhead and 10% profit line assumes your overhead is 10% of job revenue. The RIA Cost of Doing Business Report puts actual restoration contractor overhead at 38%. That 28-point gap is real money — and understanding where it goes changes how you read every estimate you write.",
  },
  "3m-restoration-company-take-home-profit": {
    title: "Why Your $3M Restoration Company Might Only Be Making $80K in Real Take-Home Profit",
    categoryLabel: "Industry Benchmarks",
    excerpt:
      "A $3M restoration company at industry-average margins produces $1.5M in gross profit. After 38% overhead, owner salary, debt service, and taxes, the take-home can land below $100K. Here's the math most owners haven't run — and what it means for how you think about growth.",
  },
  "restoration-company-overhead-percentage": {
    title: "What Overhead Percentage Is Healthy for a Restoration Company?",
    categoryLabel: "Industry Benchmarks",
    excerpt:
      "The RIA Cost of Doing Business Report puts average overhead at 38% of revenue for insurance restoration contractors. That 38% breaks into 8 specific categories — and the healthy range for each varies by revenue size. Here's what's normal, what's high, and where most companies are carrying more than they realize.",
  },
  "ar-days-outstanding-restoration": {
    title: "AR Days Outstanding for Restoration: What's Normal vs. What's a Problem",
    categoryLabel: "Industry Benchmarks",
    excerpt:
      "The RIA Cost of Doing Business Report reports a median AR-to-revenue ratio of 16.5% for insurance restoration contractors — which translates to 60+ days outstanding at typical collection cycles. But 60 days is the median, not the floor. Here's how to read your AR aging, what's normal by payer type, and when 90+ days becomes a real problem.",
  },

  // ── Comparisons ──────────────────────────────────────────────────────────
  "bench-vs-restoration-bookkeeper": {
    title: "Bench vs. a Restoration-Specialized Bookkeeper: The Honest Comparison",
    categoryLabel: "Comparisons",
    excerpt:
      "Bench is one of the cleanest, fastest bookkeeping services you can buy — fixed price, simple app, painless onboarding. For a coffee shop or a marketing agency, it's hard to beat. For an insurance restoration company, the gap isn't the price or the interface. It's that Bench doesn't speak Xactimate, ACV/RCV, supplements, TPA fees, or WIP. Here's the honest, feature-by-feature comparison.",
  },
  "pilot-vs-restoration-bookkeeper": {
    title: "Pilot vs. a Restoration Bookkeeping Specialist: Is the Lower Price Worth It?",
    categoryLabel: "Comparisons",
    excerpt:
      "Pilot is one of the most sophisticated bookkeeping services in the market — built for venture-backed startups and SaaS companies, staffed by sharp accountants, with real CFO services on top. It is genuinely excellent at what it was designed for. Insurance restoration is not what it was designed for. Here's the honest, feature-by-feature look at where the gap is.",
  },
  "cpa-vs-bookkeeper-restoration": {
    title: "Your CPA Does Your Taxes. Here's Why That's Not the Same as Having Your Books Right.",
    categoryLabel: "Comparisons",
    excerpt:
      "\"I already have a CPA\" is the most common reason restoration owners give for not needing a bookkeeper. It's also a category error. Your CPA keeps you compliant with the IRS once a year. A bookkeeper keeps your numbers right and visible all year — so you can actually run the business. Different jobs, different timelines, both necessary. Here's the honest breakdown.",
  },
  "xendoo-vs-restoration-bookkeeper": {
    title: "Xendoo vs. Restoration Bookkeeper: Feature-by-Feature for Restoration Owners",
    categoryLabel: "Comparisons",
    excerpt:
      "Xendoo is a clean, affordable, QuickBooks- and Xero-based bookkeeping service with fast monthly closes and a tidy app. For a small service business it's a solid pick. For an insurance restoration company, the same gap shows up that every generic service hits: no Xactimate reconciliation, no ACV/RCV staging, no supplement tracking, no TPA fee coding, no WIP. Here's the feature-by-feature breakdown.",
  },
  "1800accountant-vs-restoration-specialist": {
    title: "1-800Accountant vs. Restoration Specialist: Side by Side",
    categoryLabel: "Comparisons",
    excerpt:
      "1-800Accountant is one of the most affordable, accessible accounting services for small businesses in the country — bundled bookkeeping, tax, and advisory at a volume price, with a CPA on call. For a sole proprietor or small LLC it's a real value. For an insurance restoration company, the volume model and the restoration-specific accounting gap collide. Here's the side-by-side.",
  },
  "fire-your-bookkeeper-restoration": {
    title: "Should You Fire Your Bookkeeper? 7 Warning Signs in Restoration",
    categoryLabel: "Comparisons",
    excerpt:
      "Most restoration owners keep a bookkeeper too long — not because the work is good, but because switching feels like a hassle and the books \"look fine.\" The problem is that restoration books can look perfectly clean and still be missing the things that decide whether you're profitable. Here are the 7 warning signs that your bookkeeper isn't built for restoration — and what each one is quietly costing you.",
  },

  // ── Profitability & Growth ───────────────────────────────────────────────
  "how-restoration-companies-make-money-profit-levers": {
    title: "How Restoration Companies Actually Make Money: The 7 Profit Levers That Move the Needle",
    categoryLabel: "Profitability",
    excerpt:
      "Restoration companies maximize profit by pulling 7 specific levers — service-line mix, supplement capture, labor efficiency, overhead discipline, pricing, AR velocity, and customer mix. Average net margin is 14%; top-quartile shops hit 18–22%. This is the framework, the quantified impact of each lever, and the obstacle stopping most owners from pulling it.",
  },
  "hidden-profit-leaks-restoration-companies": {
    title: "The 10 Hidden Profit Leaks Costing Restoration Companies $50K–$500K Per Year",
    categoryLabel: "Profitability",
    excerpt:
      "Restoration companies typically lose $50,000–$500,000 a year to 10 hidden profit leaks: unbilled supplements, TPA fee misclassification, equipment-day gaps, unallocated overhead, pricing creep, unbilled emergency response, missed code upgrades, two-party check delays, misclassified labor, and missed depreciation. Here's the dollar impact of each, why it's invisible, and how to find it in your books.",
  },
  "why-restoration-companies-plateau-net-margin": {
    title: "Why Most Restoration Companies Plateau Below 15% Net Margin (And How to Break Through)",
    categoryLabel: "Profitability",
    excerpt:
      "The average restoration company runs 14% net margin and about 7% lose money outright, per the RIA Cost of Doing Business Report. Most hit a ceiling between 10–14%. Top-quartile operators reach 18–22%. The gap is explained by 5 structural problems — mix, visibility, discipline, scale, and people — and each has a specific breakthrough action.",
  },
  "restoration-pricing-audit": {
    title: "The Restoration Pricing Audit: How to Know If You're Leaving Money on Every Job",
    categoryLabel: "Profitability",
    excerpt:
      "Most restoration companies leave 8–12% on the table from a stale Xactimate price list alone — before counting unrecovered deductibles, unbilled code upgrades, and missing emergency-response premiums. This is The Restoration Pricing Audit Framework: a 7-point audit you can run on your own books in 90 minutes to find the money hiding in your pricing.",
  },
  "restoration-profitability-roadmap-by-stage": {
    title: "From Survival to Scale: The Profitability Roadmap for Restoration Companies at Every Revenue Stage",
    categoryLabel: "Profitability",
    excerpt:
      "A restoration company's dominant profit problem changes at every revenue stage — owner-as-production at startup, blended-margin blindness at $500K–$1.5M, overhead outrunning gross profit at $1.5M–$3M, owner-as-bottleneck at $3M–$5M, and unit-economics drift above $5M. This is The Restoration Profitability Roadmap: the problem and the opportunity at each stage from $0 to $10M+.",
  },

  // ── Standard Operating Procedures ────────────────────────────────────────
  "monthly-books-close-sop-restoration": {
    title: "The Monthly Books Close SOP for Restoration Companies (28 Steps)",
    categoryLabel: "Standard Operating Procedures",
    excerpt:
      "Step-by-step SOP for closing the books at a restoration company in 28 steps across 4 phases — bank recon, AR cleanup, job costing, and owner sign-off — every month by the 10th.",
  },
  "insurance-job-setup-sop-quickbooks": {
    title: "The Insurance Job Setup SOP in QuickBooks Online (From First Call to First Invoice)",
    categoryLabel: "Standard Operating Procedures",
    excerpt:
      "Step-by-step SOP for setting up an insurance restoration job in QuickBooks Online — 28 steps across 7 phases, from the first-call intake to the first ACV invoice.",
  },
  "supplement-filing-tracking-sop": {
    title: "The Supplement Filing & Tracking SOP (Xactimate → Carrier → QBO → Cash)",
    categoryLabel: "Standard Operating Procedures",
    excerpt:
      "Step-by-step SOP for filing and tracking restoration supplements across 24 steps — from trigger identification through Xactimate build, carrier submission, QBO recording, and cash collection.",
  },
  "13-week-cash-flow-forecast-sop": {
    title: "The 13-Week Cash Flow Forecast SOP for Restoration Companies",
    categoryLabel: "Standard Operating Procedures",
    excerpt:
      "Step-by-step SOP for building and maintaining a rolling 13-week cash flow forecast in a restoration company — 22 steps across 7 phases, with a 30-min Monday update cadence.",
  },
  "job-close-out-final-ar-sop": {
    title: "The Job Close-Out & Final AR SOP (How to Actually Close a Restoration Job in Your Books)",
    categoryLabel: "Standard Operating Procedures",
    excerpt:
      "Step-by-step SOP for closing a restoration job across all four states — 30 steps across 6 phases covering physical demob, final billing, collections, and books close-out.",
  },
  "water-mitigation-first-48-hours-sop": {
    title: "The Water Mitigation First-48-Hours SOP (IICRC S500-Compliant, Step by Step)",
    categoryLabel: "Standard Operating Procedures",
    excerpt:
      "Step-by-step SOP for the first 48 hours of an IICRC S500-compliant water mitigation job — 26 numbered steps across 5 hour-by-hour phases.",
  },
  "mold-remediation-containment-sop": {
    title: "The Mold Remediation Containment Setup SOP (IICRC S520-Compliant)",
    categoryLabel: "Standard Operating Procedures",
    excerpt:
      "Step-by-step SOP for building IICRC S520-compliant mold containment in 25 steps: classify Condition, size the AFD, set negative pressure, run decon.",
  },
  "fire-smoke-damage-assessment-pack-out-sop": {
    title: "The Fire & Smoke Damage Assessment & Pack-Out SOP",
    categoryLabel: "Standard Operating Procedures",
    excerpt:
      "Step-by-step SOP for fire and smoke loss work — a 24-step procedure covering scene assessment, smoke-type categorization, pack-out, structural soot removal, and deodorization.",
  },
  "crew-dispatch-on-call-rotation-sop": {
    title: "The Daily Crew Dispatch & On-Call Rotation SOP",
    categoryLabel: "Standard Operating Procedures",
    excerpt:
      "Step-by-step SOP for daily crew dispatch and on-call rotation in a restoration company — 22 steps across morning huddle, assignment logic, after-hours intake, and burnout prevention.",
  },
  "equipment-tracking-recovery-sop": {
    title: "The Equipment Tracking & Recovery SOP (Air Movers, Dehus, AFDs)",
    categoryLabel: "Standard Operating Procedures",
    excerpt:
      "Step-by-step SOP for tracking, deploying, recovering, and reconciling restoration drying equipment — 22 steps across 8 phases that stop equipment losses and billing leaks.",
  },

  // ── Industry & Strategy ──────────────────────────────────────────────────
  "should-you-stay-on-tpa-program-2026": {
    title: "Should You Stay on Your TPA Program in 2026? A Restoration Owner's Decision Framework",
    categoryLabel: "Industry & Strategy",
    excerpt:
      "TPA program work pays a 5–20% referral fee and caps your pricing — staying makes sense when volume justifies the fee and your scorecard keeps you in the top tier, and stops making sense when fee compression drops program gross margin below 50% or one TPA exceeds 40% of revenue. Here's the decision framework.",
  },
  "finding-keeping-restoration-techs-2026": {
    title: "How Restoration Companies Are Actually Finding and Keeping Good Techs in 2026",
    categoryLabel: "Industry & Strategy",
    excerpt:
      "With ~1.9M workers leaving construction and a structural labor shortage, restoration shops that retain techs in 2026 pay $18–$28/hr to start plus structured bonuses, invest ~14% of budget in IICRC training, and fix the on-call rotation that burns people out. Here's the 4-Tier Tech Compensation Model and what top-quartile shops do differently.",
  },
  "restoration-lead-engine-diversified-sources": {
    title: "How to Build a Restoration Lead Engine That Doesn't Depend on a Single Plumber",
    categoryLabel: "Industry & Strategy",
    excerpt:
      "The single-plumber dependency is the most common failure mode in restoration — one referral source dries up and a six-figure shop stalls overnight. The fix is a 6-channel lead engine: Local SEO, Google LSA/Ads, referral partnerships, insurance agents, TPA work as one channel not the channel, and direct retail brand. Here's how to build it.",
  },
  "adjuster-pushback-supplements-comp-bids-appraisal": {
    title: "When the Adjuster Pushes Back: A Restoration Owner's Guide to Supplements, Comp Bids, and Appraisal",
    categoryLabel: "Industry & Strategy",
    excerpt:
      "When an adjuster's scope is short, the answer is a documented supplement tied to IICRC S500 — not a 'comp bid' that hands the carrier a number to beat. Here's the escalation ladder: supplement, public adjuster, appraisal, walk away — and exactly when to use each.",
  },
  "aob-restoration-contractors-state-by-state-2026": {
    title: "The State of AOB in 2026: What Restoration Contractors Need to Know State by State",
    categoryLabel: "Industry & Strategy",
    excerpt:
      "Florida's 2019 HB 7065 and 2022 SB 2-A reforms effectively gutted AOB there, and other states are watching. Here's what Assignment of Benefits is, where it still works cleanly, where it's a liability magnet, and the alternative payment structures — direction to pay, lien rights, two-party check — that protect you regardless of your state.",
  },
  "pe-roll-up-wave-restoration-2026": {
    title: "The PE Roll-Up Wave: What's Happening, Who's Buying, and What It Means for Independent Restoration Owners",
    categoryLabel: "Industry & Strategy",
    excerpt:
      "Independent restoration owners are getting cold-called by PE-backed buyers monthly. Multiples run 4–7x EBITDA depending on size; buyers want clean books, EBITDA scale, geographic concentration, and recurring programs. Here's who's rolling up, what an offer process looks like, and when to engage versus stay independent.",
  },
  "ai-in-restoration-2026-reality-check": {
    title: "How AI Is Actually Being Used in Restoration in 2026 (And Where It Falls Flat)",
    categoryLabel: "Industry & Strategy",
    excerpt:
      "AI is meaningfully deployed in restoration in five places today — Xactimate estimate assistance, photo documentation analysis, lead intake routing, claim narrative drafting, and adjuster-communication sentiment analysis. It is NOT replacing field judgment, trauma customer service, or full scope-of-work generation. Here's the honest reality check.",
  },

  // ── Exit Planning & Valuation ────────────────────────────────────────────
  "selling-restoration-company-books-prep": {
    title: "Selling Your Restoration Company: What Your Books Need to Look Like 24 Months Before Exit",
    categoryLabel: "Exit Planning & Valuation",
    excerpt:
      "The owners who clear 6x EBITDA start preparing their books 24 months out, not at the LOI. Here is the month-by-month financial checklist that protects a half-turn to a turn and a half of multiple.",
  },
  "pe-buyer-restoration-due-diligence": {
    title: "What a PE Buyer Will Ask to See in Your Restoration Company Financials",
    categoryLabel: "Exit Planning & Valuation",
    excerpt:
      "The exact due-diligence checklist a PE-backed buyer requests — and why a Quality-of-Earnings analysis that finds problems can quietly cut your valuation by 0.5 to 2.0x EBITDA.",
  },
  "restoration-company-valuation-multiples": {
    title: "How Restoration Companies Are Valued: EBITDA Multiples, SDE, and What Really Moves the Number",
    categoryLabel: "Exit Planning & Valuation",
    excerpt:
      "Restoration companies sell on SDE at 2.3-3.5x or EBITDA at 4-8x. The same $3M-EBITDA business is worth $12M at 4x or $18M at 6x. Here is what moves it.",
  },
  "wip-schedule-restoration": {
    title: "What Is a WIP Schedule and Why Does Every Buyer Ask for One?",
    categoryLabel: "Exit Planning & Valuation",
    excerpt:
      "A WIP schedule reconciles three numbers buyers trust — contract value, earned revenue, and billed-to-date — and a clean one can defend 0.5–1.5x of EBITDA multiple at sale.",
  },
  "500k-mistake-restoration-sale": {
    title: "The $500K Mistake Restoration Owners Make When They Don't Clean Up Their Books Before Selling",
    categoryLabel: "Exit Planning & Valuation",
    excerpt:
      "Messy books cost 10–20% of enterprise value at sale. On a $3M-EBITDA company at 5x, that is $1.5M–$3M gone. Here is the math and the 24-month fix.",
  },
  "restoration-roll-up-landscape": {
    title: "Servpro, BluSky, ATI, BELFOR: What the Restoration Roll-Up Landscape Means for Owners",
    categoryLabel: "Exit Planning & Valuation",
    excerpt:
      "A field guide to who is buying restoration companies in 2026 — Servpro, BluSky, ATI, BELFOR and their PE backers — what they pay (4–8x EBITDA), and how to read an unsolicited offer.",
  },

  // ── Cash Flow & Working Capital ──────────────────────────────────────────
  "restoration-cash-flow-busy-but-broke": {
    title: "Why Restoration Companies Run Out of Cash During Their Most Profitable Months",
    categoryLabel: "Cash Flow & Working Capital",
    excerpt:
      "Your busiest month is your most dangerous month. Costs scale with volume now, but insurance AR lands 60–90 days later — here's the exact mechanics of the gap and how to see it coming.",
  },
  "13-week-cash-flow-restoration": {
    title: "How to Build a 13-Week Cash Flow Forecast for Your Restoration Company",
    categoryLabel: "Cash Flow & Working Capital",
    excerpt:
      "Build a rolling 13-week cash flow forecast for your restoration company in 8 steps — inflows by AR source, outflows by category, a minimum-cash line, and a 30-minute Monday update.",
  },
  "cat-season-survival-guide-restoration": {
    title: "CAT Season Survival Guide: How to Prepare Your Books for Storm Deployment",
    categoryLabel: "Cash Flow & Working Capital",
    excerpt:
      "A CAT deployment is 60–90 days of cash going out — travel, lodging, labor, equipment, fuel — before the first insurance dollar lands. Here's how to position cash, track AR, and survive the storm.",
  },
  "insurance-90-days-payroll-friday": {
    title: "Insurance Pays in 90 Days. Payroll Is Friday. Here's How to Manage the Gap.",
    categoryLabel: "Cash Flow & Working Capital",
    excerpt:
      "Insurance restoration AR runs 60–90 days while payroll is weekly. That 60-day structural gap is not a failing — it's the model. Here's the six-tool working-capital playbook and the order to reach for each.",
  },
  "banker-sba-loan-restoration": {
    title: "What Your Banker Wants to See Before Approving an SBA Loan for a Restoration Company",
    categoryLabel: "Cash Flow & Working Capital",
    excerpt:
      "Bankers underwrite restoration as a cash-flow risk: 60–90 day insurance AR against weekly payroll. Here is the exact package and the 1.25x DSCR threshold that earns a yes.",
  },
  "line-of-credit-restoration-company": {
    title: "How to Use a Business Line of Credit Correctly for a Restoration Company",
    categoryLabel: "Cash Flow & Working Capital",
    excerpt:
      "A line of credit sized at 10–20% of revenue bridges the 60–90 day insurance AR lag — if you draw against named receivables and revolve it to zero. Here is the playbook.",
  },
};
