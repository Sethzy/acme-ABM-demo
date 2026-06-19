import { acmeContent } from "@/content/acme";
import { Container } from "./Container";
import { ActionLink, LogoMark, moduleIcons } from "./VisualPrimitives";

const resourceIcons = [moduleIcons.docs, moduleIcons.network, moduleIcons.chat];

export function CtaFooterSection() {
  return (
    <footer id="contact" className="bg-[var(--color-ghost-white)]">
      <section className="section-shell">
        <Container>
          <div className="rounded-[8px] border border-[var(--color-steel-gray)] bg-[var(--color-fog-gray)] p-5 shadow-[var(--shadow-subtle)] sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <h2 className="section-title-xl font-semibold text-[var(--color-ink-blue)]">
                  {acmeContent.cta.headline}
                </h2>
                <p className="mt-5 max-w-[34rem] text-base leading-7 text-[var(--color-slate-text)]">
                  {acmeContent.cta.body}
                </p>
                <div className="mt-8">
                  <ActionLink href="mailto:hello@tryacme.com">{acmeContent.cta.primaryCta}</ActionLink>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {acmeContent.cta.resources.map((resource, index) => {
                  const Icon = resourceIcons[index];
                  return (
                    <a
                      key={resource.title}
                      href="#"
                      className="focus-ring group rounded-[8px] border border-[var(--color-steel-gray)] bg-[var(--color-ghost-white)] p-5 shadow-[var(--shadow-subtle)] transition hover:translate-y-[-2px]"
                    >
                      <Icon className="h-5 w-5 text-[var(--color-callout-cyan)] transition group-hover:text-[var(--color-action-orange)]" strokeWidth={1.55} />
                      <h3 className="mt-8 text-base font-semibold text-[var(--color-ink-blue)]">{resource.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[var(--color-slate-text)]">{resource.body}</p>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section id="company" className="border-t border-[var(--color-steel-gray)] py-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <div>
              <LogoMark />
              <p className="mt-5 max-w-[22rem] text-sm leading-6 text-[var(--color-slate-text)]">
                Streamlined banking APIs to integrate your ERP or internal systems with your banks of choice.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {acmeContent.cta.footerColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="font-mono text-[11px] uppercase text-[var(--color-ink-blue)]">
                    {column.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {column.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="focus-ring rounded-[6px] text-sm text-[var(--color-slate-text)] transition hover:text-[var(--color-action-orange)]">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </footer>
  );
}
