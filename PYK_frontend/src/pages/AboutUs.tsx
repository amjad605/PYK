"use client";

import Nav from "@/components/common/Nav";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const TargetIcon = () => (
  <svg
    className="w-10 h-10"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const ZapIcon = () => (
  <svg
    className="w-10 h-10"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"></polygon>
  </svg>
);

const GlobeIcon = () => (
  <svg
    className="w-10 h-10"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="m12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const SparklesIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
    <path d="M5 3v4"></path>
    <path d="M19 17v4"></path>
    <path d="M3 5h4"></path>
    <path d="M17 19h4"></path>
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12,5 19,12 12,19"></polyline>
  </svg>
);

const UsersIcon = () => (
  <svg
    className="w-12 h-12"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="m22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="m16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const CustomButton = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

  const variants = {
    default: "bg-black text-white hover:bg-white hover:text-black",
    outline:
      "border border-current bg-transparent hover:bg-current hover:text-background",
  };

  const sizes = {
    default: "h-10 py-2 px-4",
    lg: "h-12 px-8 py-3",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const CustomCard = ({ children, className = "" }) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
  >
    {children}
  </div>
);

const CustomCardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export default function AboutPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const coreValues = [
    {
      icon: TargetIcon,
      title: "Precision",
      description: "Every detail matters in finding your perfect space.",
    },
    {
      icon: ZapIcon,
      title: "Innovation",
      description: "Cutting-edge technology meets timeless service.",
    },
    {
      icon: GlobeIcon,
      title: "Vision",
      description: "Shaping the future of real estate, one property at a time.",
    },
  ];

  const achievements = [
    { number: "10K+", label: "Properties" },
    { number: "98%", label: "Satisfaction" },
    { number: "15+", label: "Years" },
    { number: "50+", label: "Cities" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-black h-full border-5 border-black">
        <Nav />
      </div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,197,253,0.1),transparent_50%)]" />

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <div className="animate-on-scroll">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8">
              <SparklesIcon />
              <span className="ml-2">The Future of Real Estate</span>
            </div>
            <h1 className=" text-4xl sm:text-6xl md:text-8xl font-light text-black mb-8 tracking-tight">
              We Build
              <span className="block text-blue font-medium">Tomorrow</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-800 mb-12 font-light max-w-3xl mx-auto leading-relaxed">
              Where innovation meets elegance. Discover properties that define
              the future of living.
            </p>
            <CustomButton
              size="lg"
              className="px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105"
            >
              Explore Our Vision
              <ArrowRightIcon />
            </CustomButton>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-5xl font-light text-gray-900 mb-8">
              Our Purpose
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-2xl text-gray-600 font-light max-w-4xl mx-auto leading-relaxed">
              Redefining real estate through intelligent design, sustainable
              innovation, and seamless digital experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mt-20">
            {coreValues.map((value, index) => (
              <div key={index} className="animate-on-scroll text-center group">
                <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-blue-100 transition-colors duration-300 text-blue-600">
                  <value.icon />
                </div>
                <h3 className="text-2xl font-medium text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-32  bg-black text-blue">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-5xl  text-white font-light mb-8">
              By the Numbers
            </h2>
            <div className="w-24 h-1 bg-white/30 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-12">
            {achievements.map((stat, index) => (
              <div key={index} className="text-center animate-on-scroll group">
                <div className="text-6xl font-light mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-xl font-light text-blue-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="animate-on-scroll">
            <h2 className="text-5xl font-light text-gray-900 mb-8">
              Leadership
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-12"></div>
            <p className="text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed mb-16">
              Visionaries who blend decades of expertise with forward-thinking
              innovation.
            </p>

            <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
              <CustomCard className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                <CustomCardContent className="p-12">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8 text-blue-600">
                    <UsersIcon />
                  </div>
                  <h3 className="text-2xl font-medium text-gray-900 mb-4">
                    Executive Team
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    Industry pioneers with 50+ years combined experience in
                    luxury real estate and technology innovation.
                  </p>
                </CustomCardContent>
              </CustomCard>

              <CustomCard className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                <CustomCardContent className="p-12">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8 text-blue-600">
                    <SparklesIcon />
                  </div>
                  <h3 className="text-2xl font-medium text-gray-900 mb-4">
                    Innovation Lab
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    Tech visionaries developing AI-powered property matching and
                    virtual reality experiences.
                  </p>
                </CustomCardContent>
              </CustomCard>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
    </div>
  );
}
