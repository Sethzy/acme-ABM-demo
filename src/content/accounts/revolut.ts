import type { LandingCampaignContent } from "../landingSchema";

export const revolutLandingContent = {
  accountName: "Revolut",
  metadata: {
    title: "Acme for Revolut - SEA bank connectivity",
    description:
      "A Revolut-specific Acme proposal for expanding into SEA markets faster with implementation-ready bank connectivity and bank relationships prepared for integration in 8 to 12 weeks.",
  },
  hero: {
    eyebrow: "Proposal for Revolut",
    headline: "Expand into SEA markets faster with implementation-ready bank connectivity",
    subhead: "Singapore and SEA bank relationships prepared for integration in 8 to 12 weeks.",
    primaryCta: "Explore Acme coverage",
    secondaryCta: "Read API docs",
  },
  process: {
    title: "Recommended starting points for Revolut.",
    body:
      "Acme recommends DBS, UOB, and OCBC as Revolut's first Singapore bank sequence, mapped against known capabilities across virtual accounts, FAST and PayNow collections, statements, reconciliation, and launch coordination.",
    cards: [
      {
        step: "01",
        label: "Recommendation",
        title: "Top-three bank sequence",
        body:
          "Lead with DBS as the primary first-bank path, then sequence UOB and OCBC for coverage depth, redundancy, and rail-by-rail launch flexibility.",
      },
      {
        step: "02",
        label: "Capabilities",
        title: "Known capability map",
        body:
          "Map each recommended bank against the account structures, collection rails, statement feeds, reconciliation patterns, and implementation dependencies Revolut needs for launch planning.",
      },
      {
        step: "03",
        label: "Launch plan",
        title: "One launch plan per bank",
        body:
          "Convert each target bank into a clear view of supported virtual accounts, FAST, PayNow, statements, direct debit, payouts, implementation dependencies, and expected timeline.",
      },
    ],
  },
  launch: {
    title: "What Revolut can launch faster.",
    body:
      "These are the Singapore workflows Revolut can sequence first, then map bank by bank against the partners and rails selected for go-live.",
    cards: [
      {
        title: "Named virtual accounts",
        body:
          "For Revolut Business, prioritize static virtual-account setups that preserve the underlying customer or business identity and align to each bank's available account structures.",
      },
      {
        title: "PayNow and FAST deposits",
        body:
          "Support QR top-ups, FAST-in notifications, and reference handling for Singapore deposit flows without treating one bank's data shape as the standard.",
      },
      {
        title: "Local payouts",
        body:
          "Identify which banks can support payout initiation, sender-account selection, validation rules, and a phased rollout from virtual accounts to withdrawals.",
      },
      {
        title: "Statements and reconciliation",
        body:
          "Validate ICNs, hourly statements, and daily statements so missed webhooks and duplicate FAST entries are handled before production operations scale.",
      },
    ],
  },
  contact: {
    eyebrow: "FOR THE REVOLUT TEAM",
    title: "See the Singapore launch path",
    body:
      "Share the Singapore banks Revolut wants to prioritize. Acme will prepare a bank-by-bank capability and timeline view grounded in existing relationships, implementation history, and direct integrations.",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@revolut.com",
    buttonLabel: "Request Singapore coverage review",
    shortButtonLabel: "Request coverage review",
  },
} satisfies LandingCampaignContent;
