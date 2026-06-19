export const acmeContent = {
  nav: {
    links: [
      { label: "Products", href: "#products" },
      { label: "Solutions", href: "#solutions" },
      { label: "Customers", href: "#customers" },
      { label: "Company", href: "#company" },
    ],
    signIn: "Sign in",
    cta: "Explore Acme coverage",
  },
  hero: {
    eyebrow: "Proposal for Revolut",
    headline: "Expand into SEA markets faster with done for you bank connectivity",
    subhead: "SEA and Singapore bank relationships, ready for integration in 8 to 12 weeks.",
    primaryCta: "Explore Acme coverage",
    secondaryCta: "Read API docs",
    trustLabel: "Trusted by the world's most forward-thinking teams",
    logos: [
      "Funding Societies",
      "Carousell",
      "M1",
      "Chocolate Finance",
      "Ripple",
      "Amadeus",
      "Xero",
      "Toyota",
      "StashAway",
      "Singlife",
    ],
  },
  proof: {
    eyebrow: "Bank connectivity",
    headline: "Unlock complete bank connectivity with one unified API platform",
    body:
      "Acme will represent you to engage with various banks, manage implementation and provide API middleware - all in one.",
    cta: "Learn about our APIs",
    metrics: [
      { value: "4-8 weeks", label: "Go live in 4 to 8 weeks" },
      { value: "80%", label: "cutting down the time taken by up to 80%" },
      { value: "600+ hours", label: "save more than 600 hours a year" },
      { value: "<2 minutes", label: "under 2 minutes" },
    ],
  },
  customer: {
    eyebrow: "Customer proof",
    cta: "See all customers",
    featured: [
      {
        id: "funding-societies",
        company: "Funding Societies",
        sector: "SME lending · 5 markets",
        headline:
          "Funding Societies saves >600 hours a year on recognition and reconciliation",
        tags: ["Direct Bank Integrations", "Collections", "Automated Reconciliation"],
        quote:
          "Instead of having to hire more headcount, working with Acme helped us save more than 600 hours a year on recognition and reconciliation.",
        attribution: "Jing Cheng Ng, Head of Operations, Funding Societies",
        monogram: "FS",
        accent: { hex: "#ec652b", soft: "#fbf1ea", contrast: "#ffffff" },
        asset: "stack" as const,
        stack: {
          primary: {
            label: "Operating Account",
            value: "$4,520,118.42",
            suffix: "SGD",
            sparkline: [44, 38, 42, 30, 34, 22, 26, 16, 20, 10, 14],
          },
          secondary: { label: "Collections Account", value: "$1,820,640.10", suffix: "SGD" },
        },
        loanStack: [
          { name: "Audrey Martell", amount: "$8,871.72", pill: "Home equity", meta: "7-year term" },
          { name: "Linda Hawthorne", amount: "$20,203.23", pill: "Debt consolidation", meta: "5-year term" },
          { name: "Jacob Reyes", amount: "$24,500.00", pill: "Credit card refinancing", meta: "Jun 10, 2026" },
        ],
        liveSince: "Live on Acme since 2022",
        flow: {
          source: { label: "Investor inflows", sub: "PayNow · GIRO" },
          hub: { label: "Acme reconciliation", sub: "Real-time match · idempotent" },
          destinations: [
            { label: "Borrower disbursement", bank: "DBS ···· 8421" },
            { label: "Operating reserve", bank: "UOB ···· 6620" },
          ],
        },
        ledger: [
          { id: "RCNL-2402", time: "2s", status: "MATCHED", amount: "$840.10", note: "DBS · disbursement" },
          { id: "RCNL-2401", time: "11s", status: "MATCHED", amount: "$2,140.00", note: "UOB · payout" },
          { id: "RCNL-2400", time: "27s", status: "MATCHED", amount: "$580.50", note: "DBS · disbursement" },
          { id: "RCNL-2399", time: "44s", status: "MATCHED", amount: "$1,210.40", note: "UOB · payout" },
        ],
        coverage: ["DBS", "UOB", "OCBC", "PayNow", "GIRO"],
        expansionArc: [
          { year: "'22", label: "1 bank", anchor: false },
          { year: "'23", label: "+ GIRO", anchor: false },
          { year: "'24", label: "+ UOB · OCBC", anchor: false },
          { year: "'26", label: "5-bank SG", anchor: true },
        ],
        headline_metric: { label: "Reconciled / week", value: "$8.4M" },
        side_metric: { label: "Hours saved / yr", value: "600+" },
      },
      {
        id: "stashaway",
        company: "StashAway",
        sector: "Digital wealth · 4 markets",
        headline: "StashAway built instant eGIRO with Acme to drive 50% net new adoption",
        tags: ["eGIRO Collections", "Real-time Recognition", "Wealth Platform"],
        quote:
          "Even before any marketing, we saw a lot of organic adoption for eGIRO. 50% of new adopters were customers who had never used eGIRO before.",
        attribution: "Jensen Bryan Ching, Engineering Manager, StashAway",
        monogram: "SA",
        accent: { hex: "#5a4ad1", soft: "#f1f0fb", contrast: "#ffffff" },
        asset: "flow" as const,
        stack: {
          primary: {
            label: "Customer Funds",
            value: "$12,840,920.00",
            suffix: "SGD",
            sparkline: [40, 36, 30, 34, 28, 24, 26, 18, 22, 14, 12],
          },
          secondary: { label: "eGIRO Inflows · today", value: "$624,210.00", suffix: "SGD" },
        },
        liveSince: "Live on Acme since 2021",
        flow: {
          source: { label: "Customer top-ups", sub: "eGIRO · PayNow" },
          hub: { label: "Acme reconciliation", sub: "T+0 allocation · ledger" },
          destinations: [
            { label: "Custody allocation", bank: "OCBC ···· 0917" },
            { label: "Trading account", bank: "DBS ···· 8421" },
          ],
        },
        ledger: [
          { id: "EGRO-9182", time: "1s", status: "ALLOCATED", amount: "$8,420.00", note: "OCBC · custody" },
          { id: "EGRO-9181", time: "8s", status: "ALLOCATED", amount: "$2,140.00", note: "DBS · trading" },
          { id: "EGRO-9180", time: "19s", status: "ALLOCATED", amount: "$640.00", note: "OCBC · custody" },
          { id: "EGRO-9179", time: "31s", status: "ALLOCATED", amount: "$1,820.00", note: "DBS · trading" },
        ],
        coverage: ["OCBC", "DBS", "UOB", "eGIRO", "PayNow"],
        expansionArc: [
          { year: "'21", label: "1 collection rail", anchor: false },
          { year: "'23", label: "+ eGIRO", anchor: false },
          { year: "'24", label: "+ payout rail", anchor: false },
          { year: "'26", label: "Full T+0 ops", anchor: true },
        ],
        headline_metric: { label: "Allocation latency", value: "1.8s" },
        side_metric: { label: "Net new adopters", value: "50%" },
      },
      {
        id: "zalora",
        company: "Zalora",
        sector: "E-commerce · SEA",
        headline: "ZALORA shipped PayLah! and PayNow in a quarter of the build time",
        tags: ["PayNow", "PayLah!", "Direct Bank Integrations"],
        quote:
          "Acme abstracted all the complex details and made the entire integration journey smoother and faster than going direct to the bank.",
        attribution: "Akanksha Saxena, Senior Engineering Manager, Zalora",
        monogram: "Z",
        accent: { hex: "#c8336e", soft: "#fbf0f4", contrast: "#ffffff" },
        asset: "stack" as const,
        stack: {
          primary: {
            label: "PayNow Inbound · today",
            value: "$384,210.00",
            suffix: "SGD",
            sparkline: [42, 36, 38, 28, 32, 30, 22, 24, 14, 18, 8],
          },
          secondary: { label: "PayLah! Inbound · today", value: "$192,640.00", suffix: "SGD" },
        },
        loanStack: [
          { name: "Mei Tan", amount: "$148.00", pill: "PayNow checkout", meta: "Order #77204" },
          { name: "Ravi Kumar", amount: "$92.50", pill: "PayLah! checkout", meta: "Order #77203" },
          { name: "Aisha Lim", amount: "$248.00", pill: "PayNow checkout", meta: "Order #77202" },
        ],
        liveSince: "Live on Acme since 2023",
        flow: {
          source: { label: "Customer checkout", sub: "PayNow · PayLah!" },
          hub: { label: "Acme reconciliation", sub: "Order ↔ inbound match" },
          destinations: [
            { label: "Merchant settlement", bank: "UOB ···· 6620" },
            { label: "Refund float", bank: "DBS ···· 8421" },
          ],
        },
        ledger: [
          { id: "ORD-77204", time: "1s", status: "SETTLED", amount: "$184.00", note: "UOB · merchant" },
          { id: "ORD-77203", time: "6s", status: "SETTLED", amount: "$92.50", note: "UOB · merchant" },
          { id: "ORD-77202", time: "14s", status: "SETTLED", amount: "$248.00", note: "UOB · merchant" },
          { id: "ORD-77201", time: "23s", status: "REFUND", amount: "$48.00", note: "DBS · float" },
        ],
        coverage: ["UOB", "DBS", "PayNow", "PayLah!", "FAST"],
        expansionArc: [
          { year: "'23", label: "PayNow only", anchor: false },
          { year: "'24", label: "+ PayLah!", anchor: false },
          { year: "'25", label: "+ refund float", anchor: false },
          { year: "'26", label: "Full checkout", anchor: true },
        ],
        headline_metric: { label: "Build time saved", value: "75%" },
        side_metric: { label: "Inbound rails", value: "4 live" },
      },
      {
        id: "kilde",
        company: "Kilde",
        sector: "Private investment · cross-border",
        headline: "Kilde automated investor money movement with real-time recognition",
        tags: ["Real-time Recognition", "Automated Payouts", "Investment Platform"],
        quote:
          "Investing in automation early on for payments is key to driving speed, reliability, and security. Acme let us do that without the manual work.",
        attribution: "Radek Jezbera, CEO and Co-Founder, Kilde",
        monogram: "K",
        accent: { hex: "#167e6c", soft: "#eef6f3", contrast: "#ffffff" },
        asset: "flow" as const,
        stack: {
          primary: {
            label: "Investor Inflows",
            value: "$2,418,500.00",
            suffix: "SGD",
            sparkline: [38, 34, 32, 28, 30, 22, 24, 18, 14, 12, 10],
          },
          secondary: { label: "Payouts · this week", value: "$1,184,210.00", suffix: "SGD" },
        },
        liveSince: "Live on Acme since 2022",
        flow: {
          source: { label: "Investor inflows", sub: "Wire · cross-border" },
          hub: { label: "Acme reconciliation", sub: "Multi-currency match" },
          destinations: [
            { label: "Fund custody", bank: "Citi ···· 4471" },
            { label: "Investor payout", bank: "HSBC ···· 9028" },
          ],
        },
        ledger: [
          { id: "INVR-3304", time: "3s", status: "MATCHED", amount: "$24,800.00", note: "Citi · custody" },
          { id: "INVR-3303", time: "12s", status: "MATCHED", amount: "$8,420.00", note: "HSBC · payout" },
          { id: "INVR-3302", time: "29s", status: "MATCHED", amount: "$48,200.00", note: "Citi · custody" },
          { id: "INVR-3301", time: "51s", status: "MATCHED", amount: "$12,640.00", note: "HSBC · payout" },
        ],
        coverage: ["Citi", "HSBC", "SCB", "GIRO", "Wire"],
        expansionArc: [
          { year: "'22", label: "1 custody bank", anchor: false },
          { year: "'23", label: "+ payout rail", anchor: false },
          { year: "'25", label: "+ HSBC · SCB", anchor: false },
          { year: "'26", label: "3-bank custody", anchor: true },
        ],
        headline_metric: { label: "Reconciled real-time", value: "100%" },
        side_metric: { label: "Custody banks", value: "3 live" },
      },
    ],
  },
  api: {
    eyebrow: "Unified APIs",
    headline: "One API that connects to all your bank accounts",
    body:
      "Use Acme's unified APIs to connect directly to your bank accounts with full control and flexibility.",
    codeTitle: "List Transactions",
    codeLines: [
      "curl https://api.tryacme.com/v1/transactions \\",
      "  --header 'Authorization: Bearer YOUR_API_KEY'",
    ],
    details: [
      {
        title: "One REST API abstracts all bank protocols",
        body:
          "API, SFTP, and file formats are normalized behind a single developer surface, so you just have integrate once.",
      },
      {
        title: "Acme never touches or holds your money",
        body:
          "You retain full ownership of your bank credentials and accounts while Acme handles the connectivity middleware.",
      },
    ],
  },
  developerFirst: {
    eyebrow: "Developer First",
    headline: "The only bank built from the ground up for developers",
    body: "Acme was built by engineers to solve our own frustrations from working with existing banks.",
    ctaLabel: "Read our docs",
    ctaHref: "https://docs.tryacme.com/reference",
    transaction: {
      amount: "$3,923.70",
      rail: "ACH",
      direction: "Outgoing",
      status: "Submitted",
      sender: "Column NA",
      receiver: "Chase Account",
    },
    response: [
      { n: 1, text: "{" },
      { n: 2, text: '  "id": "acht_2HKbYE2th2sFioBxrRFOZL3IHR4",' },
      { n: 3, text: '  "iat": null,' },
      { n: 4, text: '  "type": "CREDIT",' },
      { n: 5, text: '  "amount": 392370,' },
      { n: 6, text: '  "status": "SUBMITTED",' },
      { n: 7, text: '  "counterparty_id": "cpty_1vWeqakwT2N7NYRtZkUPSBt4s",' },
      { n: 8, text: '  "company_name": "COLUMN NA",' },
      { n: 9, text: '  "is_on_us": false,' },
      { n: 10, text: '  "same_day": false,' },
      { n: 11, text: '  "company_id": "9959349647",' },
      { n: 12, text: '  "created_at": "2022-11-09T23:32:47Z",' },
      { n: 13, text: '  "settled_at": null,' },
      { n: 14, text: '  "updated_at": "2022-11-09T23:32:48Z",' },
    ],
    pillars: [
      {
        title: "Close to the metal",
        body: "We built our core, ledger, and tech stack from scratch. We run our own dedicated hardware that connects to the Federal Reserve, TCH, and Swift to give you granular control and freedom from vendors and middleware.",
      },
      {
        title: "Scale for every size",
        body: "We move at your speed and speak your language. Acme is the only bank with the technology, experience, and balance sheet to grow with you through any stage: from seed-stage fintech to global financial institution.",
      },
    ],
  },
  infrastructure: {
    eyebrow: "Infrastructure",
    headline: "Connect via APIs to your own bank accounts",
    body:
      "Connect with your bank directly to retrieve bank statements and trigger payments. Go live in 4 to 8 weeks and cut down the time taken by up to 80%.",
    products: [
      {
        title: "Direct Bank Integrations",
        body:
          "Connect with your bank directly to retrieve bank statements and trigger payments.",
        code: "GET /v1/bank_accounts/{id}/transactions",
      },
      {
        title: "ERP Integration",
        body: "Connect your bank with your ERP.",
        code: "POST /v1/erp/sync/bank_feeds",
      },
      {
        title: "Collections",
        body:
          "Collect via Direct Debit or RTP such as PayNow, FPX, FPS, DuitNow, and Prompt Pay.",
        code: "POST /v1/collections/direct_debits",
      },
      {
        title: "Payouts",
        body:
          "Trigger payouts and reconcile every instruction against bank statements.",
        code: "POST /v1/payouts",
      },
    ],
    capabilities: [
      "Instant Transaction Notifications and Bank Feeds",
      "Payouts",
      "FX",
      "Multi-Bank Expansion",
      "Static Virtual Accounts",
    ],
  },
  solutions: {
    eyebrow: "Solutions",
    audiences: [
      "For Corporate Businesses",
      "For Investment, Lending and Insurance Platforms",
      "For Banks",
    ],
    headline: "Connect your ERP to all your banks through a single, secure connection",
    body:
      "We cut implementation timelines from 12 months to 6 weeks and manage every detail with your banks so your finance team doesn't have to.",
    useCases: ["Automated Bank Feeds", "Vendor Bill Pay"],
    workflow: [
      "Streamlined Connectivity to Banks",
      "ERP Connectors",
      "End-to-End Implementation",
      "Ongoing Support",
    ],
  },
  modules: {
    eyebrow: "Products",
    headline: "Building blocks for the future of financial products",
    groups: [
      {
        title: "Lightweight payments & deposit products",
        items: ["ACH", "Checks", "Wire", "Realtime", "Book Transfers", "International Wire", "Bank Accounts"],
      },
      {
        title: "Flexible card products for your program",
        items: ["Credit", "Debit", "Prepaid"],
      },
      {
        title: "Scale lending programs faster and cheaper",
        items: ["Loan Origination", "Loan Purchase", "Debt Financing"],
      },
    ],
  },
  cta: {
    headline: "Ready to simplify collections?",
    body: "Book a 15-min Intro Call and see how Acme can help you connect to your banks faster.",
    primaryCta: "Book a 15-min Intro Call",
    resources: [
      { title: "Documentation", body: "Explore our APIs" },
      { title: "Get started", body: "Talk to us about your use case" },
      { title: "Contact sales", body: "Connect with our team" },
    ],
    footerColumns: [
      {
        title: "Products",
        links: ["API", "Direct Bank", "eGIRO", "PayNow", "Security", "Pricing"],
      },
      {
        title: "Solutions",
        links: ["Corporate", "Wealth", "Lending", "Insurance", "Banking"],
      },
      {
        title: "Company",
        links: ["About", "Blog", "Careers", "Contact", "Privacy Policy"],
      },
    ],
  },
} as const;

export type AcmeContent = typeof acmeContent;
