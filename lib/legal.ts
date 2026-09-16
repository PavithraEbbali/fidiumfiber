/* =============================================================================
 *  lib/legal.ts  —  LEGAL & COMPLIANCE CONTENT
 * =============================================================================
 *  Long-form legal copy for every /<slug> compliance route, held as structured
 *  data rather than JSX so the pages stay consistent and a single dynamic route
 *  can render all of them.
 *
 *  Entity name, phone number, address, domain and mailboxes are never written
 *  out here — they are tokens resolved from SITE in lib/content.ts, so changing
 *  the business details in that one file updates all eleven legal pages.
 *
 *  Supported inline syntax inside any `text` string:
 *    {entity} {shortName} {phone} {address} {domain}
 *    {email:privacy}            → privacy@<domain>
 *    [link text](/some-route)   → an internal link
 * ---------------------------------------------------------------------------*/

import { SITE } from './content';

/* -------------------------------------------------------------------------- */
/*  TYPES                                                                     */
/* -------------------------------------------------------------------------- */

export type LegalBlock =
  | { type: 'h'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] };

export interface LegalDoc {
  slug: string;
  /** Page H1. */
  title: string;
  /** Label used in the footer and browser tab. */
  navLabel: string;
  /** Meta description. */
  description: string;
  /** Lede paragraph under the H1. */
  intro: string;
  /** Optional highlighted summary box at the top of the body. */
  summary?: string;
  blocks: LegalBlock[];
}

/* -------------------------------------------------------------------------- */
/*  TOKEN RESOLUTION                                                          */
/* -------------------------------------------------------------------------- */

type EmailKey = keyof typeof SITE.email;

/** Replaces every {token} in a string with its value from SITE. */
export function resolveTokens(input: string): string {
  return input
    .replace(/\{entity\}/g, SITE.entity)
    .replace(/\{shortName\}/g, SITE.shortName)
    .replace(/\{phone\}/g, SITE.phoneDisplay)
    .replace(/\{address\}/g, SITE.address)
    .replace(/\{domain\}/g, SITE.domain)
    .replace(/\{email:(\w+)\}/g, (_, key: string) => {
      const box = SITE.email[key as EmailKey] ?? SITE.email.general;
      return `${box}@${SITE.domain}`;
    });
}

/* -------------------------------------------------------------------------- */
/*  DOCUMENTS                                                                 */
/* -------------------------------------------------------------------------- */
/*  Order here is the order they appear in the footer legal row.              */
/* -------------------------------------------------------------------------- */

export const LEGAL_DOCS: LegalDoc[] = [
  /* ---------------------------------------------------------------- privacy */
  {
    slug: 'privacy',
    title: 'Privacy & Data Protection',
    navLabel: 'Privacy Policy',
    description:
      'How {entity} collects, uses, shares and protects information submitted through this website and our sales line.',
    intro:
      'This notice explains what {entity} collects when you use this website or call our sales line, how that information is used, and the choices available to you.',
    summary:
      'We collect only what we need to check Fidium Fiber availability at your address, help you order service, and support you afterward. We do not sell personal information, and you can ask us to access or delete it at any time.',
    blocks: [
      { type: 'h', text: 'Who we are' },
      {
        type: 'p',
        text: '{entity} is an independent authorized retailer of Fidium Fiber internet service. We help households confirm availability and place new residential orders. We are a separate company from Fidium, and this notice covers only our own practices. When you place an order, the details needed to provision service are passed to Fidium, whose own privacy practices then also apply.',
      },

      { type: 'h', text: 'Information we collect' },
      {
        type: 'ul',
        items: [
          'Information you give us. A ZIP code entered on this site, and the name, service address, email address, phone number and plan preference you share when you call our sales line.',
          'Information collected automatically. Standard web server and analytics data such as browser type, device type, referring page, pages viewed and approximate region derived from IP address.',
          'Call records. Calls to our sales line may be monitored or recorded for quality, training and compliance, where permitted by law.',
        ],
      },
      {
        type: 'p',
        text: 'We do not ask for payment card numbers, bank details, Social Security numbers or account passwords through this website. See our [PCI DSS statement](/pci-dss) for how payment information is handled when it is collected.',
      },

      { type: 'h', text: 'How we use information' },
      {
        type: 'ul',
        items: [
          'To confirm whether service is available at an address.',
          'To discuss plans and submit a new order on your behalf.',
          'To respond to questions about an order we placed.',
          'To measure site performance and improve our content.',
          'To meet legal, tax and recordkeeping obligations.',
        ],
      },

      { type: 'h', text: 'How information is shared' },
      {
        type: 'p',
        text: 'When you ask us to place an order, the details required to provision service are submitted to Fidium, which then holds your account and billing relationship directly. We also use service providers for hosting, telephony and analytics, who may process data on our behalf under contract.',
      },
      {
        type: 'p',
        text: 'We do not sell personal information. We may disclose information when required by law, valid legal process, or to protect our rights, our customers or the public.',
      },

      { type: 'h', text: 'Cookies and tracking' },
      {
        type: 'p',
        text: 'This site uses cookies and similar technologies to function correctly and to understand aggregate traffic patterns. Our [Cookies Policy](/cookies) describes each category and how to control it.',
      },

      { type: 'h', text: 'Data retention and security' },
      {
        type: 'p',
        text: 'We keep information only as long as needed for the purposes described here or as required by law, and we use reasonable administrative and technical safeguards to protect it. No method of transmission or storage is completely secure.',
      },

      { type: 'h', text: 'Your privacy rights' },
      {
        type: 'ul',
        items: [
          'Ask what personal information we hold about you, and request a copy.',
          'Request correction of inaccurate information.',
          'Request deletion of information we hold about you.',
          'Ask us to stop sending you marketing contact.',
          'Opt out of the sale or sharing of personal information.',
        ],
      },
      {
        type: 'p',
        text: 'Residents of some states have additional rights under state privacy law. See [Do Not Sell or Share My Personal Information](/do-not-sell).',
      },

      { type: 'h', text: 'Children' },
      {
        type: 'p',
        text: 'This site is intended for adults arranging residential service. We do not knowingly collect personal information from children under 13.',
      },

      { type: 'h', text: 'Changes to this notice' },
      {
        type: 'p',
        text: 'We may update this notice as our practices or the law change. The current version always appears on this page.',
      },

      { type: 'h', text: 'Contact us' },
      {
        type: 'p',
        text: '{entity}, {address}. Email {email:privacy} or call {phone}.',
      },
    ],
  },

  /* ------------------------------------------------------------------ terms */
  {
    slug: 'terms',
    title: 'Terms of Service',
    navLabel: 'Terms of Service',
    description: 'Terms governing use of the {entity} website.',
    intro:
      'These terms govern your use of this website, operated by {entity}. By using the site you agree to them.',
    blocks: [
      { type: 'h', text: 'Our role' },
      {
        type: 'p',
        text: '{entity} is an independent authorized retailer of Fidium Fiber. We are a separate company from Fidium. When you order through us, the resulting service agreement, account and billing relationship are between you and Fidium, and are governed by Fidium’s own terms and policies.',
      },

      { type: 'h', text: 'Pricing and availability' },
      {
        type: 'p',
        text: 'Plans, speeds, promotions and pricing shown on this site reflect published Fidium residential offers and are presented for informational purposes. All offers are subject to change, to serviceability at your address, and to Fidium’s approval and terms. Advertised rates require AutoPay with a bank account together with paperless billing, and exclude taxes, government fees and surcharges.',
      },
      {
        type: 'p',
        text: 'Speeds shown are the maximum wired speeds of each plan. Actual performance varies with equipment, in-home wiring, WiFi conditions and simultaneous usage. Nothing on this site is a guarantee of service, pricing or installation date until an order is confirmed by Fidium. See our [Disclaimer](/disclaimer) for more detail.',
      },

      { type: 'h', text: 'Acceptable use' },
      {
        type: 'ul',
        items: [
          'Use the site only for lawful purposes.',
          'Do not attempt to interfere with, probe or gain unauthorized access to the site or any system connected to it.',
          'Do not scrape, republish or reproduce site content for commercial use without written permission.',
        ],
      },

      { type: 'h', text: 'Intellectual property' },
      {
        type: 'p',
        text: 'Site design, layout, original copy and graphics are owned by {entity}. Fidium, Fidium Fiber and all related names, logos and marks are the property of their respective owners. See our [Trademarks notice](/trademarks).',
      },

      { type: 'h', text: 'Third-party links' },
      {
        type: 'p',
        text: 'The site may link to pages we do not control. We are not responsible for the content, accuracy or practices of those sites.',
      },

      { type: 'h', text: 'Disclaimer of warranties' },
      {
        type: 'p',
        text: 'This site is provided on an “as is” and “as available” basis without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose and non-infringement. We do not warrant that the site will be uninterrupted, error free, or that the information on it is complete or current at all times.',
      },

      { type: 'h', text: 'Limitation of liability' },
      {
        type: 'p',
        text: 'To the fullest extent permitted by law, {entity} is not liable for indirect, incidental, special, consequential or punitive damages, or for lost profits or data, arising from your use of this site. Our total liability for any claim relating to the site is limited to one hundred United States dollars.',
      },

      { type: 'h', text: 'Indemnification' },
      {
        type: 'p',
        text: 'You agree to indemnify and hold harmless {entity} and its officers, employees and agents from claims arising out of your misuse of the site or breach of these terms.',
      },

      { type: 'h', text: 'Governing law' },
      {
        type: 'p',
        text: 'These terms are governed by the laws of the state in which {entity} maintains its principal place of business, without regard to conflict of law rules.',
      },

      { type: 'h', text: 'Changes' },
      {
        type: 'p',
        text: 'We may revise these terms at any time. Continued use of the site after a change means you accept the revised terms.',
      },

      { type: 'h', text: 'Contact' },
      { type: 'p', text: '{entity}, {address}. Email {email:legal} or call {phone}.' },
    ],
  },

  /* ------------------------------------------------------------- disclaimer */
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    navLabel: 'Disclaimer',
    description:
      'Informational scope, retailer relationship, pricing, speed and promotion disclaimers for the {entity} website.',
    intro:
      'This site helps you learn about and order Fidium Fiber service through an authorized retailer. Pricing, speeds, promotions and availability are set by Fidium and can change, so confirm current terms before you order.',
    blocks: [
      { type: 'h', text: 'Informational purposes only' },
      {
        type: 'p',
        text: 'The content on this website is provided for general informational purposes only and is offered in good faith. While we work to keep it accurate and current, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability or suitability of the information. Nothing here constitutes professional, legal, financial or technical advice.',
      },

      { type: 'h', text: 'Authorized retailer relationship' },
      {
        type: 'p',
        text: 'This website is operated by {entity}, an independent authorized retailer of Fidium Fiber internet service. It is not operated by Fidium or its parent company. Service is provided, delivered and supported by Fidium under its own terms of service, which control in the event of any conflict with information shown here. See our [Trademarks notice](/trademarks) for details on brand ownership.',
      },

      { type: 'h', text: 'Pricing and availability are subject to change' },
      {
        type: 'p',
        text: 'Plans, prices, fees, equipment and features are determined by Fidium and may change at any time without notice. Service availability varies by address and is not guaranteed until confirmed for your specific location. Taxes, surcharges and other charges may apply and are not always reflected in advertised prices.',
      },

      { type: 'h', text: 'Advertised speeds' },
      {
        type: 'p',
        text: 'Advertised speeds are maximum wired speeds and are not guaranteed. Actual speeds vary based on plan, equipment, in-home wiring, WiFi conditions, device capabilities, network congestion and other factors. WiFi speeds are typically lower than wired speeds.',
      },

      { type: 'h', text: 'Promotions and offers' },
      {
        type: 'p',
        text: 'Promotional pricing and offers are subject to eligibility, enrollment requirements and other conditions set by Fidium, including AutoPay with a bank account and paperless billing. Offers may be modified or withdrawn at any time. Ask us for the current terms before enrolling.',
      },

      { type: 'h', text: 'External links' },
      {
        type: 'p',
        text: 'Our site may link to third-party websites for your convenience. We do not control and are not responsible for the content, policies or practices of any third-party site. A link does not imply endorsement.',
      },

      { type: 'h', text: 'Limitation of liability' },
      {
        type: 'p',
        text: 'To the fullest extent permitted by law, we will not be liable for any loss or damage arising from your use of, or reliance on, this website or its content, including direct, indirect, incidental, consequential or punitive damages. Your use of the site is at your own risk.',
      },

      { type: 'h', text: 'Contact' },
      { type: 'p', text: '{entity}, {address}. Email {email:general} or call {phone}.' },
    ],
  },

  /* ---------------------------------------------------- service fulfillment */
  {
    slug: 'service-fulfillment',
    title: 'Service Fulfillment',
    navLabel: 'Service Fulfillment',
    description:
      'What to expect from ordering through {entity}: availability checks, installation, equipment, activation and billing.',
    intro:
      'We help you check availability and place your order. Fidium Fiber service, installation, equipment and billing are delivered by Fidium under its terms. Here is what to expect from start to finish.',
    blocks: [
      { type: 'h', text: 'Our role as an authorized retailer' },
      {
        type: 'p',
        text: '{entity} is an independent authorized retailer. We assist with plan selection, availability checks and order placement. The underlying internet service is provisioned, installed, maintained and billed by Fidium, whose terms of service govern your account.',
      },

      { type: 'h', text: 'How ordering works' },
      {
        type: 'ul',
        items: [
          'Check availability: give us the service address so we can confirm the fiber network reaches your location.',
          'Choose a plan: we review speeds, pricing, current promotions and equipment with you.',
          'Place the order: we collect the details needed to schedule installation and set up your account.',
        ],
      },

      { type: 'h', text: 'Installation' },
      {
        type: 'p',
        text: 'Professional installation is included and performed by a certified technician. A typical install takes two to four hours and includes running the fiber connection, setting up your gateway, confirming coverage and verifying your plan speed. Appointment availability depends on scheduling and site conditions.',
      },

      { type: 'h', text: 'Equipment' },
      {
        type: 'p',
        text: 'Gig and faster plans include a whole-home WiFi gateway, with WiFi 7 gateways and extenders on eligible higher tiers. Equipment remains subject to Fidium’s terms, including any return requirements if service ends. Do not discard Fidium equipment.',
      },

      { type: 'h', text: 'Activation and speed verification' },
      {
        type: 'p',
        text: 'Service is activated at installation. Your technician verifies a wired speed test consistent with your plan before completing the visit. WiFi speeds are typically lower than wired speeds and vary by device and environment.',
      },

      { type: 'h', text: 'Billing and payments' },
      {
        type: 'p',
        text: 'Billing is handled by Fidium. Charges may include your monthly plan price, applicable taxes, surcharges and any one-time fees disclosed before you order. Advertised rates require AutoPay with a bank account together with paperless billing. Payment card handling follows our [PCI DSS statement](/pci-dss).',
      },

      { type: 'h', text: 'Changes, cancellations and moves' },
      {
        type: 'p',
        text: 'Fidium Fiber plans are month to month with no term commitment and no early termination fee. To change, cancel or move service, contact us and we will help coordinate with Fidium. Refunds and any equipment returns follow Fidium’s policies.',
      },

      { type: 'h', text: 'Placing an order' },
      {
        type: 'p',
        text: 'To start a new residential order, call {phone} or email {email:support}.',
      },
    ],
  },

  /* --------------------------------------------------------------- cookies */
  {
    slug: 'cookies',
    title: 'Cookies Policy',
    navLabel: 'Cookies Policy',
    description:
      'The cookie categories used on the {entity} website and how to control them.',
    intro:
      'This policy explains what cookies are, which categories this site uses, and how to change your choices at any time.',
    summary:
      'Only strictly necessary cookies are set by default. Analytics and advertising cookies run where you allow them, or where consent is not required by law. You can change your mind at any time.',
    blocks: [
      { type: 'h', text: 'What cookies are' },
      {
        type: 'p',
        text: 'Cookies are small text files placed on your device when you visit a website. They help the site work, remember your preferences, and show how the site is used. Some cookies are set by us (first-party) and some by our service partners (third-party).',
      },

      { type: 'h', text: 'Categories we use' },
      {
        type: 'ul',
        items: [
          'Strictly necessary. Required for the site to function, for example security, load balancing and remembering your cookie choices. These cannot be switched off.',
          'Performance and analytics. Help us understand which pages are popular and how visitors move through the site. The data is aggregated and used for measurement.',
          'Functional. Remember choices you make, such as region or form details, for a smoother experience.',
          'Advertising and targeting. Used to measure and improve advertising and, in some cases, to show more relevant ads on other sites.',
        ],
      },
      {
        type: 'p',
        text: 'Advertising cookies may be considered “sharing” of personal information under some state laws. See [Do Not Sell or Share My Personal Information](/do-not-sell).',
      },

      { type: 'h', text: 'Similar technologies' },
      {
        type: 'p',
        text: 'We may also use pixels and web beacons, local storage and software development kits that work like cookies to deliver, measure and secure the site and our advertising.',
      },

      { type: 'h', text: 'Third-party cookies' },
      {
        type: 'p',
        text: 'Analytics and advertising partners may set their own cookies subject to their privacy policies, and we encourage you to review those policies. We do not control third-party cookies beyond choosing which partners we work with and honouring your consent signals.',
      },

      { type: 'h', text: 'Managing your cookies' },
      {
        type: 'ul',
        items: [
          'Use the on-site cookie banner or preference centre to accept or reject non-essential categories.',
          'Adjust your browser settings to block or delete cookies. This may affect site functionality.',
          'Opt out of certain advertising through industry tools such as the DAA and NAI opt-out pages.',
          'We honour recognised opt-out preference signals, such as Global Privacy Control, where required by law.',
        ],
      },

      { type: 'h', text: 'Consent and changes' },
      {
        type: 'p',
        text: 'Where required, we ask for your consent before setting non-essential cookies. We may update this policy to reflect changes in technology or law, and the current version always appears on this page.',
      },

      { type: 'h', text: 'Contact' },
      {
        type: 'p',
        text: 'Questions about cookies? Email {email:privacy} or call {phone}. Our full [Privacy & Data Protection notice](/privacy) has more detail.',
      },
    ],
  },

  /* ------------------------------------------------------------ do not sell */
  {
    slug: 'do-not-sell',
    title: 'Do Not Sell or Share My Personal Information',
    navLabel: 'Do Not Sell My Info',
    description: 'How to exercise state privacy rights with {entity}.',
    intro:
      'Some states give residents the right to opt out of the sale or sharing of personal information. Here is where {entity} stands, and how to exercise those rights.',
    blocks: [
      { type: 'h', text: 'We do not sell personal information' },
      {
        type: 'p',
        text: '{entity} does not sell personal information, and we do not share it for cross-context behavioural advertising. Information you give us is used to check availability at your address, discuss plans and submit a new order to Fidium at your request.',
      },

      { type: 'h', text: 'Your rights' },
      {
        type: 'ul',
        items: [
          'Know what personal information we have collected about you.',
          'Request a copy of that information.',
          'Request that we correct inaccurate information.',
          'Request that we delete information we hold about you.',
          'Opt out of the sale or sharing of personal information.',
          'Not be discriminated against for exercising these rights.',
        ],
      },

      { type: 'h', text: 'How to make a request' },
      {
        type: 'p',
        text: 'Call {phone} and tell the representative you are making a privacy request, email {email:privacy}, or write to {entity}, {address}.',
      },
      {
        type: 'p',
        text: 'Please include the name, phone number and service address you used with us so we can locate your records. We verify your identity before acting, and we respond within the timeframe your state law requires.',
      },

      { type: 'h', text: 'Authorized agents' },
      {
        type: 'p',
        text: 'You may use an authorized agent to submit a request. We will ask for written proof of that authorization and may still verify your identity directly.',
      },

      { type: 'h', text: 'Browser opt-out signals' },
      {
        type: 'p',
        text: 'Where required, we honour recognised opt-out preference signals such as Global Privacy Control sent by your browser.',
      },

      { type: 'h', text: 'Your Fidium account' },
      {
        type: 'p',
        text: 'Once service is installed, your account and billing relationship are held directly by Fidium. Privacy rights relating to that account are handled under Fidium’s own privacy program.',
      },

      { type: 'h', text: 'More detail' },
      {
        type: 'p',
        text: 'Our full [Privacy & Data Protection notice](/privacy) describes what we collect and how it is used.',
      },
    ],
  },

  /* ------------------------------------------------------------------ TCPA */
  {
    slug: 'tcpa',
    title: 'TCPA Policy & Consent',
    navLabel: 'TCPA Policy',
    description:
      'How {entity} handles calling and texting consent under the Telephone Consumer Protection Act.',
    intro:
      'This policy describes how {entity} complies with the federal Telephone Consumer Protection Act (TCPA) and related rules.',
    summary:
      'If you give us your phone number and ask us to contact you, you agree we and our authorized partners may call or text you about Fidium Fiber service, including with automated technology. You do not have to agree in order to buy anything, and you can stop messages at any time by replying STOP.',
    blocks: [
      { type: 'h', text: 'What you are consenting to' },
      {
        type: 'p',
        text: 'When you provide your telephone number and request information or service, you expressly consent to receive calls and text (SMS/MMS) messages from us and our authorized calling partners at that number, including messages made with an automatic telephone dialing system, an artificial or prerecorded voice, or automated texting technology. These communications may include:',
      },
      {
        type: 'ul',
        items: [
          'Availability results, quotes, order updates and appointment scheduling.',
          'Customer service, account and installation messages.',
          'Marketing and promotional offers about fiber internet service, where permitted.',
        ],
      },

      { type: 'h', text: 'Consent is not a condition of purchase' },
      {
        type: 'p',
        text: 'You are not required to agree to receive automated marketing calls or texts as a condition of purchasing any goods or services. You may still order service by contacting us directly by phone at {phone}.',
      },

      { type: 'h', text: 'Message frequency, rates and carriers' },
      {
        type: 'p',
        text: 'Message frequency varies. Message and data rates may apply according to your mobile plan. Carriers are not liable for delayed or undelivered messages. Supported carriers may change without notice.',
      },

      { type: 'h', text: 'How to opt out' },
      {
        type: 'ul',
        items: [
          'Text: reply STOP to any text message to unsubscribe, or HELP for help.',
          'Calls: tell the representative you wish to be placed on our internal Do Not Call list.',
          'Email: write to {email:optout} with your phone number and your request.',
        ],
      },
      {
        type: 'p',
        text: 'We honour opt-out requests within the timeframes required by law. Opting out of marketing does not stop non-marketing service messages related to an active order or account.',
      },

      { type: 'h', text: 'Do Not Call' },
      {
        type: 'p',
        text: 'We maintain an internal Do Not Call list and honour the National Do Not Call Registry. If you ask not to be contacted, we suppress your number from marketing outreach.',
      },

      { type: 'h', text: 'Call monitoring and recording' },
      {
        type: 'p',
        text: 'Calls may be monitored or recorded for quality, training and compliance purposes. Where required, you are notified at the start of the call.',
      },

      { type: 'h', text: 'Contact' },
      {
        type: 'p',
        text: '{entity} compliance. Email {email:optout} or call {phone}.',
      },
    ],
  },

  /* ------------------------------------------------------- marketing policy */
  {
    slug: 'marketing-policy',
    title: 'Marketing Policy',
    navLabel: 'Marketing Policy',
    description:
      'The advertising standards {entity} follows, including truthful claims, pricing disclosures and opt-out handling.',
    intro:
      'Advertising should be honest, clear and easy to act on. We market Fidium Fiber service truthfully, disclose the terms that matter, and make it simple to opt out.',
    blocks: [
      { type: 'h', text: 'Our commitment' },
      {
        type: 'p',
        text: 'As an authorized retailer, {entity} markets Fidium Fiber service in line with applicable law and platform rules, including the Federal Trade Commission Act, the CAN-SPAM Act, the Telephone Consumer Protection Act, state consumer-protection and advertising laws, and the advertising policies of the networks we advertise on, such as Google Ads and social platforms.',
      },

      { type: 'h', text: 'Truthful, substantiated claims' },
      {
        type: 'p',
        text: 'We describe plans, speeds and features accurately and avoid misleading or exaggerated statements. Performance claims such as speeds or reliability reflect information published by Fidium and are presented with appropriate context. Advertised speeds are maximum wired speeds and are not guaranteed.',
      },

      { type: 'h', text: 'Pricing and promotional disclosures' },
      {
        type: 'p',
        text: 'Where we advertise a price or promotion, we disclose the material conditions clearly and near the claim, including eligibility, AutoPay and paperless billing requirements, taxes and fees, and expiration. Introductory pricing and the conditions to keep it are identified as such.',
      },

      { type: 'h', text: 'Endorsements and testimonials' },
      {
        type: 'p',
        text: 'Any endorsements or testimonials we publish reflect the honest experience of real people and are not fabricated. Where an endorser is compensated or otherwise connected to us, we disclose that relationship. Illustrative examples used to explain a benefit are labelled as illustrative.',
      },

      { type: 'h', text: 'Email marketing' },
      {
        type: 'ul',
        items: [
          'We use accurate from, reply-to and subject lines that are not deceptive.',
          'Commercial email identifies itself as an advertisement where required and includes our valid physical mailing address.',
          'Every marketing email includes a working unsubscribe link, and we honour opt-outs promptly.',
        ],
      },

      { type: 'h', text: 'Text messaging' },
      {
        type: 'p',
        text: 'SMS and MMS marketing is sent only with the required consent and always offers a simple opt-out by replying STOP. See our [TCPA Policy](/tcpa) for full details on calling and texting consent.',
      },

      { type: 'h', text: 'Targeted advertising and your data' },
      {
        type: 'p',
        text: 'We may use cookies and advertising identifiers to measure and improve campaigns and, where permitted, to show relevant ads. You can control this through our [Cookies Policy](/cookies) and the choices described in our [Privacy & Data Protection notice](/privacy), including opting out of sale or sharing.',
      },

      { type: 'h', text: 'Partner and affiliate conduct' },
      {
        type: 'p',
        text: 'Any third parties who market on our behalf must follow this policy and applicable law. Deceptive, spammy or non-compliant promotion is prohibited, and we end relationships with partners who violate these standards.',
      },

      { type: 'h', text: 'Report a marketing concern' },
      {
        type: 'p',
        text: 'If you see an advertisement or message that seems off, tell us at {email:marketing} or call {phone} and we will look into it.',
      },
    ],
  },

  /* --------------------------------------------------------------- PCI DSS */
  {
    slug: 'pci-dss',
    title: 'PCI DSS & Payment Security',
    navLabel: 'PCI DSS',
    description:
      'How {entity} protects payment information and aligns with the Payment Card Industry Data Security Standard.',
    intro:
      'This statement explains how payment information is protected when it is collected in connection with a Fidium Fiber order.',
    summary:
      'We never ask for card details by email or text. Payments are handled through PCI-compliant processors using encryption, and we do not store full card numbers on this website.',
    blocks: [
      { type: 'h', text: 'Our commitment to payment security' },
      {
        type: 'p',
        text: '{entity} is committed to protecting payment information. Where payments are collected in connection with Fidium Fiber service, we work to align our practices with the Payment Card Industry Data Security Standard (PCI DSS).',
      },

      { type: 'h', text: 'What PCI DSS is' },
      {
        type: 'p',
        text: 'PCI DSS is a global security standard created by the major card brands to protect cardholder data. It sets requirements for securely handling, processing, storing and transmitting payment card information, including network security, encryption, access control and monitoring.',
      },

      { type: 'h', text: 'How we align with the standard' },
      {
        type: 'ul',
        items: [
          'We use reputable, PCI-DSS-compliant payment processors and gateways to capture and process payments.',
          'Card data is encrypted in transit using TLS and, where handled, is tokenized by our processor rather than stored by us.',
          'We minimise our scope by avoiding the storage of full card numbers, security codes or magnetic-stripe data on our systems.',
          'We apply access controls, so payment functions are limited to authorized personnel and vendors.',
          'We keep software and dependencies updated and monitor for security issues.',
        ],
      },

      { type: 'h', text: 'How cardholder data is handled' },
      {
        type: 'p',
        text: 'When you provide payment information to complete an order, it is transmitted securely to our payment processor or to Fidium for authorization. We do not sell payment information, and we retain only the limited transaction records needed for billing, fraud prevention and legal compliance.',
      },

      { type: 'h', text: 'Processors and vendors' },
      {
        type: 'p',
        text: 'Our payment processors maintain their own PCI DSS compliance and are responsible for the secure processing performed on their platforms. We choose vendors that demonstrate appropriate certifications and safeguards.',
      },

      { type: 'h', text: 'Your role in staying secure' },
      {
        type: 'ul',
        items: [
          'Only enter payment details on secure, official checkout pages. Look for HTTPS.',
          'We will never request your full card number, PIN or security code by email, text or social media.',
          'If someone claiming to represent us asks for payment in an unusual way, stop and call the number on this site to verify.',
        ],
      },

      { type: 'h', text: 'Report a security concern' },
      {
        type: 'p',
        text: 'If you suspect fraud or a security issue involving a payment, contact us immediately at {email:security} or {phone} so we can help and, where appropriate, coordinate with the processor and Fidium.',
      },
    ],
  },

  /* ------------------------------------------------------------ trademarks */
  {
    slug: 'trademarks',
    title: 'Trademarks',
    navLabel: 'Trademarks',
    description:
      'Trademark ownership and the nominative use of the Fidium name by {entity}.',
    intro:
      'Fidium and Fidium Fiber are trademarks of their owner. We are an authorized retailer and use these marks only to identify the services we help you order. We are not the trademark owner.',
    blocks: [
      { type: 'h', text: 'Trademark ownership' },
      {
        type: 'p',
        text: 'Fidium and Fidium Fiber, together with associated logos and product names, are trademarks and/or registered trademarks of their respective owner. All rights in those marks belong to their owner. Nothing on this website grants you any right or licence to use those marks.',
      },

      { type: 'h', text: 'Authorized retailer use' },
      {
        type: 'p',
        text: 'As an independent authorized retailer, {entity} uses the Fidium name and marks solely to identify and describe the fiber internet services we are authorized to market and sell. Such use is nominative and for identification only, consistent with the retailer relationship.',
      },

      { type: 'h', text: 'No endorsement or additional affiliation' },
      {
        type: 'p',
        text: 'Except for the authorized retailer relationship, this website is not endorsed by, sponsored by, or otherwise affiliated with the trademark owner. Statements, opinions and marketing copy on this site are our own and should not be attributed to the trademark owner.',
      },

      { type: 'h', text: 'Our marks' },
      {
        type: 'p',
        text: 'Our own business name, logo and site content, excluding third-party marks, are the property of {entity} and may not be used without our permission.',
      },

      { type: 'h', text: 'Third-party trademarks' },
      {
        type: 'p',
        text: 'All other product names, logos, brands and trademarks referenced on this site, including those of device makers and technology standards such as WiFi 7, are the property of their respective owners. Use of them does not imply any affiliation or endorsement.',
      },

      { type: 'h', text: 'Report trademark misuse' },
      {
        type: 'p',
        text: 'If you believe any content on this site misuses a trademark, contact us at {email:legal} or {phone} so we can review and address it promptly.',
      },
    ],
  },

  /* --------------------------------------------------------- accessibility */
  {
    slug: 'accessibility',
    title: 'Accessibility',
    navLabel: 'Accessibility',
    description: 'The {entity} commitment to an accessible website experience.',
    intro:
      '{entity} is committed to keeping this site usable for everyone, including visitors who rely on assistive technology.',
    blocks: [
      { type: 'h', text: 'Our commitment' },
      {
        type: 'p',
        text: 'We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. Accessibility is treated as an ongoing practice rather than a one-time audit, and it is considered whenever we change the site.',
      },

      { type: 'h', text: 'What is built in' },
      {
        type: 'ul',
        items: [
          'Semantic headings and landmarks so screen readers can navigate the page structure.',
          'A visible skip link to jump straight to the main content.',
          'Keyboard access to every interactive control, with a clear focus indicator.',
          'Text and interface colours checked for contrast against their backgrounds.',
          'Full support for the reduced-motion system setting: animations, smooth scrolling and background effects switch off when it is enabled.',
          'Descriptive labels on links and buttons, including phone links.',
          'Layouts that reflow without horizontal scrolling down to a 320 pixel viewport.',
          'Text that stays readable when zoomed or resized.',
        ],
      },

      { type: 'h', text: 'Ongoing work' },
      {
        type: 'p',
        text: 'We test with keyboard navigation, browser zoom and screen reader software, and we correct issues as they are identified. Some third-party content may not be fully under our control.',
      },

      { type: 'h', text: 'Telling us about a problem' },
      {
        type: 'p',
        text: 'If you encounter a barrier on this site, we want to hear about it. Call {phone} or email {email:general} and describe the page and what happened. We will work with you to provide the information you need in an accessible format.',
      },

      { type: 'h', text: 'Alternative ways to order' },
      {
        type: 'p',
        text: 'Every plan and price on this site can be reviewed and ordered over the phone with a representative, so no part of our service depends on being able to use the website.',
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  LOOKUPS                                                                   */
/* -------------------------------------------------------------------------- */

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return LEGAL_DOCS.find((d) => d.slug === slug);
}

export const LEGAL_SLUGS: string[] = LEGAL_DOCS.map((d) => d.slug);

/** Footer legal row. Generated, so adding a document adds its link. */
export const LEGAL_LINKS = LEGAL_DOCS.map((d) => ({
  label: d.navLabel,
  href: `/${d.slug}`,
}));
