import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "@/components/ui/Input";
import { FileUpload } from "@/components/ui/FileUpload";

describe("Input", () => {
  it("shows label with gold asterisk when required", () => {
    render(<Input label="Vor- und Nachname" required name="name" />);
    expect(screen.getByLabelText(/Vor- und Nachname/)).toBeInTheDocument();
    expect(screen.getByText("*")).toHaveClass("text-gold");
  });

  it("renders error message", () => {
    render(<Input label="E-Mail" name="email" error="Bitte geben Sie eine gültige E-Mail-Adresse ein." />);
    expect(
      screen.getByText("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
    ).toBeInTheDocument();
  });
});

describe("FileUpload", () => {
  it("shows selected file state", () => {
    render(
      <FileUpload label="Lebenslauf" name="cv" fileName="Lebenslauf_Mustermann.pdf" />,
    );
    expect(screen.getByText(/Lebenslauf_Mustermann\.pdf/)).toBeInTheDocument();
    expect(
      screen.getByText("Datei ausgewählt – zum Ersetzen klicken"),
    ).toBeInTheDocument();
  });
});
