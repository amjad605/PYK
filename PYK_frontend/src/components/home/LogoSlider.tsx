import React, { useEffect, useRef } from "react";

interface Logo {
  src: string;
  alt?: string;
}

interface LogoSliderProps {
  logos: Logo[];
  speed?: number; // pixels per frame
}

const LogoSlider: React.FC<LogoSliderProps> = ({ logos, speed = 0.5 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || logos.length === 0) return;

    const totalWidth = container.scrollWidth;
    let offset = 0;

    const step = () => {
      offset -= speed;
      if (Math.abs(offset) >= totalWidth / 2) {
        offset = 0;
      }
      container.style.transform = `translateX(${offset}px)`;
      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [speed, logos.length]);

  // repeat logos enough times to fill and overflow the screen (for seamless loop)
  const repeated = [...logos, ...logos, ...logos];

  return (
    <div className="relative w-full overflow-hidden select-none py-4">
      <div
        ref={containerRef}
        className="flex items-center gap-10"
        style={{
          willChange: "transform",
        }}
      >
        {repeated.map((logo, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-28 h-14 flex justify-center items-center"
          >
            <img
              src={logo.src}
              alt={logo.alt || "logo"}
              className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-transform duration-300 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoSlider;
