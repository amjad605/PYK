import React from "react";
import { Shield, Users, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
function ValueSection() {
  return (
    <section className="py-40 bg-black h-full">
      <div className=" max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }} // start hidden and lower
          whileInView={{ opacity: 1, y: 0 }} // animate when visible
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }} // animate only once
          className="group text-center mb-16"
        >
          <h2 className="font-bold text-blue mb-4">Why We Value You</h2>
          {/* Decorative Line */}
          <div className="flex flex-col items-center justify-center m-2 group-hover:scale-125 transition-transform duration-300">
            <div className="text-center  bg-blue w-23 h-1 rounded-2xl  "></div>
          </div>
          <p className=" fluid-p text-white max-w-3xl mx-auto">
            At PYK, we believe in building lasting relationships beyond
            transactions. Your dreams and aspirations drive everything we do.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: {
              staggerChildren: 0.2, // delay between circles
            },
          }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            {
              icon: Shield,
              title: "Trust & Transparency",
              description:
                "We believe in honest communication and transparent processes throughout your real estate journey.",
            },
            {
              icon: Users,
              title: "Personal Relationships",
              description:
                "Every client is family to us. We take time to understand your unique needs and preferences.",
            },
            {
              icon: Award,
              title: "Excellence in Service",
              description:
                "We're committed to delivering exceptional service that exceeds your expectations every time.",
            },
            {
              icon: TrendingUp,
              title: "Your Success",
              description:
                "Your satisfaction and success in finding the perfect property is our ultimate measure of achievement.",
            },
          ].map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="bg-blue rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-md hover:shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="fluid-h4 font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="fluid-small text-white leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default ValueSection;
