import ServicesHero from "../components/services/ServicesHero";
import ServicesIntro from "../components/services/ServicesIntro";
import ServicesList from "../components/services/ServicesList";
import WhyChooseServices from "../components/services/WhyChooseServices";

export default function Services() {
  return (
    <>
      <ServicesHero />
      <ServicesIntro />
      <ServicesList />
      <WhyChooseServices />
    </>
  );
}