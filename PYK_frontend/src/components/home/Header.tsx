import Nav from "../common/Nav";
import { motion } from "framer-motion";
import bg2 from "../../assets/bg.jpg";
import CountUp from "react-countup";
import LogoSlider from "./LogoSlider";

function Header() {
  const logos = [
    {
      src: "https://mountainviewe.com/wp-content/uploads/2025/05/MVLogo-White-New.png",
      alt: "Emaar",
    },
    {
      src: "https://mountainviewe.com/wp-content/uploads/2025/05/MVLogo-White-New.png",
      alt: "Palm Hills",
    },
    {
      src: "https://mountainviewe.com/wp-content/uploads/2025/05/MVLogo-White-New.png",
      alt: "SODIC",
    },
    {
      src: "https://mountainviewe.com/wp-content/uploads/2025/05/MVLogo-White-New.png",
      alt: "Mountain View",
    },
    {
      src: "https://mountainviewe.com/wp-content/uploads/2025/05/MVLogo-White-New.png",
      alt: "Hyde Park",
    },
  ];

  return (
    <div className="relative">
      <Nav />

      {/* Hero Section */}
      <section className="h-screen relative from-slate-800 via-slate-900 to-blue-900 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${bg2}")` }}
        ></div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 h-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
            {/* Left Side */}
            <div className="text-bottom pt-50 sm:pt-30 lg:p-0 xl-p-0">
              <motion.h1
                initial={{ opacity: 0, x: -150 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
                className="font-sans text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-5 leading-tight"
              >
                Not Just Deals,
                <br />
                <span className="text-blue">Bonds You Keep</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -150 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 2, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-l lg:text-xl text-gray-300 mb-8 leading-relaxed"
              >
                Discover the perfect property with our comprehensive real estate
                platform. From luxury villas to cozy apartments.
              </motion.p>

              {/* Stats */}
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 flex flex-row items-center">
                    <CountUp start={0} end={500} duration={2.5} />{" "}
                    <p className="text-blue">+</p>
                  </div>
                  <p className="fluid-small text-gray-300">Properties</p>
                </div>

                <div className="w-px h-8 bg-gray-300"></div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-blue">99+</div>
                  <p className="fluid-small text-gray-300">Satisfied</p>
                </div>

                <div className="w-px h-8 bg-gray-300"></div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-blue">98+</div>
                  <p className="fluid-small text-gray-300">Satisfied</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Logo Slider at the bottom */}
      </section>
    </div>
  );
}

export default Header;
