import React, { useState } from "react";

const OptionSection = () => {
  const [hoveredCard, setHoveredCard] = useState<"rent" | "sale" | null>(null);

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12 md:py-20 ">
      {/* Section Title */}

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8 md:gap-12">
        {/* Rent Card */}
        <div
          className="rounded-4xl overflow-hidden  relative h-80 shadow-xl transition-all duration-500 ease-out cursor-pointer"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')",
            transform: hoveredCard === "rent" ? "scale(1.03)" : "scale(1)",
          }}
          onMouseEnter={() => setHoveredCard("rent")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

          {/* Content */}

          <div className="h-full  w-full p-8 text-white flex  justify-end  items-center ">
            {/* Text shadow effect */}
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-black/20 blur-xl z-0"></div>

            <div className="relative z-10 w-1/2 ">
              <div className="flex items-center mb-4">
                <h3 className="text-3xl font-bold">Renting Made Simple </h3>
              </div>
              <p className="text-sm font-light mb-6 opacity-90">
                Browse the highest quality listings, apply online, sign your
                lease, and even pay your rent from any device.
              </p>
              <button className="px-6 py-3 bg-transparent border-blue border-2 hover:bg-blue-700 rounded-4xl shadow-md font-medium transition-all duration-300">
                Browse Rentals
              </button>
            </div>
          </div>
        </div>

        {/* Sale Card */}
        <div
          className="rounded-4xl overflow-hidden relative h-80 shadow-xl transition-all duration-500 ease-out cursor-pointer"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')",
            transform: hoveredCard === "sale" ? "scale(1.03)" : "scale(1)",
          }}
          onMouseEnter={() => setHoveredCard("sale")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

          {/* Content */}
          <div className="absolute bottom-0 w-full p-8 text-white">
            {/* Text shadow effect */}
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-black/20 blur-xl z-0"></div>

            <div className="relative z-10 w-1/2">
              <div className="flex items-center mb-4">
                <h3 className="text-3xl font-bold">Explore Your Option</h3>
              </div>
              <p className="text-sm font-light  mb-6 opacity-90">
                Deciding to become a homeowner is a big deal! Luckily, with
                Homes.com, you get the most accurate homes for sale property
                data, an agent directory, and collaboration tools to browse with
                your agent and co-shopper to help you make the right decision.
              </p>
              <button className="px-6 py-3 bg-transparent border-2 border-blue hover:bg-blue-700 rounded-3xl shadow-md font-medium transition-all duration-300">
                View Properties
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptionSection;
