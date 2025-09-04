import React from "react";

const RentSection = () => {
  return (
    <section className="h-screen  mx-auto flex flex-col items-center justify-center px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center px-4 w-full">
        <div className="mb-15">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
            The most rental listings
          </h1>
          <p className="text-gray-600 text-lg text-center mb-8">
            Choose from over 1 hundred apartments, houses, condos, and townhomes
            for rent.
          </p>
        </div>

        {/* Card */}
        <div
          className="w-full rounded-4xl overflow-hidden relative h-96 shadow-xl transition-all duration-500 ease-out cursor-pointer"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

          {/* Content */}
          <div className="h-full w-full p-8 text-white flex justify-end items-center">
            {/* Text shadow effect */}
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-black/20 blur-xl z-0"></div>

            <div className="relative z-10 w-full md:w-1/2">
              <h3 className="text-3xl font-bold mb-4">Renting Made Simple</h3>
              <p className="text-sm font-light mb-6 opacity-90">
                Browse the highest quality listings, apply online, sign your
                lease, and even pay your rent from any device.
              </p>
              <button className="px-6 py-3 bg-transparent border-2 border-blue-500 hover:bg-blue-700 rounded-4xl shadow-md font-medium transition-all duration-300">
                Browse Rentals
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Title */}
    </section>
  );
};

export default RentSection;
