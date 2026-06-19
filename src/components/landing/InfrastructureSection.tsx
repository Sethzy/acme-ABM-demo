import { acmeContent } from "@/content/acme";
import { Container } from "./Container";
import { ActionLink, CodeWindow, InfrastructureStack, SectionEyebrow } from "./VisualPrimitives";

export function InfrastructureSection() {
  return (
    <section id="products" className="section-shell bg-[var(--color-ink-blue)] text-[var(--color-inverted-copy)]">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionEyebrow>{acmeContent.infrastructure.eyebrow}</SectionEyebrow>
            <h2 className="section-title-xl max-w-[13ch] font-semibold text-[var(--color-ghost-white)]">
              {acmeContent.infrastructure.headline}
            </h2>
            <p className="mt-6 max-w-[34rem] text-base leading-7 text-[var(--color-inverted-muted)]">
              {acmeContent.infrastructure.body}
            </p>
            <div className="mt-8">
              <ActionLink href="#contact" variant="ghost">
                Build with Acme
              </ActionLink>
            </div>
          </div>
          <InfrastructureStack />
        </div>
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {acmeContent.infrastructure.products.map((product) => (
            <div key={product.title} className="grid gap-5 md:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-ghost-white)]">{product.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-inverted-muted)]">{product.body}</p>
              </div>
              <CodeWindow title={product.title} lines={[product.code, "  --scope production"]} dark />
            </div>
          ))}
        </div>
        <div className="mt-14 grid gap-2 border-t border-[var(--border-inverted-subtle)] pt-6 sm:grid-cols-2 lg:grid-cols-5">
          {acmeContent.infrastructure.capabilities.map((capability) => (
            <span key={capability} className="rounded-[8px] border border-[var(--border-inverted-subtle)] bg-[var(--surface-inverted-muted)] px-3 py-3 text-sm text-[var(--color-inverted-copy)]">
              {capability}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
