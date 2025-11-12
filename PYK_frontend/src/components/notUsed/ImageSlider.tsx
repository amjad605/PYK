"use client";
import { useState } from "react";

const images = [
  "https://prod-images.nawy.com/processed/compound_image/image/11854/default.webp",
  "https://prod-images.nawy.com/processed/compound_image/image/11853/default.webp",
  "https://prod-images.nawy.com/processed/compound_image/image/11851/default.webp",
  "https://prod-images.nawy.com/processed/compound_image/image/11852/default.webp",
  "https://prod-images.nawy.com/processed/compound_image/image/11842/default.webp",
  "https://prod-images.nawy.com/processed/compound_image/image/11843/default.webp",
];

export default function ImageSlider() {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* الصورة الكبيرة */}
      <div className="relative w-full h-[400px] overflow-hidden  shadow">
        <img
          src={activeImage}
          alt="main"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* thumbnails */}
      <div className="flex gap-2">
        {images.map((img, idx) => (
          <div
            key={idx}
            onMouseEnter={() => setActiveImage(img)}
            className={`relative h-[80px] flex-1 cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${
              activeImage === img ? "ring-2 ring-blue-500" : "opacity-70"
            }`}
          >
            <img
              src={img}
              alt={`thumb-${idx}`}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
