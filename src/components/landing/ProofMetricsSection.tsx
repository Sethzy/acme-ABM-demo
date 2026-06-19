import { acmeContent } from "@/content/acme";
import { Container } from "./Container";
import { MetricChart } from "./MetricChart";
import { ActionLink, SectionEyebrow } from "./VisualPrimitives";

export function ProofMetricsSection() {
  return (
    <section className="section-shell bg-[var(--color-ghost-white)]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
          <div className="flex flex-col justify-center">
            <SectionEyebrow pill>Trusted at scale</SectionEyebrow>
            <h2 className="section-title-lg max-w-[18ch] font-semibold text-[var(--color-ink-blue)]">
              <span>Unlock complete bank connectivity</span>{" "}
              <span className="text-[color-mix(in_srgb,var(--color-ink-blue)_38%,var(--color-slate-text))]">
                with one unified API platform.
              </span>
            </h2>
            <p className="mt-10 max-w-[32rem] text-base leading-7 text-[var(--color-slate-text)]">
              {acmeContent.proof.body}
            </p>
            <div className="mt-10">
              <ActionLink href="#api" variant="outlinedPill">
                {acmeContent.proof.cta}
              </ActionLink>
            </div>
          </div>
          <div className="self-stretch">
            <MetricChart />
          </div>
        </div>
        <div className="mt-64 grid gap-x-12 gap-y-40 border-t border-[var(--color-steel-gray)] pt-40 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-48">
          {acmeContent.proof.metrics.map((metric) => (
            <div key={metric.value} className="flex flex-col">
              <p className="metric-number font-mono text-[var(--color-callout-cyan)]">
                {metric.value}
              </p>
              <p className="mt-20 max-w-[14rem] text-sm leading-6 text-[var(--color-slate-text)] lg:min-h-48">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
