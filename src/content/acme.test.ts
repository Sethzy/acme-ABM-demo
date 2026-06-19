import { describe, expect, it } from "vitest";
import { acmeContent } from "./acme";

describe("acmeContent", () => {
  it("keeps exact homepage hero copy", () => {
    expect(acmeContent.hero.headline).toBe("Expand into SEA markets faster with done for you bank connectivity");
    expect(acmeContent.hero.subhead).toBe("SEA and Singapore bank relationships, ready for integration in 8 to 12 weeks.");
  });

  it("keeps product proof metrics from scraped Acme pages", () => {
    expect(acmeContent.proof.metrics.map((metric) => metric.value)).toEqual(
      expect.arrayContaining(["4-8 weeks", "80%", "600+ hours", "<2 minutes"]),
    );
  });
});
