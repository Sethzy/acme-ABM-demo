import { acmeContent } from "@/content/acme";
import { Container } from "./Container";
import { ModuleCard, SectionEyebrow, moduleItemIcons } from "./VisualPrimitives";

const groupTones: Array<"navy" | "green" | "red"> = ["navy", "green", "red"];

export function ProductModulesSection() {
  return (
    <section className="section-shell bg-[var(--color-fog-gray)]">
      <Container>
        <SectionEyebrow pill tone="plum">{acmeContent.modules.eyebrow}</SectionEyebrow>
        <h2 className="section-title-lg max-w-[20ch] font-semibold text-[var(--color-deep-plum)]">
          {acmeContent.modules.headline}
        </h2>
        <div className="mt-14 divide-y divide-[var(--color-steel-gray)] border-t border-[var(--color-steel-gray)]">
          {acmeContent.modules.groups.map((group, groupIndex) => (
            <div
              key={group.title}
              className="grid gap-6 py-10 lg:grid-cols-[0.4fr_1fr]"
            >
              <h3 className="max-w-[16rem] text-[17px] font-semibold leading-[1.35] text-[var(--color-deep-plum)]">
                {group.title}
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {group.items.map((item) => (
                  <ModuleCard
                    key={item}
                    icon={moduleItemIcons[item]}
                    tone={groupTones[groupIndex]}
                  >
                    {item}
                  </ModuleCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
