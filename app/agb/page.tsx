import type { Metadata } from "next";
import { site } from "@/content/site";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen (AGB)",
  description:
    "Allgemeine Geschäftsbedingungen der Uyer Management Holding LLC-FZ.",
  robots: { index: false },
};

export default function AgbPage() {
  return (
    <LegalPage title="Allgemeine Geschäftsbedingungen (AGB)">
      <p>
        {site.legalName}
        <br />
        {site.address.street}
        <br />
        {site.address.area}
        <br />
        {site.address.city}, {site.address.country}
        <br />
        E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
        <br />
        Website:{" "}
        <a href={site.url} target="_blank" rel="noopener noreferrer">
          www.uyermanagement.com
        </a>
        <br />
        Stand: Juli 2026
      </p>

      <h2>1. Geltungsbereich</h2>
      <p>
        Diese Allgemeinen Geschäftsbedingungen (AGB) regeln die Nutzung der
        Website www.uyermanagement.com sowie der darüber angebotenen
        Dienstleistungen der {site.legalName} (nachfolgend „UYER“).
      </p>
      <p>
        Sie gelten für sämtliche Besucher der Website, Bewerber, Unternehmen
        sowie sonstige Nutzer der angebotenen Dienstleistungen.
      </p>

      <h2>2. Unternehmensgegenstand</h2>
      <p>
        UYER ist eine internationale Personalvermittlung und unterstützt
        Unternehmen bei der Suche nach qualifizierten Mitarbeitern sowie
        Bewerber bei der Suche nach geeigneten Arbeitsplätzen.
      </p>
      <p>
        Die Vermittlung erfolgt insbesondere an Unternehmen in Österreich und
        Deutschland.
      </p>

      <h2>3. Nutzung der Website</h2>
      <p>Die Nutzung der Website ist grundsätzlich kostenlos.</p>
      <p>
        Bewerber können sich kostenlos bewerben und ihre Bewerbungsunterlagen
        übermitteln. Unternehmen können kostenlos Personal anfragen.
      </p>
      <p>
        Die Nutzung der Website begründet keinen Anspruch auf eine
        Personalvermittlung oder den Abschluss eines Arbeitsvertrages.
      </p>

      <h2>4. Bewerbungen</h2>
      <p>Mit der Übermittlung einer Bewerbung bestätigt der Bewerber, dass:</p>
      <ul>
        <li>sämtliche Angaben vollständig und wahrheitsgemäß sind;</li>
        <li>sämtliche eingereichten Dokumente echt und aktuell sind;</li>
        <li>keine Rechte Dritter verletzt werden.</li>
      </ul>
      <p>
        UYER ist berechtigt, unvollständige oder offensichtlich fehlerhafte
        Bewerbungen abzulehnen.
      </p>

      <h2>5. Personalanfragen</h2>
      <p>
        Unternehmen verpflichten sich, ausschließlich zutreffende Angaben zu
        offenen Stellen und Personalbedarf zu machen.
      </p>
      <p>
        Vor der ersten erfolgreichen Personalvermittlung wird zwischen UYER und
        dem Unternehmen ein gesonderter Rahmenvertrag abgeschlossen.
      </p>

      <h2>6. Arbeitsvermittlung</h2>
      <p>
        UYER prüft Bewerbungen und kann geeignete Bewerber an potenzielle
        Arbeitgeber weiterleiten.
      </p>
      <p>
        Die Entscheidung über die Einstellung eines Bewerbers trifft
        ausschließlich das jeweilige Unternehmen. Ebenso entscheidet jeder
        Bewerber eigenständig, ob er ein Arbeitsangebot annimmt.
      </p>
      <p>
        UYER übernimmt keine Garantie für den Abschluss eines Arbeitsvertrages
        oder den Erfolg einer Vermittlung.
      </p>

      <h2>7. Datenschutz</h2>
      <p>
        Die Verarbeitung personenbezogener Daten erfolgt gemäß der{" "}
        <a href="/datenschutz">Datenschutzerklärung</a> von UYER.
      </p>
      <p>
        Bewerber erklären sich mit der Verarbeitung ihrer personenbezogenen
        Daten sowie der Weitergabe ihrer Bewerbungsunterlagen an potenzielle
        Arbeitgeber in Österreich und Deutschland zum Zweck der
        Arbeitsvermittlung einverstanden.
      </p>

      <h2>8. Verfügbarkeit der Website</h2>
      <p>
        UYER bemüht sich um eine möglichst unterbrechungsfreie Bereitstellung
        der Website. Ein Anspruch auf eine jederzeitige Verfügbarkeit besteht
        jedoch nicht.
      </p>
      <p>
        Insbesondere Wartungsarbeiten, technische Störungen oder Ereignisse
        höherer Gewalt können zu Einschränkungen führen.
      </p>

      <h2>9. Geistiges Eigentum</h2>
      <p>
        Sämtliche Inhalte dieser Website, insbesondere Texte, Logos, Bilder,
        Grafiken, Designs und sonstige Inhalte, sind urheberrechtlich geschützt.
      </p>
      <p>
        Eine Nutzung, Vervielfältigung oder Verbreitung ohne vorherige
        schriftliche Zustimmung von UYER ist unzulässig.
      </p>

      <h2>10. Haftung</h2>
      <p>
        UYER haftet ausschließlich für Schäden, die vorsätzlich oder grob
        fahrlässig verursacht wurden, soweit gesetzlich zulässig.
      </p>
      <p>
        Eine Haftung für Entscheidungen von Arbeitgebern oder Bewerbern, die
        Richtigkeit von Stellenangeboten sowie für den Abschluss oder Fortbestand
        eines Arbeitsverhältnisses wird ausgeschlossen, soweit gesetzlich
        zulässig.
      </p>

      <h2>11. Externe Links</h2>
      <p>
        Diese Website kann Links zu externen Websites enthalten. Für deren
        Inhalte übernimmt UYER keine Verantwortung.
      </p>
      <p>
        Für den Inhalt verlinkter Seiten sind ausschließlich deren jeweilige
        Betreiber verantwortlich.
      </p>

      <h2>12. Änderungen der AGB</h2>
      <p>
        UYER behält sich das Recht vor, diese Allgemeinen Geschäftsbedingungen
        jederzeit anzupassen. Es gilt jeweils die auf der Website
        veröffentlichte aktuelle Fassung.
      </p>

      <h2>13. Elektronische Kommunikation</h2>
      <p>
        Die Kommunikation zwischen UYER, Bewerbern und Unternehmen kann
        elektronisch, insbesondere per E-Mail oder über die Website, erfolgen.
        Der Nutzer erklärt sich mit dieser Form der Kommunikation einverstanden,
        soweit keine gesetzliche Schriftform vorgeschrieben ist.
      </p>

      <h2>14. Missbrauch der Website</h2>
      <p>Es ist insbesondere untersagt,</p>
      <ul>
        <li>falsche Angaben zu machen,</li>
        <li>gefälschte Dokumente hochzuladen,</li>
        <li>Schadsoftware oder rechtswidrige Inhalte zu verbreiten,</li>
        <li>automatisierte Systeme oder Bots einzusetzen,</li>
        <li>Sicherheitsmechanismen der Website zu umgehen,</li>
        <li>Rechte Dritter zu verletzen.</li>
      </ul>
      <p>
        UYER ist berechtigt, Nutzer bei Verstößen von der Nutzung der Website
        auszuschließen und weitere rechtliche Schritte einzuleiten.
      </p>

      <h2>15. Höhere Gewalt</h2>
      <p>
        UYER haftet nicht für Verzögerungen oder Leistungsausfälle aufgrund von
        Ereignissen höherer Gewalt.
      </p>
      <p>
        Hierzu zählen insbesondere Naturkatastrophen, Pandemien, Krieg,
        Terrorismus, Streiks, behördliche Maßnahmen, Stromausfälle,
        Cyberangriffe sowie Ausfälle von Telekommunikations- oder
        Internetdiensten.
      </p>

      <h2>16. Beschwerdemanagement</h2>
      <p>
        Fragen oder Beschwerden können jederzeit an folgende E-Mail-Adresse
        gerichtet werden: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
      <p>
        UYER bemüht sich, Anfragen innerhalb einer angemessenen Frist zu
        bearbeiten.
      </p>

      <h2>17. Ergänzende Vereinbarungen</h2>
      <p>
        Für Personalvermittlungen zwischen UYER und Unternehmen gelten ergänzend
        die jeweils abgeschlossenen Rahmenverträge sowie Vermittlungsbedingungen.
      </p>
      <p>
        Diese gehen im Falle von Abweichungen den vorliegenden AGB vor.
      </p>

      <h2>18. Salvatorische Klausel</h2>
      <p>
        Sollte eine Bestimmung dieser Allgemeinen Geschäftsbedingungen ganz oder
        teilweise unwirksam oder undurchführbar sein oder werden, bleibt die
        Wirksamkeit der übrigen Bestimmungen unberührt.
      </p>
      <p>
        An die Stelle der unwirksamen Bestimmung tritt die gesetzlich zulässige
        Regelung, die dem wirtschaftlichen Zweck der ursprünglichen Bestimmung
        am nächsten kommt.
      </p>

      <h2>19. Anwendbares Recht</h2>
      <p>
        Soweit gesetzlich zulässig, unterliegen diese Allgemeinen
        Geschäftsbedingungen dem Recht der Vereinigten Arabischen Emirate.
      </p>
      <p>
        Zwingende gesetzliche Vorschriften, insbesondere solche zum Schutz von
        Verbrauchern, Arbeitnehmern oder Datenschutzrechten, bleiben hiervon
        unberührt.
      </p>

      <h2>20. Kontakt</h2>
      <p>
        {site.legalName}
        <br />
        {site.address.street}
        <br />
        {site.address.area}
        <br />
        {site.address.city}, {site.address.country}
        <br />
        E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
        <br />
        Website:{" "}
        <a href={site.url} target="_blank" rel="noopener noreferrer">
          www.uyermanagement.com
        </a>
      </p>
    </LegalPage>
  );
}
