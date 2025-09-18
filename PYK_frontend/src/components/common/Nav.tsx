// Nav.tsx
import React, { useEffect, useState } from "react";
import logo from "../../assets/black.svg"; // your logo
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = ["Home", "Primary", "Resale", "Rent", "About", "Contact Us"];

export default function Nav({
  heroSelector = "#hero",
}: {
  heroSelector?: string;
}) {
  const [open, setOpen] = useState(false);
  const [isSolid, setIsSolid] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  // Observe hero visibility. If hero is NOT intersecting -> make nav solid.
  useEffect(() => {
    const hero = document.querySelector(heroSelector);
    console.log("curr path is :" + currentPath);
    if (!hero) {
      // fallback: simple scroll threshold
      const onScroll = () => setIsSolid(window.scrollY > 800);
      onScroll();
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }

    // Use nav height as negative rootMargin so nav turns solid exactly when it should.
    const navHeightPx = 64; // matches h-16 (16*4=64px)
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSolid(!entry.isIntersecting);
      },
      { root: null, threshold: 0, rootMargin: `-${navHeightPx}px 0px 0px 0px` }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [heroSelector]);

  // close mobile menu if nav becomes solid (optional, nice UX)
  useEffect(() => {
    if (isSolid) setOpen(false);
  }, [isSolid]);

  return (
    <header className="sticky top-0 z-50">
      {/* nav background toggles based on isSolid */}
      <nav
        className={`w-full transition-colors duration-300 ${"bg-transparent text-white"}`}
        aria-label="Main navigation"
      >
        <div className="max-w-[92%] mx-auto px-0 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              {/* If your black logo is invisible on hero, replace with white logo or use CSS invert. 
                  invert may not work on all svgs—better to provide a white svg for hero. */}
              <img
                src={logo}
                alt="Logo"
                className={`h-30 w-30  ml-4 sm:ml-0 transition-all duration-200 }`}
              />
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center space-x-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item}
                  to={
                    item === "Contact Us"
                      ? "/#contact"
                      : `/${item.toLocaleLowerCase()}`
                  }
                  className={`text-sm transition-transform duration-200 hover:scale-110 px-2 py-1 r ${
                    isSolid
                      ? "text-gray-800 hover:text-blue-600"
                      : "text-white hover:text-blue-200"
                  } 
                  ${
                    currentPath === `/${item.toLocaleLowerCase()}`
                      ? "text-blue font-medium border-b-2 border-blue pb-1"
                      : "text-muted-foreground"
                  }
                  
                  `}
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Right side (CTA or icons) */}
            <div className="md:hidden flex items-center gap-3">
              {/* Mobile hamburger */}
              <div className="md:hidden">
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
                    // X icon
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
                    // Hamburger
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
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <Link
                  to={
                    item === "Contact Us"
                      ? "/#contact"
                      : `/${item.toLocaleLowerCase()}`
                  }
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2 rounded-md text-sm transition ${
                    isSolid ? "hover:bg-gray-100" : "hover:bg-white/10"
                  }`}
                >
                  {item}
                </Link>
              </li>
            ))}

            {/* mobile CTA */}
          </ul>
        </div>
      </nav>
    </header>
  );
}
