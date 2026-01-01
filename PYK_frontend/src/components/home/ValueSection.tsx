import React from "react";
import { Shield, Users, Award, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function ValueSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollAmount = 300;

    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;

    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      // Initial check
      checkScrollPosition();

      // Re-check on resize
      window.addEventListener('resize', checkScrollPosition);

      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, []);

  return (
    <section className="py-20 md:py-40 bg-black h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="group text-center mb-12 md:mb-16"
        >
          <h2 className="font-bold text-blue mb-4">Why We Value You</h2>
          {/* Decorative Line */}
          <div className="flex flex-col items-center justify-center m-2 group-hover:scale-125 transition-transform duration-300">
            <div className="text-center bg-blue w-16 md:w-23 h-1 rounded-2xl"></div>
          </div>
          <p className="text-sm md:text-base lg:text-lg text-white max-w-3xl mx-auto px-4">
            At PYK, we believe in building lasting relationships beyond
            transactions. Your dreams and aspirations drive everything we do.
          </p>
        </motion.div>

        {/* Desktop Grid (hidden on mobile) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Shield,
              title: "Trust & Transparency",
              description:
                "We believe in honest communication and transparent processes throughout your real estate journey.",
            },
            {
              icon: Users,
              title: "Personal Approach",
              description:
                "Every client is family to us. We take time to understand your unique needs and preferences.",
            },
            {
              icon: Award,
              title: "Excellence in Service",
              description:
                "We're committed to delivering exceptional service that exceeds your expectations every time.",
            },
            {
              icon: TrendingUp,
              title: "Your Success",
              description:
                "Your satisfaction and success in finding the perfect property is our ultimate measure of achievement.",
            },
          ].map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="bg-blue rounded-full w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 flex items-center justify-center shadow-md hover:shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Icon className="h-6 w-6 md:h-8 md:w-8 text-black" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-sm md:text-base text-white leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Carousel (visible only on mobile) */}
        <div className="md:hidden relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2 ml-2"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2 mr-2"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          )}

          <motion.div
            ref={scrollContainerRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 px-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[
              {
                icon: Shield,
                title: "Trust & Transparency",
                description:
                  "We believe in honest communication and transparent processes throughout your real estate journey.",
              },
              {
                icon: Users,
                title: "Personal Approach",
                description:
                  "Every client is family to us. We take time to understand your unique needs and preferences.",
              },
              {
                icon: Award,
                title: "Excellence in Service",
                description:
                  "We're committed to delivering exceptional service that exceeds your expectations every time.",
              },
              {
                icon: TrendingUp,
                title: "Your Success",
                description:
                  "Your satisfaction and success in finding the perfect property is our ultimate measure of achievement.",
              },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="text-center group min-w-[280px] max-w-[280px] snap-center bg-gradient-to-b from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-blue transition-all duration-300 flex-shrink-0"
                >
                  <div className="bg-blue rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-md hover:shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <Icon className="h-7 w-7 text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Scroll indicator dots */}
          <div className="flex justify-center mt-6 gap-2">
            {[0, 1, 2, 3].map((dot) => (
              <div
                key={dot}
                className="w-2 h-2 rounded-full bg-gray-700"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hide scrollbar for Chrome/Safari */}

    </section>
  );
}

export default ValueSection;