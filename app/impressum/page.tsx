import type { Metadata } from "next";
import { site } from "@/content/site";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum der Uyer Management Holding LLC-FZ.",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <h2>Angaben zum Unternehmen</h2>
      <p>
        {site.legalName}
        <br />
        {site.address.street}
        <br />
        {site.address.area}, {site.address.city}
        <br />
        {site.address.country}
      </p>
      <h2>Kontakt</h2>
      <p>
        Telefon: <a href={site.phoneHref}>{site.phone}</a>
        <br />
        E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
      <h2>Haftungshinweis</h2>
      <p>
        Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung
        für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten
        sind ausschließlich deren Betreiber verantwortlich.
      </p>
    </LegalPage>
  );
}
