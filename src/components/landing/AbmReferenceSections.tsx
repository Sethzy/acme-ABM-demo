import type { CSSProperties } from "react";
import { acmeContent } from "@/content/acme";
import { RevealOnScroll } from "./RevealOnScroll";

function getRevealDelay(index: number) {
  return { "--reveal-delay": `${(index + 1) * 60}ms` } as CSSProperties;
}

function SectionIntro({
  title,
  body,
  className = "",
  titleClassName = "",
}: {
  title: string;
  body: string;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={`mx-auto max-w-[62rem] text-center ${className}`}>
      <h2 className={`abm-section-title ${titleClassName}`}>{title}</h2>
      <p className="abm-section-copy mx-auto mt-6 max-w-[46rem]">{body}</p>
    </div>
  );
}

export function AbmReferenceSections() {
  const { process, launch, contact } = acmeContent;

  return (
    <div className="abm-reference-shell relative isolate overflow-hidden text-[var(--color-ink)]">
      <div className="abm-reference-blueprint hero-blueprint-layer opacity-70" aria-hidden="true" />

      <RevealOnScroll
        as="section"
        className="relative mx-auto w-full max-w-[1200px] px-5 pb-[82px] pt-[64px] sm:px-8 sm:pb-[112px] sm:pt-[148px] lg:px-10 xl:px-0"
      >
        <SectionIntro
          title={process.title}
          body={process.body}
          titleClassName="abm-section-title-compact"
        />

        <div className="abm-card-grid abm-card-grid-3 abm-process-grid mt-[70px]">
          {process.cards.map((card, index) => (
            <article
              key={card.title}
              className="reveal-stagger-item abm-card abm-card-cell abm-card-with-rule abm-process-card px-9 py-10 sm:px-11 sm:py-11 lg:px-10 xl:px-11"
              style={getRevealDelay(index)}
            >
              <div className="abm-process-meta" aria-hidden="true">
                <span className="abm-process-index">{card.step}</span>
                {" "}
                <span>{card.label}</span>
              </div>
              <h3 className="abm-card-title max-w-[15ch]">{card.title}</h3>
              <p className="abm-card-copy">{card.body}</p>
            </article>
          ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll
        as="section"
        className="relative mx-auto w-full max-w-[1200px] px-5 py-[92px] sm:px-8 sm:py-[124px] lg:px-10 xl:px-0"
      >
        <SectionIntro
          title={launch.title}
          body={launch.body}
        />

        <div className="abm-card-grid abm-card-grid-4 mt-[74px]">
          {launch.cards.map((card, index) => (
            <article
              key={card.title}
              className="reveal-stagger-item abm-card abm-card-cell px-9 py-10 sm:px-10 sm:py-10 lg:px-9 xl:px-10"
              style={getRevealDelay(index)}
            >
              <div className="abm-process-meta" aria-hidden="true">
                <span className="abm-process-index">{String(index + 1).padStart(2, "0")}</span>
                {" "}
                <span>Workflow</span>
              </div>
              <h3 className="abm-card-title max-w-[13ch]">{card.title}</h3>
              <p className="abm-card-copy">{card.body}</p>
            </article>
          ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll
        as="section"
        id="contact"
        className="relative mx-auto w-full max-w-[1200px] px-5 pb-[142px] pt-[92px] sm:px-8 sm:pb-[170px] sm:pt-[124px] lg:px-10 xl:px-0"
      >
        <div className="mx-auto max-w-[70rem] text-center">
          <p className="abm-eyebrow">
            {contact.eyebrow}
          </p>
          <h2
            className="abm-section-title abm-contact-title mx-auto mt-7"
            aria-label={contact.title}
          >
            <span className="abm-contact-title-line" aria-hidden="true">
              See the Singapore
            </span>
            {" "}
            <span className="abm-contact-title-line" aria-hidden="true">
              launch path
            </span>
          </h2>
          <p className="abm-section-copy mx-auto mt-6 max-w-[48rem]">
            {contact.body}
          </p>
        </div>

        <form className="mx-auto mt-[64px] max-w-[880px] border border-[color-mix(in_srgb,var(--color-border)_72%,var(--color-faded-grid-blue))] bg-[color-mix(in_srgb,var(--color-surface-raised)_88%,transparent)] px-9 py-10 shadow-[0_28px_80px_-70px_rgba(1,24,33,0.45)] backdrop-blur-[2px] sm:px-12 sm:py-12">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="abm-field-label grid gap-3 text-left">
              Name
              <input
                className="abm-field-input h-[58px] border border-[color-mix(in_srgb,var(--color-border)_78%,var(--color-faded-grid-blue))] bg-[var(--color-surface-raised)] px-5 outline-none transition focus:border-[var(--color-revolut-blue)]"
                placeholder={contact.namePlaceholder}
                type="text"
              />
            </label>
            <label className="abm-field-label grid gap-3 text-left">
              Work email
              <input
                className="abm-field-input h-[58px] border border-[color-mix(in_srgb,var(--color-border)_78%,var(--color-faded-grid-blue))] bg-[var(--color-surface-raised)] px-5 outline-none transition focus:border-[var(--color-revolut-blue)]"
                placeholder={contact.emailPlaceholder}
                type="email"
              />
            </label>
          </div>
          <button
            className="abm-submit mt-9 min-h-[64px] w-full border border-[color-mix(in_srgb,var(--color-revolut-blue-dark)_40%,var(--color-faded-grid-blue))] bg-[var(--color-revolut-blue)] px-6 text-[var(--color-surface-raised)] shadow-[0_12px_32px_-18px_rgba(0,117,235,0.6)] transition hover:bg-[var(--color-revolut-blue-dark)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-revolut-blue)] focus-visible:ring-offset-2"
            aria-label={contact.buttonLabel}
            type="button"
          >
            <span className="sm:hidden">{contact.shortButtonLabel}</span>
            <span className="hidden sm:inline">{contact.buttonLabel}</span>
          </button>
        </form>
      </RevealOnScroll>
    </div>
  );
}
