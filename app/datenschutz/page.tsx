import type { Metadata } from "next";
import { site } from "@/content/site";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung der Uyer Management Holding LLC-FZ.",
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <h2>1. Verantwortlicher</h2>
      <p>
        {site.legalName}, {site.address.street}, {site.address.area},{" "}
        {site.address.city}. E-Mail:{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
      <h2>2. Erhebung und Verarbeitung personenbezogener Daten</h2>
      <p>
        Beim Besuch dieser Website werden technisch notwendige Daten (z.&nbsp;B.
        IP-Adresse, Datum und Uhrzeit des Zugriffs) verarbeitet, soweit dies
        für den Betrieb der Website erforderlich ist. Diese Website verwendet
        keine Tracking- oder Marketing-Cookies.
      </p>
      <h2>3. Kontaktformular und Bewerbungen</h2>
      <p>
        Wenn Sie uns über das Kontaktformular eine Anfrage senden oder sich
        über das Bewerbungsformular bewerben, verarbeiten wir die von Ihnen
        angegebenen Daten (Name, Kontaktdaten, Nachricht, ggf. Lebenslauf)
        ausschließlich zur Bearbeitung Ihrer Anfrage bzw. Bewerbung. Die
        Übermittlung erfolgt per E-Mail an unser Unternehmen. Eine Weitergabe
        an Dritte erfolgt nur, soweit dies zur Vermittlung erforderlich ist
        und Sie eingewilligt haben.
      </p>
      <h2>4. Speicherdauer</h2>
      <p>
        Wir speichern personenbezogene Daten nur so lange, wie es für die
        genannten Zwecke erforderlich ist oder gesetzliche
        Aufbewahrungspflichten bestehen. Bewerbungsunterlagen werden nach
        Abschluss des Verfahrens gelöscht, sofern keine Einwilligung zur
        längeren Speicherung vorliegt.
      </p>
      <h2>5. Ihre Rechte</h2>
      <ul>
        <li>Auskunft über die von uns verarbeiteten Daten</li>
        <li>Berichtigung unrichtiger Daten</li>
        <li>Löschung oder Einschränkung der Verarbeitung</li>
        <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft</li>
      </ul>
      <p>
        Wenden Sie sich dazu jederzeit an{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
