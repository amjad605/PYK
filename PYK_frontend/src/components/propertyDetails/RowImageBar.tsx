"use client";
import { useState } from "react";
import { X } from "lucide-react";

const imagesmock = [
  "https://prod-images.nawy.com/processed/compound_image/image/11854/default.webp",
  "https://prod-images.nawy.com/processed/compound_image/image/11853/default.webp",
  "https://prod-images.nawy.com/processed/compound_image/image/11851/default.webp",
  "https://prod-images.nawy.com/processed/compound_image/image/11852/default.webp",
  "https://prod-images.nawy.com/processed/compound_image/image/11842/default.webp",
  "https://prod-images.nawy.com/processed/compound_image/image/11843/default.webp",
];
interface RowImageBarsProps {
  images: string[];
}

export default function RowImageBars({ images }: RowImageBarsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {/* الصف */}
      <div className="flex w-full gap-1 h-[68vh]">
        {images.map((img, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={idx}
              onMouseEnter={() => setActiveIndex(idx)}
              onClick={() => {
                setActiveIndex(idx);
                setOpenModal(true);
              }}
              className={`relative cursor-pointer overflow-hidden transition-all duration-500 ${
                isActive ? "flex-[4]" : "flex-[1]"
              }`}
            >
              <img
                src={img}
                alt={`image-${idx}`}
                className={`w-full h-full object-cover transition-all duration-500 hover:scale-105 ${
                  isActive ? "grayscale-0" : "grayscale"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {openModal && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setOpenModal(false)}
        >
          <div
            className="relative max-w-4xl w-[90%] h-[90%]"
            onClick={(e) => e.stopPropagation()} // يمنع غلق المودال لما تدوس جوا
          >
            <button
              className="absolute top-3 right-3 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition"
              onClick={() => setOpenModal(false)}
            >
              <X size={24} />
            </button>
            <img
              src={images[activeIndex]}
              alt="expanded"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
}
