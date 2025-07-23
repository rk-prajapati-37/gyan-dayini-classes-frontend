import React from "react";
import Hero from "../components/website/Hero";
import AboutSection from "../components/website/AboutSection";
import ServicesSection from "../components/website/ServicesSection";
import ProgramsSection from "../components/website/ProgramsSection";
import EventSection from '../components/website/EventSection';
import BlogSection from "../components/website/BlogSection";
import ExpertTeamSection from "../components/website/ExpertTeamSection";
import TestimonialsSection from "../components/website/TestimonialsSection";

// Aap yahan aur bhi sections import kar sakte hain jaise Services, Gallery, etc.

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <ProgramsSection />
      <EventSection />
      <BlogSection />
      <ExpertTeamSection />
      <TestimonialsSection />
      {/* Yahan par aap Services, Gallery, Contact, etc. sections bhi add kar sakte hain */}
    </>
  );
}
