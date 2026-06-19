export type HeroContent = {
  eyebrow: string;
  headline: string;
  subhead: string;
  primaryCta: string;
  secondaryCta: string;
};

export type ProcessCard = {
  step: string;
  label: string;
  title: string;
  body: string;
};

export type LaunchCard = {
  title: string;
  body: string;
};

export type ContactContent = {
  eyebrow: string;
  title: string;
  body: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  buttonLabel: string;
  shortButtonLabel: string;
};

export type LandingCampaignContent = {
  accountName: string;
  metadata: {
    title: string;
    description: string;
  };
  hero: HeroContent;
  process: {
    title: string;
    body: string;
    cards: readonly ProcessCard[];
  };
  launch: {
    title: string;
    body: string;
    cards: readonly LaunchCard[];
  };
  contact: ContactContent;
};
