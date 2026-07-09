export const site = {
  name: "Uyer Management",
  legalName: "Uyer Management Holding LLC-FZ",
  url: "https://www.uyermanagement.com",
  address: {
    street: "Meydan Grandstand, 6th Floor, Meydan Road",
    area: "Nad Al Sheba",
    city: "Dubai",
    country: "Vereinigte Arabische Emirate",
  },
  phone: "+97 1506061687",
  phoneHref: "tel:+971506061687",
  whatsapp: "https://wa.me/971506061687",
  email: "business@uyermanagement.com",
  hours: { days: "Montag – Freitag", time: "07:00 – 17:00" },
  nav: [
    { href: "/", label: "Home" },
    { href: "/leistungen", label: "Leistungen" },
    { href: "/fuer-unternehmen", label: "Für Unternehmen" },
    { href: "/karriere", label: "Karriere" },
    { href: "/kontakt", label: "Kontakt" },
  ],
  services: [
    {
      title: "Personalvermittlung",
      text: "Wir vermitteln qualifiziertes Personal speziell im Bereich der Gebäudereinigung. Durch unsere europaweiten Netzwerke finden wir zuverlässig Fachkräfte für Ihren Betrieb.",
    },
    {
      title: "Dienst- & Arbeitspläne erstellen",
      text: "Eine gute Planung ist das Fundament für effiziente Abläufe. Wir erstellen individuelle Dienst- und Arbeitspläne für Ihr Team.",
    },
    {
      title: "Lohnverrechnung",
      text: "Fehlerfreie und pünktliche Lohnverrechnung ist für jedes Unternehmen unverzichtbar. Wir übernehmen sie zuverlässig für Sie.",
    },
    {
      title: "Vertragserstellung",
      text: "Rechtlich einwandfreie Verträge schützen Arbeitgeber und Arbeitnehmer. Wir kümmern uns um die korrekte Erstellung.",
    },
    {
      title: "Auftragsvermittlung",
      text: "Wir bringen Unternehmen und Auftragnehmer erfolgreich zusammen – europaweit, schnell und effizient.",
    },
  ],
} as const;
