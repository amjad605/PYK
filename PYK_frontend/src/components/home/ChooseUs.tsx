import React from "react";
import FloatingStateCard from "../common/FloatingStateCard";
import realEstateTeam from "../../assets/professional-real-estate-team.png";
function ChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className=" font-bold text-gray-800 mb-6">
              Why Choose PYK Invest.?
            </h3>
            <p className=" text-gray-600 mb-8">
              With years of experience and a proven track record, we're your
              trusted partner in making one of life's biggest decisions.
            </p>

            <div className="space-y-6">
              {[
                {
                  title: "15+ Years Experience",
                  description:
                    "Extensive market knowledge and proven expertise in real estate transactions.",
                },
                {
                  title: "500+ Happy Clients",
                  description:
                    "Successfully helped hundreds of families find their dream homes.",
                },
                {
                  title: "Market Leaders",
                  description:
                    "Top-rated real estate agency with the highest customer satisfaction scores.",
                },
                {
                  title: "End-to-End Service",
                  description:
                    "From property search to closing, we handle every detail of your journey.",
                },
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-2 mt-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h5 className=" font-semibold text-gray-800 mb-1">
                      {feature.title}
                    </h5>
                    <p className="fluid-small text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <img
                src={realEstateTeam}
                alt="Professional real estate team"
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
            <FloatingStateCard />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChooseUs;
