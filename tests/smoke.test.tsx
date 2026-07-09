import { describe, it, expect } from "vitest";
import { cn } from "@/lib/cn";

describe("cn", () => {
  it("joins truthy classes", () => {
    expect(cn("a", false, "b", undefined)).toBe("a b");
  });
});
