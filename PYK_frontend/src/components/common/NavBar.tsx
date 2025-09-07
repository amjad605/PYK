import React, { useEffect, useState } from "react";

type NavItem = { label: string; href: string };

interface NavbarProps {
  logoSrc: string;
  brand?: string;
  items?: NavItem[];
  cta?: { label: string; href?: string; onClick?: () => void };
}

const DEFAULT_ITEMS: NavItem[] = [
  { label: "Home", href: "#" },
  { label: "Property", href: "#property" },
  { label: "User", href: "#user" },
  { label: "Rental", href: "#rental" },
];

export default function Navbar({
  logoSrc,
  brand = "Brand",
  items = DEFAULT_ITEMS,
  cta,
}: NavbarProps) {
  const [active, setActive] = useState(items[0]?.label ?? "");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // subtle size + shadow change on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <nav className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div
          className={[
            "flex items-center justify-between rounded-full",
            "px-4 sm:px-6 py-3",
            // glassmorphism
            "bg-white/5 backdrop-blur-xl",
            // border + shadow for depth
            "border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.08)]",
            scrolled ? "ring-1 ring-black/5" : "ring-0",
          ].join(" ")}
        >
          {/* Left: Logo + Brand */}
          <a href="/" className="flex items-center gap-3">
            <img
              src={logoSrc}
              alt="Logo"
              className="h-10 w-10 md:h-18 md:w-18 rounded-full object-cover"
            />
            <span className="hidden sm:inline text-lg font-semibold tracking-tight text-gray-900">
              {brand}
            </span>
          </a>

          {/* Center: Desktop menu */}
          <ul className="hidden md:flex items-center gap-2">
            {items.map((item) => {
              const isActive = active === item.label;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setActive(item.label)}
                    className={[
                      "block rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                      "hover:scale-[1.03] hover:bg-blue-500/10 hover:text-blue-700",
                      isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-800",
                    ].join(" ")}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right: CTA + burger */}
          <div className="flex items-center gap-2">
            {cta && (
              <a
                href={cta.href}
                onClick={cta.onClick}
                className="hidden sm:inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold
                           bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-colors"
              >
                {cta.label}
              </a>
            )}

            {/* Mobile menu button */}
            <button
              aria-label="Toggle menu"
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/10 transition"
              onClick={() => setOpen((v) => !v)}
            >
              {/* Hamburger / X */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transition-transform duration-300 ${
                  open ? "rotate-90" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={[
            "md:hidden overflow-hidden transition-[max-height,opacity,margin] duration-300",
            open ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0",
          ].join(" ")}
        >
          <ul className="rounded-2xl border border-white/20 bg-white/70 backdrop-blur-xl shadow-md p-2">
            {items.map((item) => {
              const isActive = active === item.label;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => {
                      setActive(item.label);
                      setOpen(false);
                    }}
                    className={[
                      "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-800 hover:bg-blue-500/10 hover:text-blue-700",
                    ].join(" ")}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
            {cta && (
              <li className="mt-1">
                <a
                  href={cta.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-semibold bg-blue-600 text-white text-center hover:bg-blue-700"
                >
                  {cta.label}
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
