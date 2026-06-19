import type { LandingCampaignContent } from "../landingSchema";

export const revolutLandingContent = {
  accountName: "Revolut",
  metadata: {
    title: "Acme for Revolut - SEA bank connectivity",
    description:
      "A named-account Acme walkthrough for expanding into SEA markets faster with done for you bank connectivity and bank relationships ready for integration in 8 to 12 weeks.",
  },
  hero: {
    eyebrow: "Proposal for Revolut",
    headline: "Expand into SEA markets faster with done for you bank connectivity",
    subhead: "SEA and Singapore bank relationships, ready for integration in 8 to 12 weeks.",
    primaryCta: "Explore Acme coverage",
    secondaryCta: "Read API docs",
  },
  process: {
    title: "Start from existing SEA bank coverage.",
    body:
      "Revolut should not have to restart bank discovery from zero. Acme brings direct integrations, implementation patterns, and bank-side operating muscle so your team can move from target-bank list to launch plan faster.",
    cards: [
      {
        step: "01",
        label: "Coverage",
        title: "Existing local bank coverage",
        body:
          "Start from Acme's live Singapore coverage across DBS, UOB, OCBC, and global banks with Singapore connectivity, then map the exact rails each bank can support for Revolut.",
      },
      {
        step: "02",
        label: "Coordination",
        title: "Faster bank coordination",
        body:
          "Acme helps drive the bank conversations, product clarifications, certificate exchange, UAT, and production readiness that usually slow a direct integration down.",
      },
      {
        step: "03",
        label: "Launch plan",
        title: "One launch plan per bank",
        body:
          "Turn each target bank into a clear view of supported virtual accounts, FAST, PayNow, statements, direct debit, payouts, gaps, and expected timeline.",
      },
    ],
  },
  launch: {
    title: "What Revolut can launch faster.",
    body:
      "Based on our research, these are the Singapore workflows we think Revolut should pressure-test first, then map bank by bank against the partners you want live.",
    cards: [
      {
        title: "Named virtual accounts",
        body:
          "For Revolut Business, prioritize static VA setups that preserve the underlying customer or business identity, where bank policy and API exposure allow it.",
      },
      {
        title: "PayNow and FAST deposits",
        body:
          "Support QR top-ups, FAST-in notifications, and reference handling for Singapore deposit flows without treating one bank's data shape as the standard.",
      },
      {
        title: "Local payouts",
        body:
          "Map which banks can support payout initiation, sender-account selection, validation rules, and a phased rollout from VAs to withdrawals.",
      },
      {
        title: "Statements and reconciliation",
        body:
          "Pressure-test ICNs, hourly statements, and daily statements so missed webhooks and duplicate FAST entries do not become operations cleanup.",
      },
    ],
  },
  contact: {
    eyebrow: "FOR THE REVOLUT TEAM",
    title: "See the Singapore launch path",
    body:
      "Tell us the Singapore banks Revolut wants live first. We'll return a bank-by-bank capability and timeline view, grounded in Acme's existing relationships, implementation history, and direct integrations.",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@revolut.com",
    buttonLabel: "Request Singapore coverage review",
    shortButtonLabel: "Request coverage review",
  },
} satisfies LandingCampaignContent;
