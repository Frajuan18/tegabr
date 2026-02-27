// src/components/HomePage.jsx
import { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import ServicesSection from "../components/ServicesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import HowItWorksSection from "../components/HowItWorksSection";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import ContactUsSection from "../components/ContactUsSection";
import { 
  HeroSkeleton, 
  FeaturesSkeleton, 
  ServicesSkeleton, 
  TestimonialsSkeleton,
  HowItWorksSkeleton ,
    ContactUsSkeleton
} from "../components/Skeletons";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [loadingHero, setLoadingHero] = useState(true);
  const [loadingFeatures, setLoadingFeatures] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  const [loadingHowItWorks, setLoadingHowItWorks] = useState(true);
  const [loadingContact, setLoadingContact] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    const heroTimer = setTimeout(() => setLoadingHero(false), 1500);
    const featuresTimer = setTimeout(() => setLoadingFeatures(false), 1800);
    const servicesTimer = setTimeout(() => setLoadingServices(false), 2200);
    const testimonialsTimer = setTimeout(() => setLoadingTestimonials(false), 2000);
    const howItWorksTimer = setTimeout(() => setLoadingHowItWorks(false), 1900);
    const contactTimer = setTimeout(() => setLoadingContact(false), 2100);

    return () => {
      clearTimeout(timer);
      clearTimeout(heroTimer);
      clearTimeout(featuresTimer);
      clearTimeout(servicesTimer);
      clearTimeout(testimonialsTimer);
      clearTimeout(howItWorksTimer);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F2F2F7] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-[#F2F2F7]">
      <section id="home">
        {loadingHero ? <HeroSkeleton /> : <HeroSection />}
      </section>
      <section id="features">
        {loadingFeatures ? <FeaturesSkeleton /> : <FeaturesSection />}
      </section>
      <section id="services">
        {loadingServices ? <ServicesSkeleton /> : <ServicesSection />}
      </section>
      <section id="how-it-works">
        {loadingHowItWorks ? <HowItWorksSkeleton /> : <HowItWorksSection />}
      </section>
      <section id="testimonials">
        {loadingTestimonials ? <TestimonialsSkeleton /> : <TestimonialsSection />}
      </section>
      <section id="contact">
        {loadingContact ? <ContactUsSkeleton /> : <ContactUsSection />}
      </section>
      <Footer />
    </div>
  );
}