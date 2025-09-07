import Nav from "../common/Nav";
import { motion } from "framer-motion";
import bg2 from "../../assets/bg.jpg";
import CountUp from "react-countup";

function Header() {
  return (
    <div className="relative">
      <Nav />
      <section className="h-screen   from-slate-800 via-slate-900 to-blue-900  overflow-hidden">
        <div
          className=" top-0 absolute  bg-cover bg-center inset-0 w-full"
          style={{
            backgroundImage: `url("${bg2}")`,
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-6 h-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
            {/* Left side - Text content */}
            <div className="text-bottom pt-50 sm:pt-30 lg:p-0 xl-p-0 ">
              <motion.h1
                initial={{ opacity: 0, x: -150 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
                className="font-sans text-4xl lg:text-5xl xl:text-6xl  font-bold text-white mb-5 leading-tight"
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
                className="text-l lg:text-xl text-gray-300 mb-8 leading-relaxed  "
              >
                Discover the perfect property with our comprehensive real estate
                platform. From luxury villas to cozy apartments.
              </motion.p>

              {/*states*/}
              <div>
                <div className="flex items-center space-x-6">
                  <div className="text-center ">
                    <div className="text-2xl font-bold text-blue-600 flex flex-row items-center">
                      <CountUp start={0} end={500} duration={2.5} />{" "}
                      <p className="text-blue">+</p>
                    </div>

                    <p className="fluid-small text-gray-600">Properties</p>
                  </div>
                  <div className="w-px h-8 bg-gray-300"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue">99+</div>
                    <p className="fluid-small text-gray-600">Satisfied</p>
                  </div>
                  <div className="w-px h-8 bg-gray-300"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue">98+</div>
                    <p className="fluid-small text-gray-600">Satisfied</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Header;
