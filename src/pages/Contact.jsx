import ContactHero from "../components/contact/ContactHero";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";
import GoogleMap from "../components/contact/GoogleMap";
import FAQ from "../components/contact/FAQ";
import CTASection from "../components/contact/CTASection";

export default function Contact() {
  return (
    <>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <GoogleMap />
      <FAQ />
      <CTASection />
    </>
  );
}