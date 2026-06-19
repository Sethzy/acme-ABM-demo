import { acmeContent } from "@/content/acme";
import { Container } from "./Container";
import { ModuleChip, SectionEyebrow, moduleIcons } from "./VisualPrimitives";

export function SolutionsSection() {
  return (
    <section id="solutions" className="section-shell bg-[var(--color-ghost-white)]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.74fr_1.26fr]">
          <div>
            <SectionEyebrow>{acmeContent.solutions.eyebrow}</SectionEyebrow>
            <div className="space-y-3">
              {acmeContent.solutions.audiences.map((audience, index) => (
                <div
                  key={audience}
                  className={`audience-title font-semibold ${
                    index === 0 ? "text-[var(--color-ink-blue)]" : "text-[var(--color-steel-gray)]"
                  }`}
                >
                  {audience}
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-[32rem] text-base leading-7 text-[var(--color-slate-text)]">
              Build financial products that scale with your business. Choose one launch motion and expand across banks, markets, and payment methods.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[8px] border border-[var(--color-steel-gray)] bg-[var(--color-fog-gray)] p-5 shadow-[var(--shadow-subtle)] sm:p-8">
            <div className="blueprint-grid absolute inset-y-0 right-0 w-1/2 opacity-45" aria-hidden="true" />
            <div className="relative max-w-[40rem]">
              <h2 className="section-title-lg font-semibold text-[var(--color-ink-blue)]">
                {acmeContent.solutions.headline}
              </h2>
              <p className="mt-5 max-w-[34rem] text-base leading-7 text-[var(--color-slate-text)]">
                {acmeContent.solutions.body}
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-3 font-mono text-[10px] uppercase text-[var(--color-slate-text)]">Use cases</p>
                  <div className="flex flex-wrap gap-2">
                    {acmeContent.solutions.useCases.map((useCase) => (
                      <ModuleChip key={useCase} icon={moduleIcons.bank}>
                        {useCase}
                      </ModuleChip>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-3 font-mono text-[10px] uppercase text-[var(--color-slate-text)]">How it works</p>
                  <div className="flex flex-wrap gap-2">
                    {acmeContent.solutions.workflow.map((item) => (
                      <ModuleChip key={item} icon={moduleIcons.network}>
                        {item}
                      </ModuleChip>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
