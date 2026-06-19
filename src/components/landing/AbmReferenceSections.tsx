const platformCards = [
  {
    title: "Existing local bank coverage",
    body:
      "Start from Acme's live Singapore coverage across DBS, UOB, OCBC, and global banks with Singapore connectivity, then map the exact rails each bank can support for Revolut.",
  },
  {
    title: "Faster bank coordination",
    body:
      "Acme helps drive the bank conversations, product clarifications, certificate exchange, UAT, and production readiness that usually slow a direct integration down.",
  },
  {
    title: "One launch plan per bank",
    body:
      "Turn each target bank into a clear view of supported virtual accounts, FAST, PayNow, statements, direct debit, payouts, gaps, and expected timeline.",
  },
];

const shipCards = [
  {
    title: "Named virtual accounts",
    body:
      "Move faster on deposit recognition and, where banks allow it, static virtual account structures that preserve the underlying customer or business identity.",
  },
  {
    title: "PayNow and FAST deposits",
    body:
      "Power PayNow QR deposit flows, real-time credit notifications, and reconciliation-ready transaction data for Singapore use cases.",
  },
  {
    title: "Local payouts",
    body:
      "Trigger local payouts through supported bank rails, track execution status, and handle bank-specific validation rules through a consistent API.",
  },
  {
    title: "Statements and reconciliation",
    body:
      "Ingest hourly and daily statements, deduplicate overlapping notifications, and classify references so finance and operations can resolve exceptions faster.",
  },
];

function SectionIntro({
  title,
  body,
  className = "",
}: {
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-[62rem] text-center ${className}`}>
      <h2 className="abm-section-title">{title}</h2>
      <p className="abm-section-copy mx-auto mt-6 max-w-[46rem]">{body}</p>
    </div>
  );
}

function AccentRule() {
  return (
    <span
      aria-hidden="true"
      className="mb-8 block h-[5px] w-[50px] rounded-full bg-[color-mix(in_srgb,var(--color-info-blue)_62%,var(--color-notification-teal))]"
    />
  );
}

export function AbmReferenceSections() {
  return (
    <div className="relative isolate overflow-hidden bg-[oklch(0.985_0.006_220)] text-[var(--color-ink-blue)]">
      <div className="hero-blueprint-layer opacity-70" aria-hidden="true" />

      <section className="relative mx-auto w-full max-w-[1200px] px-5 pb-[82px] pt-[116px] sm:px-8 sm:pb-[112px] sm:pt-[148px] lg:px-10 xl:px-0">
        <SectionIntro
          title="Singapore bank relationships, ready for integration."
          body="Revolut should not have to restart bank discovery from zero. Acme brings direct integrations, implementation patterns, and bank-side operating muscle so your team can move from target-bank list to launch plan faster."
        />

        <div className="mt-[74px] grid overflow-hidden border border-[color-mix(in_srgb,var(--color-faded-grid-blue)_58%,var(--color-steel-gray))] bg-[color-mix(in_srgb,var(--color-ghost-white)_94%,var(--color-fog-gray))] shadow-[0_28px_80px_-70px_rgba(1,24,33,0.45)] lg:grid-cols-3">
          {platformCards.map((card) => (
            <article
              key={card.title}
              className="abm-card abm-card-with-rule border-b border-[color-mix(in_srgb,var(--color-faded-grid-blue)_52%,var(--color-steel-gray))] px-9 py-10 last:border-b-0 sm:px-11 sm:py-11 lg:border-b-0 lg:border-r lg:px-10 lg:last:border-r-0 xl:px-11"
            >
              <AccentRule />
              <h3 className="abm-card-title max-w-[15ch]">{card.title}</h3>
              <p className="abm-card-copy">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-[1200px] px-5 py-[92px] sm:px-8 sm:py-[124px] lg:px-10 xl:px-0">
        <SectionIntro
          title="What Revolut can launch faster."
          body="Singapore workflows that get easier when bank relationships, rails, and implementation detail are already mapped."
        />

        <div className="mt-[74px] grid overflow-hidden border border-[color-mix(in_srgb,var(--color-faded-grid-blue)_58%,var(--color-steel-gray))] bg-[color-mix(in_srgb,var(--color-ghost-white)_94%,var(--color-fog-gray))] shadow-[0_28px_80px_-70px_rgba(1,24,33,0.45)] md:grid-cols-2 lg:grid-cols-4">
          {shipCards.map((card) => (
            <article
              key={card.title}
              className="abm-card border-b border-[color-mix(in_srgb,var(--color-faded-grid-blue)_52%,var(--color-steel-gray))] px-8 py-9 last:border-b-0 sm:px-10 sm:py-10 md:[&:nth-child(2n)]:border-r-0 md:border-r lg:border-b-0 lg:px-9 lg:[&:nth-child(2n)]:border-r lg:last:border-r-0 xl:px-10"
            >
              <h3 className="abm-card-title max-w-[13ch]">{card.title}</h3>
              <p
                className={`abm-card-copy ${
                  card.title === "Statements and reconciliation"
                    ? "abm-card-copy-balanced"
                    : ""
                }`}
              >
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="relative mx-auto w-full max-w-[1200px] px-5 pb-[142px] pt-[92px] sm:px-8 sm:pb-[170px] sm:pt-[124px] lg:px-10 xl:px-0"
      >
        <div className="mx-auto max-w-[70rem] text-center">
          <p className="abm-eyebrow">
            FOR THE REVOLUT TEAM
          </p>
          <h2
            className="abm-section-title abm-contact-title mx-auto mt-7"
            aria-label="See the Singapore launch path"
          >
            <span className="abm-contact-title-line" aria-hidden="true">
              See the Singapore
            </span>
            <span className="abm-contact-title-line" aria-hidden="true">
              launch path
            </span>
          </h2>
          <p className="abm-section-copy mx-auto mt-6 max-w-[48rem]">
            Tell us the Singapore banks Revolut wants live first. We'll return a bank-by-bank capability and timeline view, grounded in Acme's existing relationships, implementation history, and direct integrations.
          </p>
        </div>

        <form className="mx-auto mt-[64px] max-w-[880px] border border-[color-mix(in_srgb,var(--color-faded-grid-blue)_66%,var(--color-steel-gray))] bg-[color-mix(in_srgb,var(--color-ghost-white)_82%,transparent)] px-4 py-5 shadow-[0_28px_80px_-70px_rgba(1,24,33,0.5)] sm:px-12 sm:py-12">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="abm-field-label grid gap-3 text-left">
              Name
              <input
                className="abm-field-input h-[58px] border border-[color-mix(in_srgb,var(--color-steel-gray)_78%,var(--color-faded-grid-blue))] bg-[var(--color-ghost-white)] px-5 outline-none transition focus:border-[color-mix(in_srgb,var(--color-info-blue)_76%,var(--color-faded-grid-blue))]"
                placeholder="Your name"
                type="text"
              />
            </label>
            <label className="abm-field-label grid gap-3 text-left">
              Work email
              <input
                className="abm-field-input h-[58px] border border-[color-mix(in_srgb,var(--color-steel-gray)_78%,var(--color-faded-grid-blue))] bg-[var(--color-ghost-white)] px-5 outline-none transition focus:border-[color-mix(in_srgb,var(--color-info-blue)_76%,var(--color-faded-grid-blue))]"
                placeholder="you@revolut.com"
                type="email"
              />
            </label>
          </div>
          <button
            className="abm-submit mt-9 min-h-[64px] w-full border border-[color-mix(in_srgb,var(--color-info-blue)_58%,var(--color-faded-grid-blue))] bg-[color-mix(in_srgb,var(--color-info-blue)_28%,var(--color-ghost-white))] px-6 transition hover:bg-[color-mix(in_srgb,var(--color-info-blue)_36%,var(--color-ghost-white))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-info-blue)] focus-visible:ring-offset-2"
            aria-label="Request Singapore coverage review"
            type="button"
          >
            <span className="sm:hidden">Request coverage review</span>
            <span className="hidden sm:inline">Request Singapore coverage review</span>
          </button>
        </form>
      </section>
    </div>
  );
}
