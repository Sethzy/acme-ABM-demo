import { ChevronRight, CircleDashed, MoveUpRight, Network } from "lucide-react";
import { acmeContent } from "@/content/acme";
import { Container } from "./Container";

const iconStroke = 1.6;

export function DeveloperFirstSection() {
  const { developerFirst: dev } = acmeContent;

  return (
    <section id="developer-first" className="section-shell bg-[var(--color-fog-gray)]">
      <Container>
        <div className="grid min-w-0 gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">
          {/* LEFT: transaction card + JSON response */}
          <div className="min-w-0">
            <TransactionCard />
            <ResponseBlock />
          </div>

          {/* RIGHT: copy */}
          <div className="min-w-0 lg:pt-6">
            <span className="inline-flex rounded-[6px] bg-[color-mix(in_srgb,var(--color-deep-plum)_10%,var(--color-ghost-white))] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--color-deep-plum)]">
              {dev.eyebrow}
            </span>
            <h2 className="section-title-xl mt-5 max-w-[18ch] font-bold tracking-[-0.02em] text-[var(--color-ink-blue)]">
              {dev.headline}
            </h2>
            <p className="mt-6 max-w-[34rem] text-base leading-7 text-[var(--color-slate-text)]">
              {dev.body}
            </p>
            <div className="mt-7">
              <a
                href={dev.ctaHref}
                className="focus-ring inline-flex items-center gap-1.5 rounded-[8px] border border-[var(--color-ink-blue)] bg-[var(--color-ghost-white)] px-4 py-2.5 text-sm font-medium text-[var(--color-ink-blue)] shadow-[var(--shadow-subtle)] transition hover:translate-y-[-1px]"
              >
                {dev.ctaLabel}
                <ChevronRight className="h-4 w-4" strokeWidth={iconStroke} />
              </a>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {dev.pillars.map((p) => (
                <div key={p.title} className="min-w-0">
                  <h3 className="text-base font-semibold text-[var(--color-ink-blue)]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--color-slate-text)]">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function TransactionCard() {
  const { transaction: tx } = acmeContent.developerFirst;

  return (
    <div className="rounded-[12px] border border-[var(--color-steel-gray)] bg-[var(--color-ghost-white)] p-6 shadow-[var(--shadow-subtle)]">
      <p className="text-[28px] font-semibold leading-none tracking-[-0.02em] text-[var(--color-ink-blue)]">
        {tx.amount}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-[12px] text-[var(--color-slate-text)]">
        <span className="inline-flex items-center gap-1.5">
          <Network className="h-3.5 w-3.5" strokeWidth={iconStroke} />
          {tx.rail}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MoveUpRight className="h-3.5 w-3.5" strokeWidth={iconStroke} />
          {tx.direction}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CircleDashed className="h-3.5 w-3.5" strokeWidth={iconStroke} />
          {tx.status}
        </span>
      </div>
      <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-[var(--color-steel-gray)]">
        <div className="h-full w-1/3 rounded-full bg-[var(--color-success-moss)]" />
      </div>
      <div className="mt-5 flex items-end justify-between border-t border-[var(--color-steel-gray)] pt-4">
        <div>
          <p className="text-sm font-medium text-[var(--color-ink-blue)]">{tx.sender}</p>
          <p className="mt-0.5 text-[11px] text-[var(--color-slate-text)]">Sender</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-[var(--color-ink-blue)]">{tx.receiver}</p>
          <p className="mt-0.5 text-[11px] text-[var(--color-slate-text)]">Receiver</p>
        </div>
      </div>
    </div>
  );
}

function ResponseBlock() {
  const lines = acmeContent.developerFirst.response;

  return (
    <div className="mt-10">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-slate-text)]">
        Response
      </p>
      <pre className="overflow-x-auto font-mono text-[12px] leading-6 text-[var(--color-ink-blue)]">
        {lines.map((line) => (
          <div key={line.n} className="flex">
            <span className="mr-5 inline-block w-6 shrink-0 select-none text-right text-[var(--color-slate-text)]">
              {line.n}
            </span>
            <span className="whitespace-pre">{colorize(line.text)}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}

function colorize(text: string) {
  // Basic JSON token coloring: keys (cyan), strings (green), numbers (orange), null/bool (purple)
  const parts: Array<{ s: string; c?: string }> = [];
  let i = 0;
  while (i < text.length) {
    const rest = text.slice(i);

    // string token (key or value)
    const strMatch = rest.match(/^"([^"\\]|\\.)*"/);
    if (strMatch) {
      const lookAhead = text.slice(i + strMatch[0].length).trimStart();
      const isKey = lookAhead.startsWith(":");
      parts.push({
        s: strMatch[0],
        c: isKey ? "var(--color-ink-blue)" : "var(--color-success-moss)",
      });
      i += strMatch[0].length;
      continue;
    }

    // number
    const numMatch = rest.match(/^-?\d+(\.\d+)?/);
    if (numMatch) {
      parts.push({ s: numMatch[0], c: "var(--color-deep-plum)" });
      i += numMatch[0].length;
      continue;
    }

    // null / true / false
    const litMatch = rest.match(/^(null|true|false)\b/);
    if (litMatch) {
      parts.push({ s: litMatch[0], c: "var(--color-action-orange)" });
      i += litMatch[0].length;
      continue;
    }

    // punctuation / whitespace
    parts.push({ s: text[i] });
    i += 1;
  }

  return parts.map((p, idx) => (
    <span key={idx} style={p.c ? { color: p.c } : undefined}>
      {p.s}
    </span>
  ));
}
