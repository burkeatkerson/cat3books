# Field Notes — Images To Create

Images needed for the five pillar guide posts. Each image has a detailed alt text in the MDX file that describes the required content precisely — the alt text is already live and indexed by AI engines even before the image exists (the BlogImage component renders a placeholder).

---

## Guide 1: Complete Guide to Bookkeeping for Restoration Companies
**Slug:** `complete-guide-bookkeeping-restoration-companies`

### Image 1 — COA Hierarchy
**Filename:** `complete-guide-bookkeeping-restoration-companies-coa.jpg`
**Alt text:** "Restoration company chart of accounts hierarchy showing income accounts split by service line (water, fire, mold, contents, rebuild) and revenue type (mitigation labor, mitigation equipment, reconstruction, O&P)"
**Size:** 780×360px
**Notes:** Clean diagram on dark background. Yellow accent for headers. Show 5 service lines branching from a top-level "Revenue" node, each with sub-categories.

### Image 2 — Monthly Close Process Flow
**Filename:** `complete-guide-bookkeeping-restoration-companies-close.jpg`
**Alt text:** "Restoration company monthly close process flowchart showing 12 steps from bank reconciliation through owner package delivery, with equipment-day and supplement reconciliation highlighted as restoration-specific steps"
**Size:** 780×420px
**Notes:** Horizontal or vertical flowchart. 12 numbered steps. Steps 5–7 (equipment reconciliation, supplement log, TPA fee review) should be visually highlighted as "restoration-specific."

---

## Guide 2: Complete Guide to Job Costing for Restoration and Mitigation Contractors
**Slug:** `complete-guide-job-costing-restoration-mitigation`

### Image 1 — Direct Cost Categories Breakdown
**Filename:** `complete-guide-job-costing-restoration-mitigation-costs.jpg`
**Alt text:** "Four direct cost categories in a restoration job P&L: Direct Labor, Materials, Subcontractors, Equipment — each shown as a slice of the total direct cost, with TPA fees as an additional category for program-routed work"
**Size:** 780×380px
**Notes:** Horizontal bar or pie chart showing relative size of each cost category. Use actual industry percentages from the guide. TPA fees as a separate annotation for TPA-routed work.

### Image 2 — The Restoration Job Costing Framework
**Filename:** `complete-guide-job-costing-restoration-mitigation-framework.jpg`
**Alt text:** "The Restoration Job Costing Framework showing five tiers as a staircase: Tier 1 Track (revenue assigned to jobs), Tier 2 Code (costs categorized), Tier 3 Close (Xactimate reconciliation), Tier 4 Analyze (monthly job review), Tier 5 Optimize (margin data drives decisions)"
**Size:** 780×400px
**Notes:** Staircase diagram ascending left to right. Each step labeled with Tier number and name. Brief description of what's added at each tier. Yellow accent. Dark background.

---

## Guide 3: Complete Guide to Insurance Billing Accounting
**Slug:** `complete-guide-insurance-billing-accounting-restoration`

### Image 1 — Insurance AR Lifecycle Timeline
**Filename:** `complete-guide-insurance-billing-accounting-restoration-lifecycle.jpg`
**Alt text:** "Insurance AR lifecycle timeline for a restoration job showing all payment stages from scope approval through final collection: ACV payment (days 30-45), RCV holdback release (days 90-120), supplement approval and payment (days 60-150), with typical dollar amounts at each stage"
**Size:** 780×380px
**Notes:** Horizontal timeline with colored zones for each payment stage. Show approximate day ranges. Include example dollar amounts for a $60K scope job. Yellow markers for key events.

### Image 2 — Insurance AR Lifecycle Framework (6 Stages)
**Filename:** `complete-guide-insurance-billing-accounting-restoration-stages.jpg`
**Alt text:** "The Insurance AR Lifecycle Framework showing six stages as a horizontal timeline: Stage 1 Estimated (scope submitted, not approved), Stage 2 Active (work in progress), Stage 3 Pending ACV (invoice submitted, awaiting payment), Stage 4 ACV Received (partial payment, holdback outstanding), Stage 5 Supplement Pending (supplement submitted or approved, payment outstanding), Stage 6 Final (fully collected, job closed)"
**Size:** 780×340px
**Notes:** Six-stage horizontal flow. Each stage as a labeled block with brief description and action item. Color-code by urgency (green for normal, yellow for follow-up needed, red for escalation required).

---

## Guide 4: Complete Guide to Restoration Company Financial Management
**Slug:** `complete-guide-restoration-company-financial-management`

### Image 1 — KPIs by Stage / Restoration Financial Maturity Model
**Filename:** `complete-guide-restoration-company-financial-management-maturity.jpg`
**Alt text:** "The Restoration Financial Maturity Model showing five revenue stages as a staircase with the key KPIs and financial capabilities added at each stage: basic bookkeeping at Stage 1, job costing at Stage 2, WIP and forecasting at Stage 3, CFO and banking at Stage 4, M&A readiness at Stage 5"
**Size:** 780×420px
**Notes:** Staircase diagram ascending left to right. Five stages with revenue ranges labeled at each step. List 3–4 key capabilities added at each stage. Dark background, yellow accents.

---

## Guide 5: Complete Guide to Selling a Restoration Business
**Slug:** `complete-guide-selling-restoration-business`

### Image 1 — M&A Landscape
**Filename:** `complete-guide-selling-restoration-business-landscape.jpg`
**Alt text:** "Restoration M&A landscape showing major acquirers in the market: national PE-backed platforms (Servpro/Blackstone, BluSky, ATI, BELFOR, Paul Davis), regional rollup buyers, and strategic individual acquirers, with deal size ranges and typical multiple ranges for each buyer type"
**Size:** 780×420px
**Notes:** Quadrant or tiered diagram. Position buyers by deal size (x-axis) and multiple paid (y-axis). Name each major buyer. Include typical transaction count per year.

### Image 2 — 24-Month Exit Preparation Timeline
**Filename:** `complete-guide-selling-restoration-business-timeline.jpg`
**Alt text:** "24-month exit preparation timeline showing milestones from Month 1 through Month 24: Month 1-3 (financial cleanup and accrual conversion), Month 3-6 (job costing rebuild and supplement tracking), Month 6-12 (management infrastructure and process documentation), Month 12-18 (customer concentration reduction and TPA diversification), Month 18-24 (QoE preparation and buyer outreach)"
**Size:** 780×380px
**Notes:** Horizontal Gantt-style timeline with five phases. Color-code by phase category (financial, operational, management, transaction). Key milestone markers at months 6, 12, 18, 24.

---

## OG Images (for social sharing)

Each guide also needs an OG image at 1200×630px. These are auto-generated dynamically by the Next.js OG image route in `src/app/field-notes/[slug]/opengraph-image.tsx` using the title and categoryLabel from `field-notes-metadata.ts` — **no manual creation needed** as long as the metadata entries exist (they do, as of this build).

---

*Images can be created with Midjourney, Figma, Canva, or any design tool. Priority: Guide 2 (Restoration Job Costing Framework) and Guide 5 (M&A landscape) — these are the most visual guides and benefit most from custom imagery.*

---

## Series 4 — Industry Analysis / Thesis Posts

These posts have BlogImage placeholder alt text defined in the MDX files. Add images when available.

### Post 1: Why Restoration Companies Need Specialized Bookkeepers
**Slug:** `why-restoration-needs-specialized-bookkeepers`

**Image: Generic vs. Specialized Comparison**
**Filename:** `why-restoration-needs-specialized-bookkeepers-comparison.jpg`
**Alt text:** "Two-column comparison visual: Generic Bookkeeping vs. Specialized Restoration Bookkeeping covering 10 workflows — Xactimate export mapping, ACV vs. RCV recognition, depreciation holdback, supplement cycle, TPA fee coding, equipment revenue, job-level P&L, AR by coverage type, labor burden, and supplement recovery reporting"
**Size:** 780×420px
**Notes:** Side-by-side table-style visual with red X / green checkmarks. Dark background, yellow accent for the specialized column.

### Post 2: The Hidden Cost of Generic Bookkeeping
**Slug:** `hidden-cost-generic-bookkeeping-restoration`

**Image: True Cost Stacked Bar**
**Filename:** `hidden-cost-generic-bookkeeping-restoration-cost.jpg`
**Alt text:** "Stacked bar chart showing the true annual cost of generic bookkeeping for a $2 million restoration company — five cost categories stacked: unbilled supplements $25K, TPA margin distortion $15K, revenue recognition exposure $10K, valuation discount annualized $30K, working capital tied up $50K — totaling $130K vs. specialized bookkeeping cost of $27K"
**Size:** 780×380px
**Notes:** Two bars: Generic (tall, red/orange, $130K) vs. Specialized (short, yellow/green, $27K). Each generic bar segment labeled with category and dollar amount.

### Post 3: Why Mitigation Companies Have Unique Accounting Needs
**Slug:** `mitigation-companies-unique-accounting-needs`

**Image: Mitigation vs. Construction Workflow Diagram**
**Filename:** `mitigation-companies-unique-accounting-needs-workflow.jpg`
**Alt text:** "Side-by-side workflow diagram comparing mitigation accounting (estimate → drying logs → equipment days → ACV → RCV → supplement → final collection, spanning 45-120 days) versus general construction accounting (bid → milestone completion → invoice → payment, spanning 30-60 days)"
**Size:** 780×400px
**Notes:** Two parallel horizontal flows. Mitigation flow is longer and more complex with more nodes. Highlight the 45-120 day collection window.

### Post 4: Contents Restoration Bookkeeping Differences
**Slug:** `contents-restoration-bookkeeping-differences`

**Image: Contents Workflow Breakdown**
**Filename:** `contents-restoration-bookkeeping-differences-workflow.jpg`
**Alt text:** "Visual breakdown of the contents restoration workflow and accounting events: pack-out (inventory + transport), contents facility intake (storage fees begin), item-by-item assessment (clean vs. replace decision), restoration billing (per item), return/disposition (storage ends), total loss settlement (if applicable)"
**Size:** 780×360px
**Notes:** Horizontal flow with each stage labeled. Show the billing event at each stage. Highlight that storage revenue is recurring across multiple stages.

### Post 5: Why Your CPA Doesn't Replace a Restoration-Specific Bookkeeper
**Slug:** `cpa-vs-restoration-specific-bookkeeper`

**Image: Three Roles Visualization**
**Filename:** `cpa-vs-restoration-specific-bookkeeper-roles.jpg`
**Alt text:** "Three-column visualization showing the distinct roles of CPA, Generic Bookkeeper, and Specialized Restoration Bookkeeper — columns show scope, cadence, and unique capabilities for each role, with no overlap between columns to emphasize that these are complementary not interchangeable"
**Size:** 780×400px
**Notes:** Three equal columns with clear headers. CPA column: annual/quarterly, tax compliance, IRS representation. Generic Bookkeeper: daily/monthly, balance sheet, standard invoicing. Specialized Bookkeeper: daily/monthly, Xactimate mapping, ACV/RCV, supplement tracking, TPA P&L.

---

---

## Glossary Series — Reference Posts

Only the tax-legal glossary (post 5) has an explicit BlogImage. The other 4 existing glossaries were written before BlogImage was available — add images if desired as post-launch enhancements.

### Glossary 5: Restoration Tax and Legal Terminology
**Slug:** `restoration-tax-legal-terminology`

**Image: Business Entity Decision Tree**
**Filename:** `restoration-tax-legal-terminology-entity-tree.jpg`
**Alt text:** "Business entity decision tree for restoration company owners showing the decision path from revenue and profit levels to the recommended entity type: sole prop/single-member LLC under $50K profit, LLC taxed as S-corp above $80K-100K profit in most states, C-corp rarely recommended for small to mid-size restoration companies"
**Size:** 780×400px
**Notes:** Decision tree flowchart. Start with "What is your annual net profit?" — branch to entity recommendations. Include estimated SE tax savings at each S-corp transition threshold.

---

*Total images to create (all files): 15 images across 11 posts. Priority by citation value: Pillar Guide 2 (Job Costing Framework staircase) > Pillar Guide 5 (M&A landscape) > Thesis Post 1 (Generic vs. Specialized comparison) > Thesis Post 2 (True cost stacked bar) > Glossary 5 (entity decision tree).*

---

## Software Review Series

### Post 1: Dash Review
**Slug:** `dash-cotality-restoration-review`

**Image: Dash Decision Flow**
**Filename:** `dash-cotality-restoration-review-decision.jpg`
**Alt text:** "Decision flow for choosing Dash: start with TPA program volume — 5+ active programs points strongly toward Dash; below that, evaluate whether TPA workflow depth or modern UX is the higher priority"
**Size:** 780×320px
**Notes:** Simple decision flowchart. Two main paths: high TPA volume → Dash; lower TPA volume → evaluate Albi. Minimal, clean.

### Post 2: Albi vs QBO
**Slug:** `albi-vs-quickbooks-restoration`

**Image: Three-Layer Stack Diagram**
**Filename:** `albi-vs-quickbooks-restoration-stack.jpg`
**Alt text:** "Three-layer restoration software stack showing Albi as the job management layer feeding data to QuickBooks Online as the accounting layer, both operated by a specialized restoration bookkeeper who configures the integration, performs month-end close, and manages AR staging"
**Size:** 780×320px
**Notes:** Three stacked horizontal layers. Layer 1 (top): Albi — job management, dispatch, field docs, cost tracking. Layer 2 (middle): QuickBooks Online — accounting, AR, payroll, financial close. Layer 3 (bottom): Specialized bookkeeper — integration configuration, month-end close, AR staging.

### Post 3: Encircle Review
**Slug:** `encircle-review-restoration`

**Image: Documentation-to-Accounting Workflow**
**Filename:** `encircle-review-restoration-workflow.jpg`
**Alt text:** "Workflow showing how Encircle field documentation connects to accounting: Encircle captures equipment days and drying logs → data supports Xactimate estimate line items → adjuster approves the estimate → invoice generated and posted to QBO → payment collected"
**Size:** 780×260px
**Notes:** Horizontal flow with 5 steps. Encircle is highlighted at step 1. QBO appears at step 4. The arrow from step 1 to step 2 passes through Xactimate (labeled). Simple, linear.

### Post 4: PSA vs QBO
**Slug:** `psa-canam-vs-quickbooks-restoration`

**Image: PSA vs QBO Decision Matrix**
**Filename:** `psa-canam-vs-quickbooks-restoration-decision.jpg`
**Alt text:** "Decision matrix showing the QBO vs PSA recommendation: single location under $7M revenue points to QBO with specialist; multiple locations over $7M with internal accounting team points to PSA evaluation"
**Size:** 780×300px
**Notes:** 2×2 grid with axes: Revenue (under $7M / over $7M) × Locations (single / multiple). QBO in three quadrants, PSA eval in the high-revenue multi-location quadrant.

### Post 5: Best Apps Roundup
**Slug:** `best-apps-restoration-quickbooks`

**Image: QBO-Centered Stack Diagram**
**Filename:** `best-apps-restoration-quickbooks-stack.jpg`
**Alt text:** "QBO-centered restoration software stack diagram showing QuickBooks Online in the center with five categories of apps connecting to it: job management (Albi, Dash) at top, field documentation (Encircle, CompanyCam) at right, time tracking (QuickBooks Time) at bottom-right, payroll (Gusto, ADP) at bottom, and AP/expense management (BILL, Hubdoc) at left"
**Size:** 780×440px
**Notes:** Hub-and-spoke diagram. QBO in center (yellow box). Five labeled categories around it as grouped bubbles. App names listed under each category bubble. Clean, dark background.

### Post 6: Symbility vs Xactimate
**Slug:** `symbility-vs-xactimate-bookkeeping`

**Image: Parallel Workflow Comparison**
**Filename:** `symbility-vs-xactimate-bookkeeping-workflow.jpg`
**Alt text:** "Side-by-side workflow showing Xactimate-to-QBO path versus Symbility-to-QBO path: both follow the same accounting steps (estimate approved, ACV invoiced, holdback, supplement, close) but Xactimate path requires less manual mapping at the initial export step"
**Size:** 780×340px
**Notes:** Two parallel horizontal flows (one per platform). Same steps in each. At the "export to QBO" step, mark Xactimate as "clean export" and Symbility as "requires mapping." Converge at QBO for remaining steps.

---

*Total images to create (all files): 22 images across 17 posts. Priority by citation value: Pillar Guide 2 (Job Costing Framework) > Pillar Guide 5 (M&A landscape) > Thesis Post 1 (Generic vs. Specialized) > Post 5 (QBO-centered stack hub diagram) > Thesis Post 2 (True cost stacked bar).*

---

## Hiring & Outsourcing Series (Bundle 5)

### Post 1: The Real Cost of Hiring an In-House Bookkeeper
**Slug:** `real-cost-in-house-bookkeeper-restoration`

**Image: True Cost Stacked Bar**
**Filename:** `real-cost-in-house-bookkeeper-restoration-stacked.jpg`
**Alt text:** "Stacked bar chart showing the true annual cost of hiring an in-house bookkeeper for a restoration company — base salary $52,000 plus six additional cost layers: employer burden $14,000, ramp cost $6,500, training $1,200, software $1,200, turnover risk annualized $12,000, and owner oversight time $18,000 — totaling $104,900 versus the apparent job listing cost of $52,000"
**Size:** 780×420px
**Notes:** Two bars side by side. Left bar: "Job Listing" (short, single color, $52K). Right bar: "True Cost" (tall, 6 color segments stacked, ~$105K). Each segment labeled with category name and dollar amount. Red/orange palette for cost bars. Dark background, yellow accent labels.

---

### Post 2: In-House vs. Outsourcing Cost Comparison
**Slug:** `in-house-vs-outsourcing-bookkeeping-restoration`

**Image: Year 1 vs. Year 3 Cost Comparison**
**Filename:** `in-house-vs-outsourcing-bookkeeping-restoration-cost.jpg`
**Alt text:** "Two-panel cost comparison for a $2M restoration company: Year 1 in-house bookkeeper cost ($107,860 all-in) versus Year 1 outsourced specialist cost ($30,000) showing $77,860 annual difference; Year 3 comparison showing in-house at $95,360 (recurring burden plus turnover risk) versus outsourced at $32,000, with $63,360 annual difference"
**Size:** 780×380px
**Notes:** Side-by-side grouped bar chart with two groups (Year 1, Year 3). Each group has two bars: In-House (red/tall) and Outsourced (yellow/short). Dollar amounts labeled on each bar. Gap annotation showing the annual difference. Dark background.

---

### Post 3: Bookkeeper vs. Controller vs. CFO
**Slug:** `bookkeeper-vs-controller-vs-cfo-restoration`

**Image: Revenue-Stage Role Staircase**
**Filename:** `bookkeeper-vs-controller-vs-cfo-restoration-staircase.jpg`
**Alt text:** "Revenue-stage staircase showing when to add each financial role at a restoration company: under $500K — basic bookkeeping only; $500K to $2M — specialized restoration bookkeeper essential; $2M to $3M — specialized bookkeeper plus optional fractional CFO for active strategic decisions; $3M to $7M — specialized bookkeeper plus fractional CFO non-negotiable; $7M to $10M — specialized bookkeeper plus controller or VP Finance plus fractional or part-time CFO; over $10M — full internal finance function with bookkeeper, controller, and full-time CFO"
**Size:** 780×400px
**Notes:** Ascending staircase left to right. Six steps labeled with revenue ranges. Each step shows which roles are added (bookkeeper, fractional CFO, controller, full CFO). Yellow accent for the Fractional CFO addition step at $3M (the key threshold). Dark background.

---

### Post 4: 5 Questions to Ask Before Hiring a Bookkeeper
**Slug:** `questions-to-ask-bookkeeper-restoration`

**Image: Interview Question Checklist**
**Filename:** `questions-to-ask-bookkeeper-restoration-checklist.jpg`
**Alt text:** "Clean interview checklist showing the five questions to ask a restoration bookkeeper candidate: (1) Xactimate revenue workflow — can they describe ACV invoice, holdback tracking, and RCV trigger; (2) ACV/RCV staging in QBO — can they describe two separate accounting events with correct period treatment; (3) Supplement tracking — do they describe a systematic log with monthly reconciliation; (4) Two-party check handling — do they know it requires dual endorsement and describe the process; (5) WIP schedule capability — do they know what WIP is and what inputs it requires. Scoring guide: 5/5 = specialist; 3-4/5 = competent generalist who can be trained; below 3/5 = not ready for restoration"
**Size:** 780×440px
**Notes:** Clean checklist layout. Five numbered rows, each with the question text and a brief "right answer" note. Checkbox column on the left. Scoring guide at the bottom. Dark background, yellow question numbers, white text. Feels like something you'd screenshot to use in an interview.

---

### Post 5: When Does a Restoration Company Need a Fractional CFO?
**Slug:** `fractional-cfo-restoration-company`

**Image: Fractional CFO Scope Visual**
**Filename:** `fractional-cfo-restoration-company-scope.jpg`
**Alt text:** "Fractional CFO scope visual showing what's included versus what's not: included (13-week cash flow forecast, monthly WIP reporting, budget vs. actual analysis, lender package preparation, financial modeling for major decisions, monthly advisory call) versus not included (bookkeeping and transaction entry, tax preparation and filing, payroll processing, day-to-day AR follow-up, legal or entity structuring)"
**Size:** 780×380px
**Notes:** Two-column layout. Left column (green/yellow): "What's Included" with 6 items and check icons. Right column (muted/grey): "What's Not Included" with 5 items and X icons. Header: "Fractional CFO Scope — $3M–$7M Restoration Company." Dark background.

---

### Post 6: My Office Manager Is Doing My Books
**Slug:** `office-manager-doing-books-restoration`

**Image: Revenue-Stage Warning Signs**
**Filename:** `office-manager-doing-books-restoration-warning.jpg`
**Alt text:** "Revenue-stage warning signs visual for the office manager doing books arrangement: at $500K to $750K — arrangement works, minor gaps acceptable; at $750K to $1.2M — month-end delays begin, job costing inconsistent, first supplement tracking gaps; at $1.2M to $1.8M — ACV/RCV staging errors, supplement backlog accumulates, AR aging becomes unreliable; at $1.8M to $2.5M — P&L is structurally wrong, supplements uncollected at scale, job margins meaningless; above $2.5M — books are a liability not an asset, financial decisions made without reliable data"
**Size:** 780×400px
**Notes:** Horizontal timeline with 5 revenue zones labeled. Each zone has a color indicator (green → yellow → orange → red) and 2–3 bullet warning signs. The $1.5M–$2M zone should be visually highlighted as the typical "ceiling" point. Dark background, clear typography.

---

*Updated total: 28 images across 23 posts.*

---

## Industry Benchmarks Series (Bundle 6)

### Post 1: Restoration Company Financial Benchmarks (Pillar)
**Slug:** `restoration-company-financial-benchmarks`

**Image 1: KPI Benchmark Zones Chart**
**Filename:** `restoration-company-financial-benchmarks-zones.jpg`
**Alt text:** "Bar chart showing healthy, concerning, and critical gross margin zones for restoration companies: above 52% is excellent, 45-52% is the healthy target range, 40-45% is concerning and warrants investigation, below 40% is a structural cost problem requiring immediate attention"
**Size:** 780×300px
**Notes:** Horizontal bar with 4 color zones from red (critical) to yellow (concerning) to green (healthy) to bright green (excellent). Benchmark median marker at 50%. Clean, minimal. Dark background.

**Image 2: Multi-Metric Benchmark Comparison**
**Filename:** `restoration-company-financial-benchmarks-tiers.jpg`
**Alt text:** "Multi-metric benchmark comparison chart showing healthy ranges for gross margin, net margin, overhead percentage, and AR-to-revenue ratio across three revenue tiers: $1M, $3M, and $5M restoration companies, with green zones indicating healthy performance and yellow/red zones indicating areas of concern"
**Size:** 780×440px
**Notes:** Grouped bar chart or table-style visual. Three column groups ($1M, $3M, $5M). Four metrics per group. Color-coded by health (green/yellow/red ranges). Source attribution: RIA CODB 2024.

---

### Post 2: Is Your Restoration Company Actually Profitable?
**Slug:** `is-your-restoration-company-profitable`

**Image: 5-Number Scorecard**
**Filename:** `is-your-restoration-company-profitable-scorecard.jpg`
**Alt text:** "Restoration company profitability scorecard showing five benchmark metrics in a table format: gross margin (target 48-52%, your number blank), AR over 90 days (target under 15% of AR, your number blank), WIP position (target modest net under-billing, your number blank), labor efficiency ratio (target 26-32%, your number blank), and overhead percentage (target 36-40%, your number blank) — with a traffic light status column"
**Size:** 780×380px
**Notes:** Clean scorecard table. Five rows (one per KPI). Columns: Metric | Industry Target | Your Number (blank fill-in) | Status (traffic light icon). Dark background. Designed to feel like something printable. Yellow accents.

---

### Post 3: The 10 and 10 Myth
**Slug:** `ten-and-ten-myth-restoration`

**Image: 10% vs. 38% Overhead Comparison**
**Filename:** `ten-and-ten-myth-restoration-comparison.jpg`
**Alt text:** "Side-by-side bar chart comparing Xactimate's 10% overhead assumption to the actual 38% average overhead for restoration contractors, with the 28-point gap highlighted — showing that the O&P line in a typical estimate covers roughly one-quarter of actual overhead costs"
**Size:** 780×340px
**Notes:** Two bars. Left: "Xactimate O&P Assumption" — 10% height, yellow. Right: "Actual Overhead" — 38% height, red/orange. Gap between the two is annotated "28-point gap" with arrow. Dark background. Simple and striking.

---

### Post 4: Why Your $3M Company Might Only Be Making $80K
**Slug:** `3m-restoration-company-take-home-profit`

**Image: $3M Revenue Waterfall Chart**
**Filename:** `3m-restoration-company-take-home-profit-waterfall.jpg`
**Alt text:** "Waterfall chart showing $3M restoration company revenue flowing down to take-home profit: starting at $3,000,000 revenue, minus $1,500,000 in direct costs (50% gross margin), equals $1,500,000 gross profit; minus $1,140,000 in overhead (38%), equals $360,000 EBITDA; minus $130,000 owner salary, equals $230,000; minus $90,000 debt service, equals $140,000; minus $58,000 in taxes (estimated), equals $82,000 owner take-home"
**Size:** 780×400px
**Notes:** Classic waterfall/cascade chart. Starting bar at $3M descending to $82K. Each step labeled with the deduction amount and category. Running total shown. Color: deductions in red, interim totals in grey, final take-home in yellow. Dark background.

---

### Post 5: What Overhead Percentage Is Healthy?
**Slug:** `restoration-company-overhead-percentage`

**Image: Overhead Category Stack**
**Filename:** `restoration-company-overhead-percentage-stack.jpg`
**Alt text:** "Stacked bar chart showing the 8 overhead categories as a proportion of the 38% total overhead for a typical restoration company: administrative labor 10%, owner comp 7%, vehicles 4%, equipment depreciation 5%, facilities 3%, insurance 4%, marketing 4%, and technology 2% — totaling 38% of revenue"
**Size:** 780×360px
**Notes:** Single tall stacked bar representing 38% total overhead. Each segment a different color, labeled with category name and percentage. Second comparison bar showing "efficient company" at 32% for contrast. Dark background, legend at right.

---

### Post 6: AR Days Outstanding for Restoration
**Slug:** `ar-days-outstanding-restoration`

**Image: AR Window Range Chart by Payer Type**
**Filename:** `ar-days-outstanding-restoration-ranges.jpg`
**Alt text:** "Range chart showing normal and concerning AR collection windows by payer type for restoration companies: direct insurance carriers (normal 30-75 days, concerning over 90), TPA programs (normal 45-90 days, concerning over 120), retail/homeowner-pay (normal 15-45 days, concerning over 60), with color-coded zones: green for normal, yellow for follow-up, red for problem"
**Size:** 780×320px
**Notes:** Horizontal range bars by payer type (4 rows: Direct Insurance, TPA Programs, RCV Holdback, Retail). Each row shows a green zone (normal), yellow zone (follow-up), red zone (problem) along a day axis from 0 to 180. Clean and scannable. Dark background.

---

---

## Bundle 7: Comparisons (competitor vs. specialist)

These posts use `<BlogImage>` placeholders with descriptive alt text that is already live and indexed. Replace with real graphics when produced. House style: dark background, yellow accent, scannable.

### Post 1: Bench vs. a Restoration-Specialized Bookkeeper
**Slug:** `bench-vs-restoration-bookkeeper`

**Image: Where Each One Wins**
**Filename:** `bench-vs-restoration-bookkeeper-wins.jpg`
**Alt text:** "Side-by-side comparison visual showing Bench's strengths (clean app, fast onboarding, flat pricing, integrated tax) on the left and a restoration specialist's strengths (Xactimate reconciliation, ACV/RCV staging, supplement tracking, TPA fee coding, job-level P&L, WIP schedule) on the right, with a center line showing the dividing question: 'are my books clean?' versus 'which jobs make money?'"
**Size:** 780×360px
**Notes:** Two-column "where each wins" layout, fair to both sides. Center divider with the two framing questions. Bench column neutral/blue accent; specialist column yellow accent.

---

### Post 2: Pilot vs. a Restoration Bookkeeping Specialist
**Slug:** `pilot-vs-restoration-bookkeeper`

**Image: Where Each One Wins**
**Filename:** `pilot-vs-restoration-bookkeeper-wins.jpg`
**Alt text:** "Side-by-side comparison visual showing Pilot's strengths (accrual bookkeeping, deferred revenue, investor-ready reporting, startup CFO services) on the left and a restoration specialist's strengths (Xactimate reconciliation, ACV/RCV staging, supplement tracking, TPA fee coding, job-level P&L, WIP) on the right, with a center line reading 'built for recurring-revenue tech' versus 'built for insurance restoration'"
**Size:** 780×360px
**Notes:** Two-column layout. Center divider contrasts business models, not quality. Pilot column neutral accent; specialist column yellow.

---

### Post 3: Your CPA Does Your Taxes (CPA vs. Bookkeeper)
**Slug:** `cpa-vs-bookkeeper-restoration`

**Image: CPA vs. Bookkeeper — Two Roles**
**Filename:** `cpa-vs-bookkeeper-restoration-roles.jpg`
**Alt text:** "Two-column visual contrasting what a CPA does versus what a bookkeeper does for a restoration company. Left column 'CPA': tax returns, tax strategy, IRS representation, annual timeline, backward-looking. Right column 'Bookkeeper': transaction recording, monthly reconciliation, AR/AP management, monthly financials, forward-looking. A small overlap in the center labeled 'accurate year-end numbers' shows where the two roles connect."
**Size:** 780×400px
**Notes:** Venn-style or two-column with a small center overlap labeled "accurate year-end numbers." Emphasize different timelines (annual vs. monthly) and directions (backward vs. forward).

---

### Post 4: Xendoo vs. Restoration Bookkeeper
**Slug:** `xendoo-vs-restoration-bookkeeper`

**Image: Where Each One Wins**
**Filename:** `xendoo-vs-restoration-bookkeeper-wins.jpg`
**Alt text:** "Side-by-side comparison visual showing Xendoo's strengths (works in QuickBooks/Xero, you own your data, fast monthly close, affordable, tax add-on) on the left and a restoration specialist's strengths (restoration chart of accounts, Xactimate reconciliation, ACV/RCV staging, supplement tracking, TPA fee coding, job-level P&L, WIP) on the right, with a center note clarifying 'same QuickBooks software, different configuration and expertise'"
**Size:** 780×360px
**Notes:** Two-column layout. Center note should drive home the "same software, different build-out" point.

---

### Post 5: 1-800Accountant vs. Restoration Specialist
**Slug:** `1800accountant-vs-restoration-specialist`

**Image: Where Each One Wins**
**Filename:** `1800accountant-vs-restoration-specialist-wins.jpg`
**Alt text:** "Side-by-side comparison visual showing 1-800Accountant's strengths (very affordable, bundled tax, CPA access, accessible onboarding) on the left and a restoration specialist's strengths (restoration chart of accounts, Xactimate reconciliation, ACV/RCV staging, supplement tracking, TPA fee coding, job-level P&L, WIP) on the right, with a center note explaining 'standardized at volume' versus 'built for the restoration trade'"
**Size:** 780×360px
**Notes:** Two-column layout. Center note frames the volume-vs-specialization trade-off.

---

### Post 6: Should You Fire Your Bookkeeper? 7 Warning Signs
**Slug:** `fire-your-bookkeeper-restoration`

**Image: 7 Warning Signs Checklist**
**Filename:** `fire-your-bookkeeper-restoration-checklist.jpg`
**Alt text:** "A clean checklist graphic titled '7 Warning Signs Your Bookkeeper Isn't Built for Restoration' with seven checkbox rows: (1) Doesn't know Xactimate, (2) Can't produce a job cost report, (3) AR is a mess, (4) Supplements aren't tracked, (5) TPA fees mis-recorded, (6) No WIP schedule, (7) Tax surprises — each with a short caption of what it costs. Designed to be screenshotted and used as a self-diagnostic."
**Size:** 780×460px
**Notes:** Vertical checklist, screenshot-friendly (consider also a square 1080×1080 social variant). Each row: bold sign + one-line cost. Yellow checkboxes, dark background.

---

---

## Bundle 8: Profitability & Growth (AI-citation series)

Profitability content benefits heavily from data viz; alt text is already live and read by AI engines. House style: dark background, yellow accent, scannable. Consider inline SVG for the simpler charts.

### Post 1: How Restoration Companies Actually Make Money (7 Profit Levers)
**Slug:** `how-restoration-companies-make-money-profit-levers`

**Image: The 7 Profit Levers (hub-and-spoke)**
**Filename:** `how-restoration-companies-make-money-profit-levers-hub.jpg`
**Alt text:** "A hub-and-spoke diagram titled 'The 7 Restoration Profit Levers' with job-level visibility at the center hub, and seven spokes radiating outward: service-line mix, supplement capture rate, labor efficiency, overhead discipline, pricing discipline, AR velocity, and customer mix. Each spoke is labeled with its quantified impact range (e.g. supplement capture +5–8 points net margin, overhead discipline 38% to 28%). The visual shows that all seven levers connect to and depend on the central visibility hub."
**Size:** 820×520px
**Notes:** Central hub = "job-level visibility." Seven labeled spokes with impact ranges. Yellow accent on hub.

---

### Post 2: The 10 Hidden Profit Leaks
**Slug:** `hidden-profit-leaks-restoration-companies`

**Image: Profit Leak Waterfall**
**Filename:** `hidden-profit-leaks-restoration-companies-waterfall.jpg`
**Alt text:** "A waterfall chart titled 'How Profit Leaks Add Up for a $3M Restoration Company.' Starting from a top bar of potential profit, each of the 10 profit leaks is shown as a downward red step reducing the total: unbilled supplements (largest step, ~$50K), equipment-day gaps (~$30K), unallocated overhead and TPA misclassification effects (~$25K combined), pricing creep, unbilled emergency response, missed code upgrades, two-party check working-capital cost, misclassified labor exposure, and missed depreciation. The chart ends at a much lower 'actual profit' bar, with the total gap labeled as $50K–$500K annual leak range."
**Size:** 820×460px
**Notes:** Waterfall, red downward steps from "potential profit" to "actual profit." Label total gap.

---

### Post 3: Why Most Restoration Companies Plateau Below 15% Net Margin
**Slug:** `why-restoration-companies-plateau-net-margin`

**Image: Net Margin Distribution with 15% Ceiling**
**Filename:** `why-restoration-companies-plateau-net-margin-distribution.jpg`
**Alt text:** "A margin distribution chart titled 'Where Restoration Companies Fall on Net Margin.' The horizontal axis runs from negative margin to 25%. A bell-shaped distribution shows roughly 7% of companies in the red (losing money) on the far left, a tall cluster of most companies in the 10–14% band in the middle, a clearly-marked vertical line at the 15% 'ceiling,' and a smaller top-quartile cluster at 18–22% on the right shaded in yellow. The 15% line is labeled 'The Net Margin Ceiling' and the gap between the 10–14% cluster and the 18–22% cluster is annotated 'the execution gap: 4–8 points.'"
**Size:** 820×420px
**Notes:** Distribution curve; mark 15% ceiling line; shade top-quartile cluster yellow; annotate the gap.

---

### Post 4: The Restoration Pricing Audit
**Slug:** `restoration-pricing-audit`

**Image: Pricing Audit Framework Checklist**
**Filename:** `restoration-pricing-audit-checklist.jpg`
**Alt text:** "A clean visual checklist titled 'The Restoration Pricing Audit Framework' showing seven checkboxes in a vertical column, each representing one audit check: (1) Xactimate price-list currency — target current release, leak 8–12% per job; (2) deductible recovery rate — target 85%+, most recover 60%; (3) code-upgrade billing under Ordinance and Law; (4) emergency-response premium applied to every after-hours call; (5) equipment-day rate and count aligned to drying logs; (6) change-order documentation complete; (7) line-item completeness estimate versus work performed. Each row shows the target and the dollar or percentage leak if the check fails. Designed to be screenshotted and run in 90 minutes."
**Size:** 820×520px
**Notes:** Screenshot-friendly vertical checklist; each row shows target + leak. Consider 1080×1080 social variant.

---

### Post 5: From Survival to Scale (Profitability Roadmap)
**Slug:** `restoration-profitability-roadmap-by-stage`

**Image: 5-Stage Profitability Staircase**
**Filename:** `restoration-profitability-roadmap-by-stage-staircase.jpg`
**Alt text:** "A staircase visualization titled 'The Restoration Profitability Roadmap' showing five ascending steps from left to right, one per revenue stage. Step 1 ($0–$500K): profit problem 'owner is the production,' opportunity 'clean books.' Step 2 ($500K–$1.5M): problem 'blended-margin blindness,' opportunity 'service-line tracking,' EBITDA 8–12%. Step 3 ($1.5M–$3M): problem 'overhead outruns gross profit,' opportunity 'discipline systems,' EBITDA 10–15%. Step 4 ($3M–$5M): problem 'owner-as-bottleneck,' opportunity 'fractional CFO and controller,' EBITDA 12–15%. Step 5 ($5M–$10M+): problem 'scaling people not unit economics,' opportunity 'operating leverage and M&A readiness,' EBITDA 12–18%. Each step is labeled with its problem, opportunity, and EBITDA target, ascending to show rising profitability potential with scale."
**Size:** 860×520px
**Notes:** Ascending staircase, one step per stage, each labeled with problem + opportunity + EBITDA target.

---

---

## Bundle 9: Standard Operating Procedures (№ 088–097)

Each SOP has one main procedural diagram via `<BlogImage>` placeholder. The alt text below is already live and is written to be AI-parseable (an engine can understand the procedure without seeing the image). House style: dark background, yellow accent, clean flowchart/diagram lines.

### № 088 — Monthly Books Close SOP
**Filename:** `monthly-books-close-sop-restoration-flow.jpg` · **Size:** 860×420px
**Alt:** A four-phase horizontal flow diagram of the restoration monthly books close. Phase 1 Bank & Credit Card Reconciliation (steps 1–6), Phase 2 AR & Insurance Receivables Cleanup (steps 7–13), Phase 3 Job Cost & Revenue Recognition (steps 14–20), Phase 4 Reporting & Owner Review (steps 21–28), with a milestone marker at each phase end and a final flag "books locked by the 10th."

### № 089 — Insurance Job Setup SOP
**Filename:** `insurance-job-setup-sop-quickbooks-decision-tree.jpg` · **Size:** 820×460px
**Alt:** Decision-tree diagram "QBO Project vs Sub-customer setup for an insurance restoration job." Start node "New insurance job" branches on Projects availability → "Create QBO Project" (default; job-level P&L) vs "Sub-customer of parent, Bill with parent." Leaves annotated with tagging conventions (service-line Class, carrier in customer record, claim number in the name).

### № 090 — Supplement Filing & Tracking SOP
**Filename:** `supplement-filing-tracking-sop-lifecycle.jpg` · **Size:** 860×420px
**Alt:** Horizontal supplement-lifecycle flow with six stages — Identify (8 trigger conditions) → Document (photos, moisture logs, scope, signed forms) → Build in Xactimate (line items + narrative + attachments) → Submit (portal vs email, day-3/7/14 follow-up) → Approve (full/partial/denied) → Invoice & Collect. Red feedback loop from Denied back to Re-file; metrics box: capture rate, days-to-approval, denial reasons.

### № 091 — 13-Week Cash Flow Forecast SOP
**Filename:** `13-week-cash-flow-forecast-sop-template.jpg` · **Size:** 860×460px
**Alt:** A 13-week cash flow forecast template, 13 week columns. Rows: Beginning Cash; Inflows (TPA AR, direct insurance AR [ACV + RCV holdback], retail AR, supplement collections, deductible receipts); Outflows (payroll, subcontractors, equipment payments, vendor AP, taxes, owner distributions, rent/utilities); Net Change; Ending Cash carrying forward. A shaded minimum-cash threshold line and a red escalation callout where projected ending cash dips below it.

### № 092 — Job Close-Out & Final AR SOP
**Filename:** `job-close-out-final-ar-sop-states.jpg` · **Size:** 860×420px
**Alt:** Flowchart of the five completion states as sequential gates: (1) Physically complete, (2) Documentation complete, (3) Billed, (4) Paid, (5) Closed in books — each gate listing its exit criteria. A dashed callout from Gate 1 to Gates 3–5 reads "A job can be physically done but still OPEN in three later states."

### № 093 — Water Mitigation First-48-Hours SOP (S500)
**Filename:** `water-mitigation-first-48-hours-sop-timeline.jpg` · **Size:** 860×420px
**Alt:** Hour-by-hour timeline of the first 48 hours of a water mitigation job in five segments — Hour 0–2 Dispatch & Arrival; Hour 2–4 Inspection & S500 Categorization (Cat 1/2/3, Class 1/2/3/4); Hour 4–8 Stabilization & Extraction; Hour 8–24 Equipment Placement (air-mover count, LGR dehumidifier sizing, AFD/containment if Cat 3); Hour 24–48 Drying Monitoring (temp/RH/GPP targets). Each segment annotated with required moisture/photo documentation and a carrier/TPA notification touchpoint.

### № 094 — Mold Remediation Containment SOP (S520)
**Filename:** `mold-remediation-containment-sop-diagram.jpg` · **Size:** 820×520px
**Alt:** Cutaway room view of an S520 mold containment: double-layer 6-mil poly walls sealed at anchor points, two-stage airlock, three-chamber decon unit (dirty/shower/clean), HEPA AFD ducted to exhaust outside creating negative pressure, manometer reading −0.02 in. w.c., blue arrows showing inward airflow. Callouts mark target 4+ air changes/hour and PPE don/doff zones.

### № 095 — Fire & Smoke Assessment & Pack-Out SOP (S700)
**Filename:** `fire-smoke-damage-assessment-pack-out-sop-trees.jpg` · **Size:** 860×480px
**Alt:** Two-part diagram. Left: smoke-type decision tree — Protein → degreasing/enzyme; Wet smoke → aggressive wet cleaning; Dry smoke → dry HEPA-vac/sponge; Fuel-oil → solvent cleaning + sealing. Right: content-vs-structure tree routing each item to Pack-Out, Clean-In-Place, or Total Loss; a final node selects deodorization (Hydroxyl occupied / Ozone sealed-unoccupied / Thermal fog severe).

### № 096 — Daily Crew Dispatch & On-Call Rotation SOP
**Filename:** `crew-dispatch-on-call-rotation-sop-flowchart.jpg` · **Size:** 860×480px
**Alt:** Daily dispatch decision flowchart from the 6:30am huddle through job assignment by four parallel filters (skill match; IICRC cert per job type — WRT/ASD water, AMRT mold, FSRT fire; geographic clustering; equipment/vehicle availability), loadout verification, and customer call-aheads. A parallel after-hours branch: live answer within target → intake checklist → severity tree (roll-now / schedule-AM / stabilize-by-phone) → primary/backup on-call → ETA. End-of-day check-in loops back to next-day load planning.

### № 097 — Equipment Tracking & Recovery SOP
**Filename:** `equipment-tracking-recovery-sop-lifecycle.jpg` · **Size:** 820×480px
**Alt:** Equipment lifecycle loop for drying equipment (air movers, LGR dehumidifiers, AFDs): (1) Intake/Tagging (serial + QR + depreciation schedule) → (2) Deployment (sign-out + placement photos) → (3) On-Site (daily status, monitoring readings, customer signature) → (4) Recovery (walkthrough list, as-recovered photo, shop check-in) → (5) Maintenance (clean, filter, calibrate) → back to Available Pool. A branch feeds an Equipment-Day Billing Reconciliation node comparing billed days in Xactimate vs logged on-site days.

---

---

## Bundle 10: Industry & Strategy (№ 098–104)

One main diagram per post via `<BlogImage>` placeholder. Alt text is AI-parseable. House style: dark background, yellow accent, clean diagram lines.

### № 098 — Should You Stay on Your TPA Program in 2026?
**Filename:** `should-you-stay-on-tpa-program-2026-economics.jpg` · **Size:** 820×460px
**Alt:** A TPA program economics diagram with two parts: (left) a fee-flow showing the carrier paying the claim, the TPA taking a 5–20% referral fee plus a program pricing cap, and the contractor receiving the compressed remainder; (right) a "TPA dependency trap" curve plotting revenue concentration from a single TPA on the x-axis against business risk on the y-axis, with a marked danger threshold at 40% of revenue where pricing leverage, cash-flow resilience, and sale value all decline.

### № 099 — Finding & Keeping Restoration Techs in 2026
**Filename:** `finding-keeping-restoration-techs-2026-comp-model.jpg` · **Size:** 820×480px
**Alt:** The 4-Tier Restoration Tech Compensation Model as four ascending tiers: Tier 1 Apprentice ($18–$20/hr, WRT in progress, first-cert completion bonus), Tier 2 Technician ($20–$24/hr, WRT, production + referral bonuses), Tier 3 Senior/Certified Tech ($24–$28/hr, WRT+ASD+AMRT or FSRT, performance + on-call differential), Tier 4 Crew Lead ($28–$35/hr, multiple certs + leadership, job-margin/production share). Each tier shows base pay, IICRC certifications, bonus structure, and the retention driver, ascending to show the certification-linked career ladder.

### № 100 — The 6-Channel Restoration Lead Engine
**Filename:** `restoration-lead-engine-diversified-sources-hub.jpg` · **Size:** 820×520px
**Alt:** A hub-and-spoke diagram titled "The 6-Channel Restoration Lead Engine" with the restoration company at the center and six spokes: (1) Google Business Profile + Local SEO, (2) Google Local Services Ads + Google Ads, (3) referral partnerships (plumbers, roofers, realtors, property managers), (4) insurance agent relationships, (5) TPA programs labeled "one channel, not THE channel," and (6) direct retail + brand. Each spoke is annotated with its cost profile, speed-to-build, and the margin of the resulting work, with a note that no single channel should exceed ~30–40% of revenue.

### № 101 — When the Adjuster Pushes Back
**Filename:** `adjuster-pushback-supplements-comp-bids-appraisal-ladder.jpg` · **Size:** 820×460px
**Alt:** An adjuster-pushback escalation decision tree with five sequential rungs: (1) Document to the IICRC standard during the work, (2) File a documented supplement (never a comp bid), (3) Bring in a public adjuster for large/unreasonable disputes, (4) Invoke the appraisal clause for genuine amount-of-loss disputes, (5) Walk away if a documented scope still breaks the margin floor. Each rung shows when to use it and who drives it, with a side note that a comp bid concedes the scope was negotiable.

### № 102 — The State of AOB in 2026
**Filename:** `aob-restoration-contractors-state-by-state-2026-map.jpg` · **Size:** 860×520px
**Alt:** A U.S. map shaded by AOB risk tier: Restricted (Florida, dark/red — HB 7065 and SB 2-A gutted the model), Emerging-risk (parts of Texas and Louisiana, amber — restrictions developing), and Clean (many states, neutral — AOB still works). A legend explains each tier and the recommended posture, and a side panel lists the lower-exposure alternatives (Direction to Pay, lien rights, two-party check workflow) to default to in restricted or uncertain states.

### № 103 — The PE Roll-Up Wave
**Filename:** `pe-roll-up-wave-restoration-2026-landscape.jpg` · **Size:** 860×480px
**Alt:** A restoration PE roll-up landscape visual: a left column of buyer types (large PE-backed platforms — Servpro/Blackstone, BluSky/Partners Group + Kohlberg, ATI Restoration, BELFOR Holdings; regional PE platforms; individual/search-fund buyers), a center EBITDA-multiple ladder (sub-$1M ~4–5x, $1M–$3M ~5–6.5x, $3M+ ~6–8x), and a right column of what buyers target (clean books, EBITDA scale, geographic fit, recurring programs, low concentration, low owner-dependency) with annotations that record quality moves the multiple ±0.5–1.5x and QoE problems can discount 0.5–2.0x.

### № 104 — AI in Restoration 2026 Reality Check
**Filename:** `ai-in-restoration-2026-reality-check-readiness-map.jpg` · **Size:** 860×500px
**Alt:** The Restoration AI Readiness Map sorting use cases into three zones. Ready (green): Xactimate estimate assistance (Ask AIMe), photo documentation/damage analysis, lead intake routing, claim narrative drafting, adjuster-communication sentiment analysis. Emerging (amber): intake-to-dispatch integration, damage-detection accuracy. Not Ready (red): full scope-of-work generation, replacing field-tech judgment, trauma-stage customer service. A caption states the test: AI that assists a bounded task is real; AI claiming to replace human judgment in an unbounded task is hype.

---

---

## Bundle 11: Exit Planning & Valuation (№ 105–110)

One main visual per post via `<BlogImage>` placeholder. Alt text is AI-parseable. House style: dark background, yellow accent, clean valuation/diagram lines.

### № 105 — Selling Your Restoration Company: 24-Month Books Prep
**Filename:** `selling-restoration-company-books-prep-timeline.jpg` · **Size:** 860×420px
**Alt:** Horizontal 24-month exit-prep timeline with five milestones — Month -24 (start clean accrual books + EBITDA add-back log), -18 (WIP schedule + service-line P&L), -12 (normalize owner comp; reduce customer/TPA concentration below 40%), -6 (trailing-twelve-month, QoE-ready package), Exit (3 years of consistent normalized statements). Caption: record quality moves the EBITDA multiple by half a turn to a turn and a half.

### № 106 — What a PE Buyer Will Ask to See
**Filename:** `pe-buyer-restoration-due-diligence-checklist.jpg` · **Size:** 860×460px
**Alt:** Due-diligence checklist in three columns. Financials: 3-year P&Ls/balance sheets/tax returns, AR & AP aging, WIP schedule, bank recs, normalized EBITDA with add-back support. Operations: job-costing detail, service-line mix, supplement capture, equipment schedule, backlog. Legal & Contracts: TPA agreements, customer concentration, leases, licenses, insurance, litigation. Banner: a QoE that finds problems can cut valuation by half a turn to two turns of EBITDA.

### № 107 — How Restoration Companies Are Valued
**Filename:** `restoration-company-valuation-multiples-chart.jpg` · **Size:** 860×420px
**Alt:** Valuation-multiples chart with three bands — small owner-operator shops on SDE at 2.3–3.5x; lower-mid-market on EBITDA at 4–5x; PE-ready on EBITDA at 6–8x and up. Callout: a $3M-EBITDA company is worth $12M at 4x vs $18M at 6x — a $6M difference on the identical business, driven by books quality, scale, diversification, and owner-independence. Source: Peak Business Valuation.

### № 108 — What Is a WIP Schedule?
**Filename:** `wip-schedule-restoration-sample.jpg` · **Size:** 860×420px
**Alt:** Sample work-in-process schedule table in the exact format bankers/buyers/bonding companies expect. Columns: Job, Contract/Estimate Value, Costs Incurred to Date, Percent Complete (cost-to-cost), Earned Revenue, Billed to Date, Over/(Under) Billing. Four example restoration jobs plus a totals row reconciling to the balance-sheet WIP figure; one under-billed and one over-billed row highlighted.

### № 109 — The $500K Mistake (messy-books discount)
**Filename:** `500k-mistake-restoration-sale-bars.jpg` · **Size:** 820×420px
**Alt:** Two-bar comparison "Same Company, Two Sets of Books." Left "Messy books": $3M-EBITDA company at 4.5x = $13.5M, annotated with re-traded price, larger earnout, bigger holdback. Right "Clean books": same company at 5.5x = $16.5M, full add-back credit, more cash at close. The bracketed gap is labeled the avoidable discount — six figures on a small deal, seven figures on a mid-size one.

### № 110 — The Restoration Roll-Up Landscape
**Filename:** `restoration-roll-up-landscape-map.jpg` · **Size:** 860×480px
**Alt:** Landscape map of restoration roll-up acquirers as four cards plus a fifth band — Servpro (Blackstone): national franchise + corporate acquisitions; BluSky (Partners Group + Kohlberg): commercial/large-loss; ATI Restoration: commercial/CAT, multi-region; BELFOR Holdings: global large-loss/commercial; plus regional PE-backed platforms doing tuck-ins. Each card lists targets: clean books, EBITDA scale, geographic fit, recurring TPA/commercial programs, low owner-dependency. Source: Peak Business Valuation and public deal disclosures.

---

---

## Bundle 12: Cash Flow & Working Capital (№ 111–116)

One main visual per post via `<BlogImage>` placeholder. Cash-flow content suits clean charts — consider inline SVG. House style: dark background, yellow accent.

### № 111 — Busy But Broke (revenue vs cash divergence)
**Filename:** `restoration-cash-flow-busy-but-broke-chart.jpg` · **Size:** 820×420px
**Alt:** Line chart "Busy But Broke: One Profitable Month." X-axis weeks 1–12. One rising line "Revenue booked / profit earned"; a second line "Cash on hand" rises slightly then falls steeply as payroll, equipment, and subcontractor costs go out while insurance AR hasn't landed. The widening gap between them is shaded and labeled "the working-capital gap"; around week 8–12 AR lands and cash recovers.

### № 112 — Build a 13-Week Forecast (template)
**Filename:** `13-week-cash-flow-restoration-template.jpg` · **Size:** 860×420px
**Alt:** A 13-week cash flow forecast template: 13 week columns; rows grouped Beginning Cash; Inflows (TPA AR, direct insurance AR [ACV + RCV holdback], retail AR, supplement collections, deductible receipts); Outflows (payroll, subcontractors, equipment lease/loan, vendor AP, taxes, owner distributions, rent/utilities); Net Change; Ending Cash carrying forward. A shaded minimum-cash threshold line with a red callout where projected ending cash dips below it.

### № 113 — CAT Season Timeline
**Filename:** `cat-season-survival-guide-restoration-timeline.jpg` · **Size:** 860×420px
**Alt:** Three-stage CAT-season timeline. Pre-deployment: confirm LOC headroom, build cash cushion, line up financing, set per-job cost tracking ("cash positioned"). During: travel/lodging/labor/equipment/fuel out daily, tag every CAT job, real-time documentation ("peak cash burn, no AR yet"). Post-event reconciliation: file supplements fast, reconcile equipment days, match costs to jobs, true-up deployment P&L ("AR collection begins, 60–90 days out"). A cash-on-hand line dips deeply during deployment and recovers as AR lands.

### № 114 — Working Capital Toolkit
**Filename:** `insurance-90-days-payroll-friday-toolkit.jpg` · **Size:** 860×440px
**Alt:** A "Working Capital Toolkit" of 5–6 cards, each with best-for / speed / tradeoff: Line of Credit (routine timing gaps; fast once in place; interest, sized 10–20% of revenue); AR Acceleration (shorten the lag; free; needs billing discipline); Invoice Factoring/AR Financing (urgent cash; very fast; higher cost, selective); Retainers/Progress Billing (large reconstruction; reduces gap up front; depends on what insurance allows); Vendor/Sub Terms (match outflow to inflow; free; relationship-dependent); Supplement Timing (recover earned cash faster; free; needs tracking).

### № 115 — What the Banker Reviews
**Filename:** `banker-sba-loan-restoration-checklist.jpg` · **Size:** 860×440px
**Alt:** A "What the Banker Reviews" checklist in two groups. Documents: 3-year P&Ls, balance sheets, business + personal tax returns, AR aging, WIP schedule, debt schedule, personal financial statement. Metrics with green-flag thresholds: DSCR at or above 1.25x, positive global cash flow, working capital 15–25% of revenue, owner comp normalized with documented add-backs, no single customer/TPA above 40%, stable-or-rising 3-year trend.

### № 116 — LOC Sizing Matrix
**Filename:** `line-of-credit-restoration-company-matrix.jpg` · **Size:** 820×420px
**Alt:** A line-of-credit sizing matrix. Rows = revenue ranges ($1M–$2M, $2M–$3M, $3M–$5M); columns = Recommended LOC size (~10–20% of revenue, e.g. $150K–$350K, $300K–$550K, $500K–$900K), Primary use cases (bridge payroll during AR lag, fund a CAT deployment, smooth seasonal timing), and a "never use it for" note (funding losses, owner distributions, permanent working capital). A side callout contrasts a healthy revolve-to-zero pattern against the unhealthy evergreen balance.

---

*Updated total: 75 images across 69 posts.*
