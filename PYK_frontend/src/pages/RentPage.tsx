"use client";

import Nav from "@/components/common/Nav";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import hero from "../assets/r-center.jpg";
export default function RentPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Nav />

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-100">
        <img
          src={hero}
          alt="Real estate investment"
          className="absolute inset-0 w-full h-full object-cover opacity-95"
        />
        <div className="absolute inset-0 bg-black/10 backdrop-blur-md" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-center px-6 max-w-2xl"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-blue-700 mb-6">
            <span className="text-white">Rent Smarter,</span> Earn Better
          </h1>

          <p className="text-lg md:text-2xl text-white mb-10">
            List, manage, or discover rentals with transparency and
            investment-grade data.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/rent/owner">
              <Button
                size="lg"
                className="px-8 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              >
                List Your Property
              </Button>
            </Link>

            <Link to={`/rent`} >
              <Button
                size="lg"
                className="px-8 text-lg bg-white border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Browse Rentals
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* CARDS */}
      <section className="py-24 px-6">
        <h2 className="text-4xl font-bold text-center mb-20 text-gray-900">
          Choose Your Path
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* OWNER CARD */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white border border-gray-200 rounded-2xl p-10 hover:shadow-md transition-all"
          >
            <h3 className="text-3xl font-bold text-blue-700 mb-4">
              I’m a Property Owner
            </h3>
            <p className="text-gray-600 mb-8">
              Reach verified tenants and manage your property efficiently.
            </p>

            <ul className="space-y-3 text-gray-700 mb-10">
              <li>✓ Verified tenant screening</li>
              <li>✓ Professional listing management</li>
              <li>✓ Legal contracts & support</li>
              <li>✓ Maintenance coordination</li>
            </ul>

            <Link to="/rent/owner">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 rounded-xl">
                Start Listing
              </Button>
            </Link>
          </motion.div>

          {/* RENTER CARD */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white border border-gray-200 rounded-2xl p-10 hover:shadow-md transition-all"
          >
            <h3 className="text-3xl font-bold text-blue-700 mb-4">
              I’m Looking to Rent
            </h3>
            <p className="text-gray-600 mb-8">
              Browse trusted listings with clear pricing and real details.
            </p>

            <ul className="space-y-3 text-gray-700 mb-10">
              <li>✓ Smart filters & maps</li>
              <li>✓ Verified properties</li>
              <li>✓ Virtual tours & floor plans</li>
              <li>✓ No hidden pricing</li>
            </ul>

            <Link to="/rent/search">
              <Button
                variant="outline"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-6 rounded-xl"
              >
                Browse Rentals
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
