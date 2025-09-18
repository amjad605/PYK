"use client";

import type { FC } from "react";
import { Link } from "react-router-dom";

interface RealEstateCategoryCardProps {
  category: "rent" | "resale" | "primary";
  title: string;
  description: string;
  imageUrl: string;
  onViewListings: () => void;
  className?: string;
}

export const RealEstateCategoryCard: FC<RealEstateCategoryCardProps> = ({
  category,
  title,
  description,
  imageUrl,
  onViewListings,
  className = "",
}) => {
  return (
    <div
      className={`relative w-full h-[400px] overflow-hidden group cursor-pointer transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-2xl rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 ${className}`}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={
            imageUrl ||
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzQzYTQwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNhMGEyYTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Nb2Rlcm4gUmVhbCBFc3RhdGU8L3RleHQ+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiNhMGEyYTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIxLjNlbSI+UHJvcGVydHkgSW1hZ2U8L3RleHQ+PC9zdmc+"
          }
          alt={`${category} property - ${title}`}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:blur-xs"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-blue-300/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      </div>

      {/* Futuristic Border Effect */}
      <div className="absolute inset-0 rounded-2xl border border-blue-400/20 group-hover:border-blue-400/40 transition-colors duration-300" />

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-between p-6 text-white">
        {/* Category Badge */}
        <div className="flex justify-end">
          <div className="px-4 py-1.5 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-xs font-medium uppercase tracking-wider text-white">
            {category}
          </div>
        </div>

        {/* Bottom Content */}
        <div className="space-y-6">
          {/* Title with futuristic styling */}
          <h3 className="text-3xl font-bold tracking-tight text-balance leading-tight text-white">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed text-white/80 text-pretty line-clamp-2">
            {description}
          </p>

          {/* CTA Button with modern design */}
          <Link to={`/${category}`}>
            <button
              onClick={onViewListings}
              type="button"
              className="group/btn relative w-full bg-black/90 backdrop-blur-sm hover:bg-black text-white font-medium transition-all duration-300 py-3 px-4 rounded-xl border border-white/20 hover:border-blue-400/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 overflow-hidden"
            >
              {/* Button background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-blue-300/10 to-purple-500/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
              <span className="relative flex items-center justify-center gap-2">
                View Listings
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-100 ease-in-out pointer-events-none">
        <div className="absolute inset-0 rounded-2xl shadow-[0_0_50px_rgba(139,92,246,0.15)]" />
      </div>
    </div>
  );
};
