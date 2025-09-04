import React from "react";
import { motion } from "framer-motion";
import {
  Home,
  Building,
  Building2,
  Castle,
  Warehouse,
  Coffee,
  type LucideIcon,
} from "lucide-react";
import CategoryCircle from "./CategoryCircle";
import CategoryTitle from "./CategoryTitle";

interface PropertyCategory {
  name: string;
  icon: LucideIcon;
  count: string;
}

const propertyCategories: PropertyCategory[] = [
  { name: "Villa", icon: Castle, count: "120+" },
  { name: "Duplex", icon: Building2, count: "85+" },
  { name: "Apartment", icon: Building, count: "200+" },
  { name: "Townhouse", icon: Home, count: "65+" },
  { name: "PentHouse", icon: Warehouse, count: "90+" },
  { name: "Studio", icon: Coffee, count: "45+" },
];

function CategorySection() {
  return (
    <section className=" bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }} // start hidden and lower
          whileInView={{ opacity: 1, y: 0 }} // animate when visible
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }} // animate only once
        >
          <CategoryTitle />
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: {
              staggerChildren: 0.2, // delay between circles
            },
          }}
          viewport={{ once: true }}
        >
          {propertyCategories.map((category, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <CategoryCircle category={category} index={index} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default CategorySection;
