import { describe, expect, it } from "vitest";
import { acmeContent } from "./acme";

describe("acmeContent", () => {
  it("keeps exact Revolut hero copy", () => {
    expect(acmeContent.hero.headline).toBe("Expand into SEA markets faster with done for you bank connectivity");
    expect(acmeContent.hero.subhead).toBe("SEA and Singapore bank relationships, ready for integration in 8 to 12 weeks.");
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
});
