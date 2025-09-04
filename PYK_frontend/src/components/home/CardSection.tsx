import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { motion } from "framer-motion";
import img from "../../assets/Image-4.png";
import img2 from "../../assets/Image-5.png";
import img3 from "../../assets/Image-6.png";
import rent from "../../assets/rent.svg";
import buyHome from "../../assets/buy-home.svg";
import buy from "../../assets/buy.svg";

export default function PropertyOptions() {
  const options = [
    {
      title: "Rent",
      icon: <img src={rent} />,
      img: img,
    },
    {
      title: "Resale",
      icon: <img src={buyHome} />,
      img: img3,
    },
    {
      title: "Primary",
      icon: <img src={buy} />,
      img: img2,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === options.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? options.length - 1 : prev - 1));
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    trackMouse: true,
  });

  return (
    <section className="my-20 max-w-7xl mx-auto">
      <div className="text-center mb-16 ">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Find Your Perfect Property
        </h2>
        <p className="text-md  text-gray-600 max-w-3xl mx-auto">
          Whether you're looking to rent or buy, we have options to fit every
          lifestyle and budget.
        </p>
      </div>
      <div className="mx-auto px-6 pb-10 max-w-7xl">
        {/* ✅ Mobile slider */}
        <div {...handlers} className="block md:hidden relative overflow-hidden">
          {/* Slide */}
          <div
            className={`${
              currentIndex === 1 ? "bg-blue-100" : "bg-blue-100"
            } rounded-2xl text-center transition-all duration-500 ease-in`}
          >
            <div className="my-8 flex justify-center pt-10">
              {options[currentIndex].icon}
            </div>
            <h3
              className={`text-xl font-semibold ${
                currentIndex === 1 ? "text-white" : "text-black"
              }`}
            >
              {options[currentIndex].title}
            </h3>
            <button
              className={`${
                currentIndex !== 1 ? "bg-black" : "bg-black"
              } text-white rounded-2xl w-32 px-4 py-2 mt-6 hover:bg-gray-800 transition-colors`}
            >
              Browse
            </button>

            {/* Circle background */}
            <div className="relative top-10 right-10 z-[0] flex justify-center mt-0">
              <div className="w-50 h-50 absolute bg-primary rounded-full"></div>
            </div>

            <img
              className="relative z-10 pt-20 mx-auto"
              src={options[currentIndex].img}
              alt={options[currentIndex].title}
            />
          </div>

          {/* Prev button */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
          >
            ‹
          </button>

          {/* Next button */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
          >
            ›
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {options.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  idx === currentIndex ? "bg-black" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ✅ Desktop grid (unchanged) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { staggerChildren: 2 }, // cards appear one by one
          }}
          viewport={{ once: true }}
          className="hidden md:grid grid-cols-3 gap-6"
        >
          {options.map((opt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 90 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`${
                i === 1 ? "bg-blue-100" : "bg-blue-100"
              } rounded-2xl text-center group  `}
            >
              <div className="group my-8 flex justify-center">{opt.icon}</div>
              <h3
                className={`text-xl font-semibold ${
                  i === 1 ? "text-black" : "text-black"
                }`}
              >
                {opt.title}
              </h3>
              <button
                className={`${
                  i !== 1 ? "bg-black" : "bg-black"
                } text-white rounded-2xl w-32 px-4 py-2 mt-6 hover:bg-gray-800 transition-colors`}
              >
                Browse
              </button>
              <div className="relative top-10 right-10 z-[0] flex justify-center mt-0">
                <div className="w-50 h-50 md:h-38 md:w-38 lg:h-50 lg:w-50  absolute bg-primary rounded-full  "></div>
              </div>
              <img
                className="relative z-10 pt-20 mx-auto group-hover:scale-105 transition-transform duration-300 ease-in-out"
                src={opt.img}
                alt=""
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
