import React from "react";

type CardProps = {
  title: string;
  description: string;
  color: string;
};

const BackgroundCard: React.FC<CardProps> = ({ title, description, color }) => (
  <div
    className={`w-full  flex  flex-col  h-[450px] items-center justify-center p-24 ${color} rounded-2xl  my-6 hover:scale-102 transition-transform duration-300 ease-in-out`}
  >
    <h2
      className={`text-4xl text-center mb-4 ${
        color == "bg-black" ? " text-white" : "text-white  "
      }`}
    >
      {title}
    </h2>
    <p
      className={`text-md text-center font-[Inter] leading-relaxed ${
        color == "bg-black" ? " text-white" : "text-white"
      }`}
    >
      {description}
    </p>
    <button
      className={`${
        color == "bg-black" ? "bg-primary" : "bg-black"
      } text-white rounded-2xl w-32 px-4 py-2 mt-6 hover:bg-gray-800 transition-colors`}
    >
      Browse{" "}
    </button>
  </div>
);

const ServicesSection: React.FC = () => {
  return (
    <section className=" flex flex-col sm:flex-row mx-auto   ">
      <div className="flex flex-col sm:flex-row space-x-4  justify-evenly px-4">
        <BackgroundCard
          title="Sales"
          description="Explore our extensive property listings, featuring a diverse range of homes, apartments, and
          commercial spaces to suit your needs."
          color="bg-black"
        />
        <BackgroundCard
          title="Re Sales"
          description="Get expert advice from our experienced real estate consultants, ready to assist you in making
            informed decisions."
          color="bg-primary"
        />
        <BackgroundCard
          title="Rents"
          description="Stay informed with our in-depth market analysis, providing insights into current trends,
          pricing, and investment opportunities."
          color="bg-black"
        />
      </div>
    </section>
  );
};

export default ServicesSection;
