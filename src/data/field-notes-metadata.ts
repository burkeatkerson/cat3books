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
    categoryLabel: "Cash Flow",
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
};
