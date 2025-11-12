import React from "react";
import {
  Phone,
  Mail,
  MapPin as LocationIcon,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import CompanyMap from "./CompanyLocation";
import { Button } from "../ui/button";

function ContactUs() {
  return (
    <section
      id="contact"
      className="min-h-screen bg-blue text-white flex items-center py-12"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-bold text-4xl mb-4">Get In Touch</h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Ready to find your dream property? Contact us today and let's start
            your journey together.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Form + Social */}
          <div className="flex flex-col bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-blue-100 mb-6 text-xl font-semibold text-center">
              Contact Agent
            </h3>
            <form className="space-y-4 flex-1">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg border border-white/20 bg-white/20 text-white placeholder:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg border border-white/20 bg-white/20 text-white placeholder:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <textarea
                placeholder="Message"
                className="w-full p-3 rounded-lg border border-white/20 bg-white/20 text-white placeholder:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                rows={4}
              ></textarea>
              <Button className="w-full mt-2 bg-white text-blue hover:bg-black">
                Send Message
              </Button>
            </form>

            {/* Follow Us */}
            <div className="mt-8 bg-white/10 rounded-2xl shadow-lg border border-white/20 p-4">
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-3">
                {[
                  { icon: Facebook, color: "hover:text-blue-200", link: "#" },
                  { icon: Twitter, color: "hover:text-blue-300", link: "#" },
                  {
                    icon: Instagram,
                    color: "hover:text-pink-300",
                    link: "https://www.instagram.com/pyk_investments/",
                  },
                  { icon: Linkedin, color: "hover:text-blue-400", link: "#" },
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.link}
                      className={`p-2 bg-white/20 rounded-full text-white ${social.color} transition`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Information + Map */}
          <div className="space-y-6">
            {/* Info Cards */}
            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  title: "Phone",
                  info: "+1 (555) 123-4567",
                  subtitle: "Mon-Fri 9AM-6PM",
                },
                {
                  icon: Mail,
                  title: "Email",
                  info: "hello@pyk-realestate.com",
                  subtitle: "We'll respond within 24 hours",
                },
              ].map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                  >
                    <div className="bg-white/20 rounded-full p-3">
                      <Icon className="h-6 w-6 text-blue-100" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{contact.title}</h4>
                      <p className="font-medium text-blue-100">
                        {contact.info}
                      </p>
                      <p className="text-sm text-blue-200">
                        {contact.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-4 h-80">
              <CompanyMap />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
