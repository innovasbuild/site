/**
 * Legal text (English). Same structure as es.ts. Inline markup: **bold**, _italic_, and [text](link);
 * links that start with "/" are internal.
 */
import type { LegalDocument } from "./es"

export const labels = {
  eyebrow: "Legal",
  updated: "Last updated: August 2026",
  backHome: "← Back to home",
  seeTerms: "View Terms and Conditions",
  seePrivacy: "View Privacy Policy",
}

export const privacidad: LegalDocument = {
  title: "Privacy Policy",
  sections: [
    {
      title: "1. Introduction",
      blocks: [
        {
          p: `INNOV.AS ("INNOV.AS," "we," "us," "our") designs and operates agentic automation solutions, artificial intelligence agents, and data platforms for companies and organizations, and offers AI adoption programs for teams. This Privacy Policy describes how we collect, use, store, and protect the personal information we process in connection with our services and your use of our website, **innov.as**.`,
        },
        {
          p: `By using our services or interacting with our site, you accept the terms of this policy. If you don't agree, please don't use our services.`,
        },
      ],
    },
    {
      title: "2. Information we collect",
      blocks: [
        {
          p: `**Contact and inquiry information:** when you complete the contact form on our website, we collect your full name, email address, phone number, company, and the content of your message.`,
        },
        {
          p: `**Client operational data:** in the course of providing our services, we may process operational and business data supplied by the client (processes, systems, documentation) solely to design, build, and operate the agreed systems.`,
        },
        {
          p: `**Training program participant data:** when you enroll in an AI adoption program (for example, Desde Adentro), we collect your contact details, your company, and your progress in the program.`,
        },
        {
          p: `**Website usage data:** technical information such as IP address, browser type, pages visited, and session length, collected through standard web analytics tools.`,
        },
      ],
    },
    {
      title: "3. How we use your information",
      blocks: [
        { p: `We use the information we collect for the following purposes:` },
        {
          ul: [
            `To respond to inquiries and manage the sales and onboarding process.`,
            `To design, build, and operate the systems and programs you contract with us.`,
            `To improve and optimize our services, agents, and training content.`,
            `To comply with legal and contractual obligations.`,
            `To send service-related communications (project updates, reports, program news).`,
            `To prevent fraud and keep our systems secure.`,
          ],
        },
        {
          p: `We don't use personal data supplied by our clients for any purpose other than providing the agreed service.`,
        },
      ],
    },
    {
      title: "4. Legal basis for processing",
      blocks: [
        {
          ul: [
            `**Performance of a contract:** to deliver the services you contracted.`,
            `**Consent:** when the user gives it expressly (contact forms, program enrollment).`,
            `**Legitimate interest:** to improve our services and prevent fraud.`,
            `**Legal obligation:** when applicable law requires us to retain or report data.`,
          ],
        },
      ],
    },
    {
      title: "5. Sharing data with third parties",
      blocks: [
        {
          p: `INNOV.AS doesn't sell, rent, or trade personal data to third parties. We may share information in the following limited cases:`,
        },
        {
          ul: [
            `**Technology infrastructure providers:** hosting, cloud databases, and automation platforms (for example, n8n and Supabase) that act as data processors under confidentiality agreements.`,
            `**Integrations the client contracts for:** CRMs and other tools specified in the service agreement.`,
            `**Legal authorities:** when required by law or court order.`,
          ],
        },
        {
          p: `All third parties with access to personal data are bound by contractual confidentiality and security obligations.`,
        },
      ],
    },
    {
      title: "6. Data retention",
      blocks: [
        {
          ul: [
            `Contact form data: up to 24 months after the last interaction.`,
            `Client operational data: for the term of the contract and up to 12 months after it ends.`,
            `Program participant data: for the duration of the program and up to 12 months after it ends.`,
          ],
        },
        { p: `After these periods, we securely delete or anonymize the data.` },
      ],
    },
    {
      title: "7. Your rights",
      blocks: [
        {
          p: `Under applicable data protection law, you have the right to access, correct, and delete your personal data, to restrict or object to its processing, and to data portability.`,
        },
        {
          p: `To exercise any of these rights, including the **deletion of your personal data**, email us at [hola@innov.as](mailto:hola@innov.as) with the subject line "Exercise of rights" or "Data deletion request." We will respond within 30 business days.`,
        },
      ],
    },
    {
      title: "8. Data security",
      blocks: [
        {
          p: `We implement reasonable technical and organizational measures to protect personal information, including encryption in transit, role-based access control, and activity monitoring across our systems.`,
        },
      ],
    },
    {
      title: "9. Cookies and similar technologies",
      blocks: [
        {
          p: `Our website may use first-party and third-party cookies for analytics and functionality. You can set your browser to reject cookies, although this may affect how the site works.`,
        },
      ],
    },
    {
      title: "10. Minors",
      blocks: [
        {
          p: `Our services are intended exclusively for companies, organizations, and professionals. We don't knowingly collect personal data from anyone under 18.`,
        },
      ],
    },
    {
      title: "11. Changes to this policy",
      blocks: [
        {
          p: `We may update this Privacy Policy from time to time. The "last updated" date at the top of the document shows when it was last revised.`,
        },
      ],
    },
    {
      title: "12. Deleting your personal data",
      blocks: [
        { p: `You can request deletion of your personal data at any time by sending an email to:` },
        {
          card: {
            title: `Data deletion request`,
            lines: [`Email: [hola@innov.as](mailto:hola@innov.as)`],
            note: `Suggested subject line: _"Personal data deletion request."_ Include your full name and the email address or phone number associated with your account or interaction.`,
            highlight: true,
          },
        },
        { p: `We will process your request within 30 business days.` },
      ],
    },
    {
      title: "13. Contact",
      blocks: [
        { p: `For any questions about this policy or how we handle your data, contact us at:` },
        {
          card: {
            title: `INNOV.AS`,
            lines: [`Email: [hola@innov.as](mailto:hola@innov.as)`, `Web: [innov.as](https://innov.as)`],
          },
        },
      ],
    },
  ],
}

export const terminos: LegalDocument = {
  title: "Terms and Conditions",
  sections: [
    {
      title: "1. Acceptance of the terms",
      blocks: [
        {
          p: `These Terms and Conditions ("Terms") govern access to and use of the services of **INNOV.AS** ("INNOV.AS," "we," "us"), including the **innov.as** website and the data transformation, agentic automation, and AI adoption program services we provide to companies, organizations, and teams.`,
        },
        {
          p: `By contracting our services, accessing the website, or completing any contact form, the user states that they have read, understood, and accepted these Terms in full. If you act on behalf of a company or organization, you represent that you have the authority to bind it.`,
        },
        { p: `If you don't accept these Terms, you must not use our services or the website.` },
      ],
    },
    {
      title: "2. Description of the service",
      blocks: [
        {
          p: `INNOV.AS provides services to design and build data and artificial intelligence systems for companies and organizations. The services may include:`,
        },
        {
          ul: [
            `**Digital assistants and AI agents:** customer service, inquiries, document analysis, and other AI workflows, using judgment where judgment is needed and deterministic logic where precision is needed.`,
            `**Process automation bots:** orchestration with integration tools: approvals, reports, and synchronization between systems.`,
            `**Company Brain and data platforms:** platforms that bring together business information and decisions, and that scale to new units, verticals, or countries.`,
            `**Analytics and visualization:** dashboards and data platforms for operational decisions.`,
            `**AI adoption programs:** team training (for example, the Desde Adentro program) to build AI capabilities inside the client organization.`,
          ],
        },
        {
          p: `The specific scope of each service is set out in the commercial agreement signed by the parties. INNOV.AS reserves the right to modify, expand, or discontinue features with prior notice to the client.`,
        },
      ],
    },
    {
      title: "3. Nature of the service: AI systems and agents",
      blocks: [
        { p: `The client acknowledges that:` },
        {
          ul: [
            `The agents INNOV.AS builds are artificial intelligence systems that operate within workflows and parameters defined jointly with the client.`,
            `The agents are not human beings, and they act on the client's behalf according to the agreed configuration.`,
            `The quality and relevance of the responses depend in part on the information the client provides during discovery and configuration.`,
            `The client is ultimately responsible for the communications sent to its end users through INNOV.AS systems, and must make sure the configured content complies with applicable law.`,
          ],
        },
      ],
    },
    {
      title: "4. Methodology, assessment, and stages",
      blocks: [
        {
          p: `The service begins with an assessment process (Radar) and a discovery process (Method Map). When the client contracts a transformation stage, or "wave," the client and INNOV.AS agree on:`,
        },
        {
          ul: [
            `The workflow or process to implement.`,
            `The scope and price of the stage.`,
            `The acceptance criteria (UAT) that determine delivery.`,
          ],
        },
        {
          p: `The client agrees to provide, in full and on time, the information needed to design and configure the systems (processes, data, system access). Delays in providing this information may extend implementation timelines without liability for INNOV.AS.`,
        },
      ],
    },
    {
      title: "5. Plans, pricing, and billing",
      blocks: [
        {
          p: `Pricing and billing terms are set out in the specific commercial agreement. Unless stated otherwise:`,
        },
        {
          ul: [
            `Each stage or recurring service is billed as agreed in the service contract.`,
            `Prices don't include local taxes that may apply in the client's jurisdiction.`,
            `Non-payment of invoices for more than 15 business days may result in suspension of the service, after notice to the client.`,
          ],
        },
      ],
    },
    {
      title: "6. Client obligations",
      blocks: [
        { p: `The client agrees to:` },
        {
          ul: [
            `Use the service only for lawful purposes and in compliance with the law of its jurisdiction.`,
            `Obtain the consents it needs from its end users to process their data through INNOV.AS systems.`,
            `Not instruct INNOV.AS agents to send communications that are deceptive, fraudulent, or discriminatory, or that violate the rights of third parties.`,
            `Keep the configured access credentials and integrations confidential.`,
            `Notify INNOV.AS of any change in its operations that could affect how the systems are configured.`,
          ],
        },
      ],
    },
    {
      title: "7. Intellectual property",
      blocks: [
        {
          p: `All developments, methodologies, workflows, agent models, prompts, configurations, and systems created by INNOV.AS are and remain the exclusive intellectual property of INNOV.AS, even when they were designed specifically for a client's operation.`,
        },
        {
          p: `The client retains ownership of all of its own information that it provides for configuring the systems (data, processes, business information). INNOV.AS will not use that information for any purpose other than providing the contracted service.`,
        },
        {
          p: `The client receives a limited, non-exclusive, non-transferable license to use the configured systems for the term of the service contract.`,
        },
      ],
    },
    {
      title: "8. Confidentiality",
      blocks: [
        {
          p: `Both parties agree to keep confidential the information that the other party designates as confidential or that by its nature should be understood as confidential. This obligation continues for 3 years after the service agreement ends.`,
        },
        {
          p: `This obligation does not apply to information that is in the public domain, that the recipient already knew, or that must be disclosed by law or by a competent authority.`,
        },
      ],
    },
    {
      title: "9. Limitation of liability",
      blocks: [
        { p: `To the fullest extent permitted by applicable law, INNOV.AS will not be liable for:` },
        {
          ul: [
            `Indirect, incidental, special, or consequential damages, including lost profits, loss of data, or reputational harm.`,
            `Service interruptions caused by force majeure, failures of third-party platforms, or causes beyond INNOV.AS's reasonable control.`,
            `Specific business results. The impacts estimated in commercial proposals are projections based on industry benchmarks and are not a guarantee of results.`,
            `Decisions the client's team makes based on information the systems provide.`,
          ],
        },
        {
          p: `INNOV.AS's total cumulative liability to the client for any claim will not exceed the amount the client paid in the 3 months immediately before the event that gave rise to the claim.`,
        },
      ],
    },
    {
      title: "10. Cancellation and termination",
      blocks: [
        {
          p: `**By the client:** the client may cancel the service at any time with 30 calendar days' notice and no penalty, unless there is a fixed-term contract with specific conditions. Cancellation does not entitle the client to a refund for stages already invoiced.`,
        },
        {
          p: `**By INNOV.AS:** INNOV.AS may terminate the contract with immediate effect in the event of a serious breach of these Terms by the client, unlawful use of the service, or repeated non-payment. In less serious cases, INNOV.AS will give 30 days' notice.`,
        },
        {
          p: `**Effects of termination:** when the contract ends, INNOV.AS will make the client's own data available to the client in an exportable format for 30 days. After that period, the data will be deleted in accordance with the Privacy Policy.`,
        },
      ],
    },
    {
      title: "11. Changes to these terms",
      blocks: [
        {
          p: `INNOV.AS may modify these Terms from time to time. Changes take effect 30 days after they are published at [innov.as/en/terms](/en/terms), unless the law requires a longer period. Continued use of the service after that date means you accept the new Terms.`,
        },
      ],
    },
    {
      title: "12. Governing law and jurisdiction",
      blocks: [
        {
          p: `These Terms are governed by the laws of Argentina. Any dispute that the parties cannot resolve amicably will be submitted to the competent ordinary courts of the City of Buenos Aires, Argentina, and the parties expressly waive any other jurisdiction that might apply.`,
        },
      ],
    },
    {
      title: "13. Severability and entire agreement",
      blocks: [
        {
          p: `If any provision of these Terms is held invalid or unenforceable, the remaining provisions will stay in full force. These Terms, together with the specific commercial agreement and the Privacy Policy, are the entire agreement between the parties on the subject matter they cover.`,
        },
      ],
    },
    {
      title: "14. Contact",
      blocks: [
        { p: `For questions about these Terms:` },
        {
          card: {
            title: `INNOV.AS`,
            lines: [`Email: [hola@innov.as](mailto:hola@innov.as)`, `Web: [innov.as](https://innov.as)`],
          },
        },
      ],
    },
  ],
}
