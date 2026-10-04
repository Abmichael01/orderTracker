import { useSearchParams } from "react-router-dom";
import AboutSection from "../../components/Site/Home/About";
import ContactForm from "../../components/Site/Home/Contact";
import FAQSection from "../../components/Site/Home/FAQ";
import Hero from "../../components/Site/Home/Hero";
import LogoMarquee from "../../components/Site/Home/LogoMarquee";
import Services from "../../components/Site/Home/Services";
import WhyChooseUsSection from "../../components/Site/Home/WhyChooseUs";
import TrackingComponent from "../../components/Site/Home/ShippingTracker";

export default function Home() {
  const [params] = useSearchParams();
  const id = params.get("trackingId");

  return (
    <div className="">
      {!id && (
        <>
          <Hero />
          <LogoMarquee />
          <Services />
          <AboutSection />
          <FAQSection />
          <WhyChooseUsSection />
          <ContactForm />
        </>
      )}
      {id && (
        <>
          <TrackingComponent />
          <ContactForm trackingId={id} />
        </>
      )}
    </div>
  );
}
