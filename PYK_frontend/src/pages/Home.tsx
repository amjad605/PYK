import type { JSX } from "react";

import Header from "../components/home/Header";
import ContactUs from "../components/home/ContactUs";
import Footer from "../components/common/Footer";
import ChooseUs from "../components/home/ChooseUs";
import ValueSection from "../components/home/ValueSection";

import CardSection from "../components/home/CardSection";
import RealEstateCategorySection from "../components/home/RealEstateCategorySection";

export default function Home(): JSX.Element {
  return (
    <div className="min-h-screen ">
      <Header />
      <RealEstateCategorySection />
      <ValueSection />
      <ChooseUs />
      <ContactUs />
      <Footer />
    </div>
  );
}
