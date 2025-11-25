import { useEffect, type JSX } from "react";

import Header from "../components/home/Header";
import ContactUs from "../components/home/ContactUs";

import ChooseUs from "../components/home/ChooseUs";
import ValueSection from "../components/home/ValueSection";

import RealEstateCategorySection from "../components/home/RealEstateCategorySection";
import { useLocation } from "react-router-dom";

export default function Home(): JSX.Element {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#contact") {
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <div className="min-h-screen ">
      <Header />
      <main aria-label="Main content">
        <RealEstateCategorySection />
        <ValueSection />
        <ChooseUs />
        <ContactUs />
      </main>
    </div>
  );
}
