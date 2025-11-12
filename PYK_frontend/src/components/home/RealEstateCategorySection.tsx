import React, { useRef, useEffect, useState } from "react";
import { RealEstateCategoryCard } from "./RealEstateCategoryCard";
import img1 from "../../assets/Modern Glass Architecture.png";
import img2 from "../../assets/Modern Architectural Entrance.png";
import img3 from "../../assets/Modern Chic Apartment Interior.png";
import img4 from "../../assets/Modern House at Twilight.png";
import { motion } from "framer-motion";

const categories = [
  {
    category: "primary" as const,
    title: "Primary",
    description:
      "Brand new constructions with the latest designs and cutting-edge technology.",
    imageUrl: img2,
  },

  {
    category: "resale" as const,
    title: "Resale",
    description:
      "Explore pre-owned properties offering great value and established neighborhoods.",
    imageUrl: img4,
  },
  {
    category: "rent" as const,
    title: "Rent",
    description:
      "Discover premium rental properties with flexible lease terms and modern amenities.",
    imageUrl: img3,
  },
];

const RealEstateCategorySection: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll to a slide by index (centers it)
  const scrollToIndex = (index: number) => {
    const container = sliderRef.current;
    if (!container) return;
    const slide = container.querySelector<HTMLElement>(
      `[data-slide-index="${index}"]`
    );
    if (slide) {
      slide.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setActiveIndex(index);
    }
  };

  const prev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const next = () =>
    scrollToIndex(Math.min(categories.length - 1, activeIndex + 1));

  // Update active index while user scrolls (keeps dots in sync)
  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const center = container.scrollLeft + container.clientWidth / 2;
        const slides = Array.from(
          container.querySelectorAll<HTMLElement>("[data-slide-index]")
        );
        let nearest = 0;
        let nearestDist = Infinity;
        slides.forEach((s) => {
          const sCenter = s.offsetLeft + s.offsetWidth / 2;
          const d = Math.abs(sCenter - center);
          const idx = Number(s.dataset.slideIndex);
          if (d < nearestDist) {
            nearestDist = d;
            nearest = idx;
          }
        });
        setActiveIndex(nearest);
      });
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const handleViewListings = (cat: string) => {
    // navigate(`/${cat}`);
    console.log("Viewing listings for", cat);
    // navigation logic...
  };

  return (
    <section className="py-12 px-4 bg-[var(--color-surface,#f9fafb)]">
      <div className=" max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="fluid-h2 font-bold text-[var(--color-text,#111827)] mb-2">
            Find Your Perfect Property
          </h2>
          <p className="fluid-p max-w-2xl mx-auto text-gray-600">
            Explore our curated selection of properties across different
            categories to find your ideal home or investment.
          </p>
        </motion.div>

        {/* MOBILE slider */}
        <div className="md:hidden relative">
          {/* slider container */}
          <div
            ref={sliderRef}
            className="-mx-4 px-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
            aria-label="Property categories"
            role="region"
          >
            <div className="flex gap-4">
              {categories.map((c, i) => (
                <div
                  key={c.category}
                  data-slide-index={i}
                  className="snap-center flex-shrink-0 w-[85%] sm:w-[70%]"
                >
                  <RealEstateCategoryCard
                    category={c.category}
                    title={c.title}
                    description={c.description}
                    imageUrl={c.imageUrl}
                    onViewListings={() => handleViewListings(c.category)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {categories.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-2 h-2 rounded-full ${
                  i === activeIndex
                    ? "bg-[var(--color-primary,#1d4ed8)]"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { staggerChildren: 2 }, // cards appear one by one
          }}
          viewport={{ once: true }}
          className="hidden md:flex md:flex-wrap md:justify-around md:gap-0 mt-6"
        >
          {categories.map((c, index) => (
            <motion.div
              initial={{ opacity: 0, y: 90 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.4,
                duration: 1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              key={c.category}
              className="w-[380px] "
            >
              <RealEstateCategoryCard
                category={c.category}
                title={c.title}
                description={c.description}
                imageUrl={c.imageUrl}
                onViewListings={() => handleViewListings(c.category)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RealEstateCategorySection;
