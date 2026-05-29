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
