// Nav.tsx
import React, { useState } from "react";
import logo from "../../assets/black.svg";
import logoBlack from "../../assets/PYK INVEST Brand identity-25.svg";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const NAV_ITEMS = [
  "Home",
  "Primary",
  "Resale",
  "Rent",
  "About Us",
  "Contact Us",
];

export default function Nav({
  heroSelector = "#hero",
  isBlack = false,
}: {
  heroSelector?: string;
  isBlack?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [isSolid, setIsSolid] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="absolute  w-full top-0 z-50">
      <nav
        className={`w-full transition-colors duration-300 ${
          isSolid ? "bg-white text-gray-800" : "bg-transparent text-white"
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-[92%] mx-auto px-0 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={isBlack ? logoBlack : logo}
                alt="Logo"
                className={`h-28 w-28 ml-4 sm:ml-0 transition-all duration-200`}
              />
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center space-x-6">
              {NAV_ITEMS.map((item) =>
                item === "Contact Us" ? (
                  <HashLink
                    smooth
                    key={item}
                    to="/#contact"
                    className={`text-sm transition-transform duration-200 hover:scale-110 px-2 py-1 ${
                      isSolid
                        ? "text-gray-800 hover:text-blue-600"
                        : isBlack
                        ? "text-black hover:text-blue-200"
                        : "text-white hover:text-blue-200"
                    } `}
                  >
                    {item}
                  </HashLink>
                ) : (
                  <Link
                    key={item}
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className={`text-sm transition-transform duration-200 hover:scale-110 px-2 py-1 ${
                      isSolid
                        ? "text-gray-800 hover:text-blue-600"
                        : isBlack
                        ? "text-black hover:text-blue-200"
                        : "text-white hover:text-blue-200"
                    } ${
                      (item === "Home" && currentPath === "/") ||
                      currentPath === `/${item.toLowerCase()}`
                        ? "text-blue font-medium border-b-2 border-blue pb-1"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item}
                  </Link>
                )
              )}
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label="Toggle menu"
                className={`p-2 rounded-md transition-colors ${
                  isSolid
                    ? "text-gray-800 hover:bg-gray-100/60"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {open ? (
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul
            className={`p-4 space-y-2 ${
              isSolid
                ? "bg-white/95 text-gray-800"
                : "bg-black/40 text-white backdrop-blur-md"
            } rounded-b-2xl`}
          >
            {NAV_ITEMS.map((item) =>
              item === "Contact Us" ? (
                <li key={item}>
                  <HashLink
                    smooth
                    to="/#contact"
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-2 rounded-md text-sm transition ${
                      isSolid ? "hover:bg-gray-100" : "hover:bg-white/10"
                    }`}
                  >
                    {item}
                  </HashLink>
                </li>
              ) : (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-2 rounded-md text-sm transition ${
                      isSolid ? "hover:bg-gray-100" : "hover:bg-white/10"
                    }`}
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
