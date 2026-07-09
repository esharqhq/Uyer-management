import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders accent variant as button", () => {
    render(<Button variant="accent">Jetzt bewerben</Button>);
    const btn = screen.getByRole("button", { name: "Jetzt bewerben" });
    expect(btn.className).toContain("bg-gold");
  });

  it("renders as link when href is given", () => {
    render(
      <Button variant="outline" href="/kontakt">
        Mehr erfahren
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Mehr erfahren" });
    expect(link).toHaveAttribute("href", "/kontakt");
  });

  it("disabled button is not clickable", () => {
    render(<Button disabled>Deaktiviert</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
