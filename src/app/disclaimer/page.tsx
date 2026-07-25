import type { Metadata } from "next";
import Link from "next/link";
import LegalShell, { LegalSection } from "@/components/legal/LegalShell";
import { legal } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimers",
  description:
    "Important disclaimers for Cat3 Books, Field Notes, and the Small Business Bookkeeping School: educational content only, not tax, legal, accounting or financial advice, no professional relationship, no guaranteed results.",
  alternates: { canonical: `${site.url}/disclaimer` },
  robots: { index: true, follow: true },
};

const toc = [
  { id: "general", label: "General disclaimer" },
  { id: "not-advice", label: "Not professional advice" },
  { id: "no-relationship", label: "No professional relationship" },
  { id: "accuracy", label: "Accuracy & currency" },
  { id: "results", label: "No guaranteed results" },
  { id: "testimonials", label: "Testimonials & examples" },
  { id: "forward", label: "Forward-looking statements" },
  { id: "third-party", label: "Third-party content & tools" },
  { id: "companion", label: "The Carryforward" },
  { id: "external", label: "External links" },
  { id: "endorsement", label: "Endorsements & affiliations" },
  { id: "contact", label: "Contact" },
];

export default function DisclaimerPage() {
  return (
    <LegalShell
      slug="disclaimer"
      title="Disclaimers"
      intro="Cat3 Books publishes educational material about bookkeeping, accounting, and business finance. This page explains the limits of that material — what it is, what it is not, and what you should not rely on it for."
      toc={toc}
    >
      <div className="legal-note">
        <p>
          <strong>The one that matters most.</strong> Everything we publish is
          educational and general. It is <strong>not tax, legal, accounting, or
          financial advice</strong>, it is not tailored to your situation, and it does
          not create a professional relationship. Always consult a qualified
          professional about your specific circumstances before acting.
        </p>
      </div>

      <LegalSection id="general" n={1} title="General disclaimer">
        <p>
          The information provided by <strong>{legal.entity}</strong>{" "}
          (&ldquo;{legal.brand},&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;) on{" "}
          <a href={site.url}>{site.url.replace(/^https?:\/\//, "")}</a>, including{" "}
          <Link href="/field-notes">Field Notes</Link> and the{" "}
          <Link href="/school">Small Business Bookkeeping School</Link> (the
          &ldquo;Site&rdquo;), is for general informational and educational purposes
          only. All information is provided in good faith; however, we make no
          representation or warranty of any kind, express or implied, regarding the
          accuracy, adequacy, validity, reliability, availability, or completeness of
          any information on the Site.
        </p>
        <p>
          Under no circumstances will we have any liability to you for any loss or
          damage of any kind incurred as a result of the use of the Site or reliance
          on any information provided on it. Your use of the Site and your reliance on
          any information is solely at your own risk. This page supplements, and is
          part of, our <Link href="/terms">Terms of Use</Link>.
        </p>
      </LegalSection>

      <LegalSection id="not-advice" n={2} title="Not professional advice">
        <p>
          The Site cannot and does not contain accounting, tax, legal, or financial
          advice. The information is provided for general educational purposes only
          and is not a substitute for professional advice.
        </p>
        <ul>
          <li>
            <strong>Not tax advice.</strong> Nothing on the Site is intended to be,
            and should not be taken as, advice about your tax obligations. Tax
            treatment depends on your specific facts and on rules that change and vary
            by jurisdiction.
          </li>
          <li>
            <strong>Not accounting advice.</strong> Examples, methods, and
            &ldquo;how-to&rdquo; content illustrate general concepts. Your books
            should be maintained according to your circumstances and applicable
            standards.
          </li>
          <li>
            <strong>Not legal advice.</strong> Any reference to laws, regulations, or
            legal concepts is general and may not reflect the most current legal
            developments or your jurisdiction.
          </li>
          <li>
            <strong>Not financial or investment advice.</strong> Nothing on the Site
            is a recommendation to make any financial, investment, or business
            decision.
          </li>
        </ul>
        <p>
          Before making any decision or taking any action based on Site content, you
          should consult a qualified accountant, attorney, tax professional, or
          financial advisor who can consider your specific situation.
        </p>
      </LegalSection>

      <LegalSection id="no-relationship" n={3} title="No professional relationship">
        <p>
          Your use of the Site — including reading articles or lessons, subscribing to
          our newsletter, downloading materials, or contacting us — does{" "}
          <strong>not</strong> create an accountant–client, advisor–client,
          attorney–client, fiduciary, or any other professional relationship between
          you and {legal.entity}. Such a relationship is formed only by a separate,
          mutually signed written engagement agreement that defines its scope.
        </p>
      </LegalSection>

      <LegalSection id="accuracy" n={4} title="Accuracy & currency">
        <p>
          Bookkeeping practices and tax and regulatory rules change frequently, and
          content that was accurate when published may become outdated. Each article
          and lesson reflects our understanding as of the date it was written or last
          updated. We are under no obligation to update any content, and we do not
          warrant that any content is current, complete, or applicable to your
          situation. Verify anything important against primary sources or with a
          professional before relying on it.
        </p>
      </LegalSection>

      <LegalSection id="results" n={5} title="No guaranteed results">
        <p>
          Any figures, benchmarks, margins, savings, timelines, or outcomes mentioned
          on the Site are illustrative and are not promises or guarantees. Results
          depend on many factors specific to your business that are outside our
          control. Nothing on the Site should be interpreted as a guarantee that you
          will achieve any particular financial or operational result.
        </p>
      </LegalSection>

      <LegalSection id="testimonials" n={6} title="Testimonials & examples">
        <p>
          Any testimonials, case studies, or examples on the Site reflect the
          experiences of specific individuals or businesses and may have been edited
          for length or clarity. They are not representative of every client, are not
          a guarantee of future performance, and your results may differ. Some
          examples and scenarios are composites or hypotheticals created for
          illustration and do not describe any specific client.
        </p>
      </LegalSection>

      <LegalSection id="forward" n={7} title="Forward-looking statements">
        <p>
          The Site may contain forward-looking statements about industry trends,
          benchmarks, or expectations. These reflect our views as of the date of
          publication, involve assumptions and uncertainties, and are not guarantees
          of future events. Actual outcomes may differ materially, and we undertake no
          obligation to update forward-looking statements.
        </p>
      </LegalSection>

      <LegalSection id="third-party" n={8} title="Third-party content & tools">
        <p>
          The Site references third-party products, services, and software — for
          example, Intuit QuickBooks and other tools. These references are for
          educational purposes. We are not affiliated with, endorsed by, or sponsored
          by those companies unless expressly stated, and product names and marks
          belong to their respective owners. Any instructions involving third-party
          software may become outdated as those products change; always follow the
          provider&rsquo;s current documentation.
        </p>
      </LegalSection>

      <LegalSection id="companion" n={9} title="The Carryforward">
        <p>
          We reference our companion publication, <strong>{legal.companion}</strong>,
          which covers specialty tax and incentives. {legal.companion} is a separate
          educational publication with its own content, terms, and disclaimers, and,
          like this Site, it provides educational material only — not tax, legal, or
          accounting advice. References to it are informational and are not a
          substitute for professional advice about your situation.
        </p>
      </LegalSection>

      <LegalSection id="external" n={10} title="External links">
        <p>
          The Site may contain links to external websites that are not provided or
          maintained by us. We do not guarantee the accuracy, relevance, timeliness,
          or completeness of any information on external sites, and a link does not
          imply endorsement. We are not responsible for the content or practices of
          any linked site.
        </p>
      </LegalSection>

      <LegalSection id="endorsement" n={11} title="Endorsements & affiliations">
        <p>
          Any professional designations, memberships, or credentials referenced on the
          Site describe the background of {legal.brand} and do not imply endorsement of
          our content by any organization. Where we participate in an affiliate or
          referral arrangement, we will disclose it; absent such disclosure, we receive
          no compensation for mentioning a third-party product or service.
        </p>
      </LegalSection>

      <LegalSection id="contact" n={12} title="Contact">
        <p>
          Questions about these disclaimers can be sent to{" "}
          <a href={`mailto:${legal.contactEmail}`}>{legal.contactEmail}</a>. See also
          our <Link href="/privacy">Privacy Policy</Link> and{" "}
          <Link href="/terms">Terms of Use</Link>.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
