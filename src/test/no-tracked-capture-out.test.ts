import { describe, expect, it } from "vitest";
import { execSync } from "node:child_process";

describe("P24 repo hygiene", () => {
  it("does not track *-out.txt capture files", () => {
    const listed = execSync("git ls-files", { encoding: "utf8" }).split(/\r?\n/).filter(Boolean);
    const bad = listed.filter((path) => /-out\.txt$/i.test(path));
    expect(bad).toEqual([]);
  });
});
