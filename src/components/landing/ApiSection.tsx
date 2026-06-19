import { acmeContent } from "@/content/acme";
import { Container } from "./Container";
import { CodeWindow, ProtocolCard, SectionEyebrow, moduleIcons } from "./VisualPrimitives";

export function ApiSection() {
  return (
    <section id="api" className="section-shell bg-[var(--color-ghost-white)]">
      <Container>
        <div className="grid min-w-0 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="min-w-0 rounded-[12px] border border-[var(--color-steel-gray)] bg-[var(--color-ghost-white)] p-5 shadow-[var(--shadow-subtle)] sm:p-6">
            <CodeWindow title={acmeContent.api.codeTitle} lines={acmeContent.api.codeLines} />
            <div className="mt-4 grid grid-cols-3 gap-3 font-mono text-[12px] text-[var(--color-slate-text)]">
              {["API", "SFTP", "Bank files"].map((item) => (
                <span
                  key={item}
                  className="rounded-[8px] border border-[var(--color-steel-gray)] bg-[var(--color-ghost-white)] px-3 py-2.5 text-center shadow-[var(--shadow-subtle)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="min-w-0">
            <SectionEyebrow>{acmeContent.api.eyebrow}</SectionEyebrow>
            <h2 className="section-title-xl max-w-[16ch] font-bold tracking-[-0.02em] text-[var(--color-ink-blue)]">
              {acmeContent.api.headline}
            </h2>
            <p className="mt-6 max-w-[35rem] text-base leading-7 text-[var(--color-slate-text)]">
              {acmeContent.api.body}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <ProtocolCard
                icon={moduleIcons.network}
                title={acmeContent.api.details[0].title}
                body={acmeContent.api.details[0].body}
              />
              <ProtocolCard
                icon={moduleIcons.lock}
                title={acmeContent.api.details[1].title}
                body={acmeContent.api.details[1].body}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
