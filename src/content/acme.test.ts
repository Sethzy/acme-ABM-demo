import { describe, expect, it } from "vitest";
import { acmeContent } from "./acme";

describe("acmeContent", () => {
  it("keeps exact Revolut hero copy", () => {
    expect(acmeContent.hero.headline).toBe("Expand into SEA markets faster with implementation-ready bank connectivity");
    expect(acmeContent.hero.subhead).toBe("Singapore and SEA bank relationships prepared for integration in 8 to 12 weeks.");
  });

  it("keeps the account-specific ABM content grouped by section", () => {
    expect(acmeContent.accountName).toBe("Revolut");
    expect(acmeContent.process.cards).toHaveLength(3);
    expect(acmeContent.launch.cards.map((card) => card.title)).toEqual([
      "Named virtual accounts",
      "PayNow and FAST deposits",
      "Local payouts",
      "Statements and reconciliation",
    ]);
    expect(acmeContent.contact.emailPlaceholder).toBe("you@revolut.com");
  });

  it("keeps client-facing copy presentation-ready", () => {
    const serialized = JSON.stringify(acmeContent).toLowerCase();
    const internalPhrases = [
      "based on our research",
      "we think",
      "pressure-test",
      "prototype",
      "mock",
      "restart bank discovery from zero",
      "usually slow",
      "where bank policy",
      "where bank",
      "we'll return",
    ];

    for (const phrase of internalPhrases) {
      expect(serialized).not.toContain(phrase);
    }
  });
});
