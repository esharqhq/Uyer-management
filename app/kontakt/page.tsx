import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { ContactBlock } from "@/components/contact/ContactBlock";

export const metadata: Metadata = {
  title: "Kontakt aufnehmen",
  description:
    "Kontaktieren Sie Uyer Management – telefonisch, per WhatsApp, E-Mail oder über unser Anfrageformular. Mo–Fr 07:00–17:00.",
};

export default function KontaktPage() {
  return (
    <>
      <PageHero
        title="Kontakt aufnehmen"
        subtitle="Wir freuen uns auf Ihre Anfrage – telefonisch, per WhatsApp oder über das Formular."
        image="/images/hero-home.jpg"
      />
      <ContactBlock />
    </>
  );
}
