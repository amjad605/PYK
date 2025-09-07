import type { JSX } from "react";

import Header from "../components/home/Header";
import ContactUs from "../components/home/ContactUs";

import ChooseUs from "../components/home/ChooseUs";
import ValueSection from "../components/home/ValueSection";

import RealEstateCategorySection from "../components/home/RealEstateCategorySection";

export default function Home(): JSX.Element {
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
