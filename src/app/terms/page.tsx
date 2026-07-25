import type { Metadata } from "next";
import Link from "next/link";
import LegalShell, { LegalSection } from "@/components/legal/LegalShell";
import { legal } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms governing your use of the Cat3 Books website, Field Notes, and the Small Business Bookkeeping School — including acceptable use, intellectual property, disclaimers, and limitation of liability.",
  alternates: { canonical: `${site.url}/terms` },
  robots: { index: true, follow: true },
};

const toc = [
  { id: "acceptance", label: "Acceptance of these terms" },
  { id: "eligibility", label: "Eligibility" },
  { id: "not-advice", label: "Educational content, not advice" },
  { id: "services", label: "Services & separate agreements" },
  { id: "acceptable-use", label: "Acceptable use" },
  { id: "accounts", label: "Accounts & security" },
  { id: "ip", label: "Intellectual property" },
  { id: "ugc", label: "Your submissions" },
  { id: "third-party", label: "Third-party links & content" },
  { id: "disclaimer", label: "Disclaimer of warranties" },
  { id: "liability", label: "Limitation of liability" },
  { id: "indemnity", label: "Indemnification" },
  { id: "law", label: "Governing law & disputes" },
  { id: "changes", label: "Changes & termination" },
  { id: "misc", label: "Miscellaneous" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <LegalShell
      slug="terms"
      title="Terms of Use"
      intro="These terms are the agreement between you and Cat3 Books for your use of this website and its content. Please read them carefully — by using the Site, you agree to them."
      toc={toc}
    >
      <div className="legal-note">
        <p>
          <strong>Please note.</strong> This Site provides general education about
          bookkeeping, accounting, and business finance. It is <strong>not</strong>{" "}
          professional advice, and using it does not create a client relationship.
          These terms include an important{" "}
          <a href="#liability">limitation of liability</a> and a{" "}
          <a href="#disclaimer">disclaimer of warranties</a>.
        </p>
      </div>

      <LegalSection id="acceptance" n={1} title="Acceptance of these terms">
        <p>
          These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and use of the
          website at{" "}
          <a href={site.url}>{site.url.replace(/^https?:\/\//, "")}</a>, including{" "}
          <Link href="/field-notes">Field Notes</Link> and the{" "}
          <Link href="/school">Small Business Bookkeeping School</Link> (the
          &ldquo;Site&rdquo;), operated by <strong>{legal.entity}</strong>{" "}
          (&ldquo;{legal.brand},&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;). By accessing or using the Site, you agree to be bound by
          these Terms and by our <Link href="/privacy">Privacy Policy</Link>. If you
          do not agree, do not use the Site.
        </p>
      </LegalSection>

      <LegalSection id="eligibility" n={2} title="Eligibility">
        <p>
          The Site is intended for business owners and professionals. You must be at
          least 18 years old and able to form a binding contract to use it. By using
          the Site, you represent that you meet these requirements and that any
          information you provide is accurate.
        </p>
      </LegalSection>

      <LegalSection id="not-advice" n={3} title="Educational content, not advice">
        <p>
          All content on the Site is provided for <strong>general informational and
          educational purposes only</strong>. It is not, and should not be relied
          upon as, accounting, tax, legal, financial, or other professional advice,
          and it is not a substitute for advice from a qualified professional who
          knows your specific circumstances.
        </p>
        <p>
          Reading the Site, subscribing to our newsletter, or contacting us does{" "}
          <strong>not</strong> create an accountant–client, advisor–client, or any
          other professional relationship. Such a relationship arises only through a
          separate, signed written engagement agreement. See our full{" "}
          <Link href="/disclaimer">Disclaimers</Link> for details.
        </p>
      </LegalSection>

      <LegalSection id="services" n={4} title="Services & separate agreements">
        <p>
          If you engage us for bookkeeping, job-costing, advisory, or other services
          (the &ldquo;Services&rdquo;), those Services are governed by a separate
          written engagement agreement. To the extent that agreement conflicts with
          these Terms regarding the Services, the engagement agreement controls.
          These Terms continue to govern your use of the Site itself.
        </p>
      </LegalSection>

      <LegalSection id="acceptable-use" n={5} title="Acceptable use">
        <p>You agree not to:</p>
        <ul>
          <li>Use the Site in violation of any law or regulation;</li>
          <li>Copy, scrape, harvest, or systematically extract content except as expressly permitted (Section 7);</li>
          <li>Attempt to gain unauthorized access to any portion of the Site, our systems, or other users&rsquo; data;</li>
          <li>Interfere with or disrupt the Site, introduce malware, or place an unreasonable load on our infrastructure;</li>
          <li>Use the Site to send unsolicited communications or to impersonate any person or entity; or</li>
          <li>Use any content in a way that is misleading, defamatory, or infringing.</li>
        </ul>
      </LegalSection>

      <LegalSection id="accounts" n={6} title="Accounts & security">
        <p>
          Certain areas of the Site are restricted and require credentials we issue.
          You are responsible for maintaining the confidentiality of any credentials,
          for all activity under them, and for notifying us immediately of any
          unauthorized use. We may suspend or terminate access we believe has been
          compromised or misused.
        </p>
      </LegalSection>

      <LegalSection id="ip" n={7} title="Intellectual property">
        <p>
          The Site and its content — including text, articles, lessons, graphics,
          logos, the &ldquo;{legal.brand}&rdquo; name and marks, and the selection and
          arrangement of all of it — are owned by {legal.entity} or our licensors and
          are protected by intellectual-property laws.
        </p>
        <p>
          We grant you a limited, revocable, non-exclusive, non-transferable license
          to access and view the content for your own personal or internal business
          use. You may share links to our content and quote brief excerpts with
          attribution. You may not otherwise reproduce, republish, sell, or create
          derivative works from the content without our prior written permission.
        </p>
      </LegalSection>

      <LegalSection id="ugc" n={8} title="Your submissions">
        <p>
          If you send us feedback, suggestions, questions, or other materials, you
          grant us a non-exclusive, worldwide, royalty-free, perpetual license to use
          them to operate and improve the Site and Services, without obligation or
          compensation to you. Do not send us confidential information you do not want
          us to use in this way, and do not submit anything you do not have the right
          to share.
        </p>
      </LegalSection>

      <LegalSection id="third-party" n={9} title="Third-party links & content">
        <p>
          The Site links to third-party websites and references third-party products,
          services, and software — including our companion publication,{" "}
          {legal.companion}, and tools such as Intuit QuickBooks. We do not control
          and are not responsible for third-party sites or content, and a link or
          reference is not an endorsement. Your use of any third party is governed by
          that third party&rsquo;s terms and policies.
        </p>
      </LegalSection>

      <LegalSection id="disclaimer" n={10} title="Disclaimer of warranties">
        <p>
          THE SITE AND ALL CONTENT ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
          AVAILABLE,&rdquo; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED,
          OR STATUTORY. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL
          WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT, AND ANY WARRANTY THAT THE
          SITE WILL BE ACCURATE, COMPLETE, CURRENT, RELIABLE, UNINTERRUPTED, OR ERROR-
          OR VIRUS-FREE.
        </p>
        <p>
          Tax and accounting rules change and vary by situation and jurisdiction. We
          do not warrant that any content is current or applicable to you. You are
          responsible for verifying information before relying on it.
        </p>
      </LegalSection>

      <LegalSection id="liability" n={11} title="Limitation of liability">
        <p>
          TO THE FULLEST EXTENT PERMITTED BY LAW, {legal.entity.toUpperCase()} AND ITS
          OWNERS, MEMBERS, OFFICERS, EMPLOYEES, AND CONTRACTORS WILL NOT BE LIABLE FOR
          ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE
          DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR BUSINESS
          OPPORTUNITY, ARISING OUT OF OR RELATING TO YOUR USE OF (OR INABILITY TO USE)
          THE SITE OR ITS CONTENT, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </p>
        <p>
          TO THE FULLEST EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY FOR ALL CLAIMS
          RELATING TO THE SITE WILL NOT EXCEED ONE HUNDRED U.S. DOLLARS (US$100).
          These limits do not apply to liability that cannot be excluded or limited
          under applicable law, and they are separate from any terms in a signed
          engagement agreement for Services.
        </p>
      </LegalSection>

      <LegalSection id="indemnity" n={12} title="Indemnification">
        <p>
          You agree to indemnify and hold harmless {legal.entity} and its owners,
          members, officers, employees, and contractors from any claims, losses,
          liabilities, and expenses (including reasonable attorneys&rsquo; fees)
          arising out of your use of the Site, your violation of these Terms, or your
          violation of any law or the rights of a third party.
        </p>
      </LegalSection>

      <LegalSection id="law" n={13} title="Governing law & disputes">
        <p>
          These Terms are governed by {legal.governingLaw}. You agree that any
          dispute relating to the Site or these Terms will be resolved in the state or
          federal courts located where {legal.brand} is organized, and you consent to
          the personal jurisdiction of those courts, unless applicable law grants you
          a non-waivable right to bring the dispute elsewhere.
        </p>
        <p>
          Any claim must be brought within one (1) year after it arises, to the extent
          permitted by law. If any provision of these Terms is found unenforceable, the
          rest remain in effect.
        </p>
      </LegalSection>

      <LegalSection id="changes" n={14} title="Changes & termination">
        <p>
          We may modify these Terms at any time by posting the revised version with an
          updated effective date. Changes take effect when posted, and your continued
          use of the Site means you accept them. We may also modify, suspend, or
          discontinue any part of the Site, and may restrict or terminate your access,
          at any time and without notice.
        </p>
      </LegalSection>

      <LegalSection id="misc" n={15} title="Miscellaneous">
        <p>
          These Terms, together with our <Link href="/privacy">Privacy Policy</Link>{" "}
          and <Link href="/disclaimer">Disclaimers</Link>, are the entire agreement
          between you and us regarding the Site. Our failure to enforce a provision is
          not a waiver of it. You may not assign these Terms; we may assign them in
          connection with a business transfer. Nothing in these Terms creates a
          partnership, agency, or employment relationship between us.
        </p>
      </LegalSection>

      <LegalSection id="contact" n={16} title="Contact">
        <p>
          Questions about these Terms can be sent to{" "}
          <a href={`mailto:${legal.contactEmail}`}>{legal.contactEmail}</a>.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
