import ClientsHero from "../components/clients/ClientsHero";
import LogoCarousel from "../components/clients/LogoCarousel";
import WhyChooseUs from "../components/clients/WhyChooseUs";
import Industries from "../components/clients/Industries";
import FeaturedPartners from "../components/clients/FeaturedPartners";
import Testimonials from "../components/clients/Testimonials";
import CTASection from "../components/clients/CTASection";


export default function ClientsPartners() {
  return (
    <>
      <ClientsHero />
      <LogoCarousel />
      <WhyChooseUs />
      <Industries />
      <FeaturedPartners />
      <Testimonials />
      <CTASection />
    </>
  );
}