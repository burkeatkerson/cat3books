import type { Metadata } from "next";
import Link from "next/link";
import LegalShell, { LegalSection } from "@/components/legal/LegalShell";
import { legal } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Cat3 Books collects, uses, shares and protects your information — including website analytics, email engagement tracking, our CRM, and the QuickBooks data our clients authorize.",
  alternates: { canonical: `${site.url}/privacy` },
  robots: { index: true, follow: true },
};

const toc = [
  { id: "scope", label: "Scope of this policy" },
  { id: "collect", label: "Information we collect" },
  { id: "sources", label: "How we collect it" },
  { id: "use", label: "How we use information" },
  { id: "email", label: "Email tracking & communications" },
  { id: "quickbooks", label: "QuickBooks & client financial data" },
  { id: "cookies", label: "Cookies & analytics" },
  { id: "sharing", label: "How we share information" },
  { id: "processors", label: "Service providers" },
  { id: "retention", label: "Data retention" },
  { id: "security", label: "Security" },
  { id: "rights", label: "Your privacy rights" },
  { id: "state", label: "U.S. state disclosures" },
  { id: "children", label: "Children's privacy" },
  { id: "intl", label: "International users" },
  { id: "changes", label: "Changes to this policy" },
  { id: "contact", label: "Contact us" },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalShell
      slug="privacy"
      title="Privacy Policy"
      intro="This policy explains what information Cat3 Books collects when you visit this website or engage our services, how we use and share it, how long we keep it, and the choices and rights you have. We keep it in plain English on purpose."
      toc={toc}
    >
      <div className="legal-note">
        <p>
          <strong>Short version.</strong> We collect only what we need to run our
          website, respond to you, deliver our bookkeeping services, and improve
          what we publish. We do not sell your personal information. We track
          whether marketing emails are opened and clicked. Clients&rsquo; QuickBooks
          data is accessed only with authorization and used only to perform the
          engagement. You can contact us at any time to access or delete your
          information.
        </p>
      </div>

      <LegalSection id="scope" n={1} title="Scope of this policy">
        <p>
          This Privacy Policy applies to <strong>{legal.brand}</strong> (&ldquo;{legal.entity}
          ,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) and to the
          website at{" "}
          <a href={site.url}>{site.url.replace(/^https?:\/\//, "")}</a>, including our{" "}
          <Link href="/field-notes">Field Notes</Link> publication and the{" "}
          <Link href="/school">Small Business Bookkeeping School</Link> (together, the
          &ldquo;Site&rdquo;), as well as the bookkeeping, job-costing, and advisory
          services we provide to clients (the &ldquo;Services&rdquo;).
        </p>
        <p>
          It does not apply to any third-party website or service we link to,
          including our companion publication, {legal.companion}, each of which
          maintains its own privacy practices. It also does not change the terms of
          any separate written engagement agreement you have with us; where that
          agreement and this policy conflict as to our Services, the engagement
          agreement controls.
        </p>
      </LegalSection>

      <LegalSection id="collect" n={2} title="Information we collect">
        <p>
          We collect the following categories of information. The specific data
          within each category depends on how you interact with us.
        </p>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Examples</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Contact &amp; identity</td>
              <td>Name, business name, email address, phone number, mailing address, job title.</td>
            </tr>
            <tr>
              <td>Messages you send</td>
              <td>The contents of emails, contact requests, form submissions, and anything you choose to share with us.</td>
            </tr>
            <tr>
              <td>Marketing engagement</td>
              <td>Whether you opened an email we sent, which links you clicked, and your subscription and unsubscribe status.</td>
            </tr>
            <tr>
              <td>CRM &amp; relationship data</td>
              <td>Notes, tasks, pipeline stage, tags, and interaction history we maintain to manage prospective and current client relationships.</td>
            </tr>
            <tr>
              <td>Client financial data</td>
              <td>For clients only: accounting records accessed through QuickBooks Online or provided by you to perform the Services (see Section 6).</td>
            </tr>
            <tr>
              <td>Usage &amp; device</td>
              <td>IP address, browser and device type, pages viewed, referring page, and approximate location derived from IP, collected through analytics.</td>
            </tr>
            <tr>
              <td>Cookies &amp; identifiers</td>
              <td>Cookies and similar technologies used for authentication (admin area) and aggregate analytics (see Section 7).</td>
            </tr>
          </tbody>
        </table>
        <p>
          We do not intentionally collect sensitive personal information (such as
          government identifiers, health information, or precise geolocation) from
          Site visitors, and we ask that you not send it to us through the Site.
        </p>
      </LegalSection>

      <LegalSection id="sources" n={3} title="How we collect it">
        <p>We collect information in three ways:</p>
        <ul>
          <li>
            <strong>Directly from you</strong> — when you email us, submit a form,
            request an assessment, subscribe to our newsletter, or become a client.
          </li>
          <li>
            <strong>Automatically</strong> — when you use the Site, through cookies,
            analytics, server logs, and email open/click tracking.
          </li>
          <li>
            <strong>From third parties you authorize</strong> — for example,
            accounting data you connect to us through Intuit QuickBooks Online, or
            information from a referral source you have asked to introduce us.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="use" n={4} title="How we use information">
        <p>We use personal information to:</p>
        <ul>
          <li>Operate, maintain, secure, and improve the Site and our content;</li>
          <li>Respond to your inquiries and provide the information or assessment you request;</li>
          <li>Provide, manage, and bill for the Services;</li>
          <li>Send you administrative messages and, where permitted, marketing emails you can opt out of at any time;</li>
          <li>Measure whether our emails and content are useful, and improve them;</li>
          <li>Maintain our CRM records of prospective and current client relationships;</li>
          <li>Detect, prevent, and address fraud, abuse, security incidents, and technical issues; and</li>
          <li>Comply with law and enforce our <Link href="/terms">Terms of Use</Link> and other agreements.</li>
        </ul>
        <p>
          Where required by law, we rely on one or more of the following legal
          bases: your consent, the performance of a contract with you, our
          legitimate interests in operating and growing our business, and
          compliance with legal obligations.
        </p>
      </LegalSection>

      <LegalSection id="email" n={5} title="Email tracking & communications">
        <p>
          When we send marketing or newsletter emails, we use common tracking
          technologies to understand engagement:
        </p>
        <ul>
          <li>
            <strong>Open tracking</strong> — a small, invisible image (a
            &ldquo;pixel&rdquo;) that loads when you open the email, telling us that
            it was opened and, approximately, when and from what general location or
            device.
          </li>
          <li>
            <strong>Click tracking</strong> — links in our emails route through our
            systems so we can record which links were clicked before forwarding you
            to the destination.
          </li>
        </ul>
        <p>
          We use this to gauge interest and improve our sequences — not to build
          intrusive profiles. You can prevent open tracking by disabling images in
          your email client, and you can stop marketing emails entirely by using the{" "}
          <strong>unsubscribe</strong> link in any such email or by emailing us.
          Unsubscribing from marketing does not stop essential, non-marketing
          messages related to Services you have requested (for example, billing or
          engagement communications).
        </p>
      </LegalSection>

      <LegalSection id="quickbooks" n={6} title="QuickBooks & client financial data">
        <p>
          For clients who engage us, we may connect to your <strong>Intuit
          QuickBooks Online</strong> account through Intuit&rsquo;s authorized OAuth
          process. This connection is established only with your authorization, and
          you can revoke it at any time from within your Intuit account.
        </p>
        <ul>
          <li>
            We access your accounting data <strong>only to perform the Services</strong>{" "}
            you have engaged us for — such as bookkeeping, reconciliation, job
            costing, reporting, and advisory work.
          </li>
          <li>
            We do <strong>not</strong> sell, rent, or use your financial data for
            advertising, and we do not share it except with the service providers
            and in the circumstances described in this policy.
          </li>
          <li>
            Our access and use of Intuit data also complies with the terms we accept
            with Intuit. If you revoke access, we will stop accessing the connection,
            though we may retain records already used to perform the Services as
            described in Section 10 and as required by law and professional standards.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="cookies" n={7} title="Cookies & analytics">
        <p>
          We use a limited set of cookies and similar technologies:
        </p>
        <ul>
          <li>
            <strong>Strictly necessary</strong> — for example, authentication cookies
            that keep an administrator signed in to the private admin area. The Site
            does not function correctly without these.
          </li>
          <li>
            <strong>Analytics</strong> — we use privacy-conscious, aggregate website
            analytics to understand traffic and improve the Site. These help us see
            which pages are visited and how the Site performs; they are not used to
            sell your data.
          </li>
        </ul>
        <p>
          Most browsers let you refuse or delete cookies through their settings.
          Some browsers offer a &ldquo;Do Not Track&rdquo; or Global Privacy Control
          signal; where we are legally required to honor such a signal as an opt-out
          of sale or sharing, we do — noting that we do not sell personal information
          in the first place.
        </p>
      </LegalSection>

      <LegalSection id="sharing" n={8} title="How we share information">
        <p>
          <strong>We do not sell your personal information.</strong> We share it only
          as follows:
        </p>
        <ul>
          <li>
            <strong>Service providers</strong> who process data on our behalf under
            contract (Section 9);
          </li>
          <li>
            <strong>Professional advisors</strong> such as our own lawyers,
            accountants, and insurers, where reasonably necessary;
          </li>
          <li>
            <strong>Legal and safety</strong> — to comply with law, respond to lawful
            requests and legal process, protect our rights and property, or protect
            the safety of any person;
          </li>
          <li>
            <strong>Business transfers</strong> — in connection with a merger,
            acquisition, financing, or sale of assets, subject to this policy; and
          </li>
          <li>
            <strong>With your direction or consent</strong> — when you ask us to share
            information or otherwise agree.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="processors" n={9} title="Service providers">
        <p>
          We rely on reputable third parties to host, secure, and operate the Site
          and Services. Each processes information only as needed to provide their
          service to us. They include, by function:
        </p>
        <table>
          <thead>
            <tr>
              <th>Function</th>
              <th>Provider(s)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hosting &amp; analytics</td>
              <td>Vercel (website hosting and aggregate analytics).</td>
            </tr>
            <tr>
              <td>Database &amp; auth</td>
              <td>Supabase (data storage and administrator authentication).</td>
            </tr>
            <tr>
              <td>Email delivery</td>
              <td>Google / Gmail infrastructure used to send and manage our email.</td>
            </tr>
            <tr>
              <td>Accounting integration</td>
              <td>Intuit QuickBooks Online (client financial data, by authorization).</td>
            </tr>
          </tbody>
        </table>
        <p>
          This list may change as our tools evolve; we will keep it reasonably
          current. The named companies are controllers of the data they hold for
          their own purposes under their own privacy policies.
        </p>
      </LegalSection>

      <LegalSection id="retention" n={10} title="Data retention">
        <p>
          We keep personal information only for as long as it is needed for the
          purposes described in this policy, and then delete or de-identify it.
          How long that is depends on the data:
        </p>
        <ul>
          <li>
            <strong>Prospect and marketing data</strong> — kept while a relationship
            is active and for a reasonable period afterward, or until you unsubscribe
            or ask us to delete it.
          </li>
          <li>
            <strong>Client engagement and financial records</strong> — kept for the
            duration of the engagement and for the period required by applicable law,
            tax rules, and professional record-keeping standards, which can be several
            years after the engagement ends.
          </li>
          <li>
            <strong>Suppression / unsubscribe records</strong> — kept indefinitely
            where necessary to honor your opt-out and prevent future contact.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="security" n={11} title="Security">
        <p>
          We use administrative, technical, and physical safeguards designed to
          protect personal information, including access controls, encryption in
          transit, and reputable infrastructure providers. No method of transmission
          or storage is completely secure, however, and we cannot guarantee absolute
          security. You are responsible for keeping any credentials we issue you
          confidential and for notifying us promptly of any suspected compromise.
        </p>
      </LegalSection>

      <LegalSection id="rights" n={12} title="Your privacy rights">
        <p>
          Depending on where you live, you may have some or all of the following
          rights regarding your personal information:
        </p>
        <ul>
          <li>To <strong>access</strong> or receive a copy of the information we hold about you;</li>
          <li>To <strong>correct</strong> inaccurate information;</li>
          <li>To <strong>delete</strong> information, subject to legal and professional retention obligations;</li>
          <li>To <strong>opt out</strong> of marketing communications and of any &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information (we do not sell or share in that sense);</li>
          <li>To <strong>withdraw consent</strong> where processing is based on consent; and</li>
          <li>To be free from <strong>discrimination</strong> for exercising these rights.</li>
        </ul>
        <p>
          To exercise a right, email us at{" "}
          <a href={`mailto:${legal.contactEmail}`}>{legal.contactEmail}</a>. We will
          verify your request (typically by confirming control of the email address
          on file) and respond within the time required by applicable law. You may use
          an authorized agent where the law permits.
        </p>
      </LegalSection>

      <LegalSection id="state" n={13} title="U.S. state disclosures">
        <p>
          Some U.S. states, including California, grant residents specific rights
          such as the rights to know, delete, correct, and opt out described above.
          For those disclosures:
        </p>
        <ul>
          <li>
            We collect the categories of personal information listed in Section 2 for
            the business purposes listed in Section 4.
          </li>
          <li>
            We have <strong>not</strong> sold personal information, and do not
            &ldquo;share&rdquo; it for cross-context behavioral advertising, in the
            twelve months preceding the effective date of this policy.
          </li>
          <li>
            We do not use or disclose sensitive personal information for purposes that
            would require an opt-out right under these laws.
          </li>
        </ul>
        <p>
          You will not be discriminated against for exercising any of these rights.
        </p>
      </LegalSection>

      <LegalSection id="children" n={14} title="Children's privacy">
        <p>
          The Site and Services are intended for business owners and professionals
          and are not directed to children under 16. We do not knowingly collect
          personal information from children. If you believe a child has provided us
          information, contact us and we will delete it.
        </p>
      </LegalSection>

      <LegalSection id="intl" n={15} title="International users">
        <p>
          We operate in the United States, and our providers may process and store
          information in the United States and other countries. If you access the
          Site from outside the United States, you understand that your information
          may be transferred to and processed in the United States, where data-
          protection laws may differ from those in your location.
        </p>
      </LegalSection>

      <LegalSection id="changes" n={16} title="Changes to this policy">
        <p>
          We may update this policy from time to time. When we do, we will revise the
          &ldquo;Effective&rdquo; date at the top of the page, and material changes may
          be highlighted on the Site. Your continued use of the Site after an update
          takes effect constitutes acceptance of the revised policy.
        </p>
      </LegalSection>

      <LegalSection id="contact" n={17} title="Contact us">
        <p>
          Questions, requests, or complaints about this policy or your information
          can be sent to:
        </p>
        <p>
          <strong>{legal.entity}</strong>
          <br />
          Email: <a href={`mailto:${legal.contactEmail}`}>{legal.contactEmail}</a>
          {legal.postalAddress && (
            <>
              <br />
              {legal.postalAddress}
            </>
          )}
        </p>
      </LegalSection>
    </LegalShell>
  );
}
