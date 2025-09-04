import React from "react";
import Nav from "../components/common/Nav";
import bg from "../assets/Image.png";
import Footer from "../components/common/Footer";
import OptionSection from "../components/home/OptionsSection";
import RentSection from "../components/home/RentSection";
import SaleSection from "../components/home/SaleSection";
const AboutUs = () => {
  return (
    <div className="min-h-screen">
      <Nav />
      <section className=" bg-white ">
        <div className="flex flex-col sm:flex-row ">
          <div className="flex-1 shadow-md p-10 m-10 rounded-2xl">
            <h2 className=" font-bold mb-6">Our Journey</h2>
            <p className="text-gray-700 mb-6 font-light">
              At PYK Real Estate, we are dedicated to transforming the way
              people buy, sell, and experience real estate. Our journey began
              with a simple yet powerful idea: to create a platform that not
              only connects buyers and sellers but also fosters lasting
              relationships built on trust and integrity.
            </p>
            <div className="mb-6 flex flex-col sm:flex-row sm:space-x-6">
              <div className="bg-white shadow-xl rounded-3xl p-8 mb-6 flex flex-col ">
                <p className="text-center">300+</p>
                <p className="text-gray-700 font-light">Properties Sold</p>
              </div>
              <div className="bg-white shadow-xl rounded-3xl p-8 mb-6 flex flex-col ">
                <p className="text-center">300+</p>
                <p className="text-gray-700 font-light">Properties Sold</p>
              </div>
              <div className="bg-white shadow-xl rounded-3xl p-8 mb-6 flex flex-col ">
                <p className="text-center">300+</p>
                <p className="text-gray-700 font-light">Properties Sold</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <img src={bg} alt="about us " />
          </div>
        </div>
      </section>
      {/*   <OptionSection /> */}
      <RentSection />
      <SaleSection />
      <Footer />
    </div>
  );
};

export default AboutUs;
