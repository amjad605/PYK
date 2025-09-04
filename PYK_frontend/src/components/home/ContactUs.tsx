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

function ContactUs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-bold text-gray-800 mb-4">Get In Touch</h2>
          <p className=" text-gray-600 max-w-2xl mx-auto">
            Ready to find your dream property? Contact us today and let's start
            your journey together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Send us a Message
            </h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                  placeholder="Tell us about your property needs..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
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
                  {
                    icon: LocationIcon,
                    title: "Office",
                    info: "123 Real Estate Ave, Suite 100",
                    subtitle: "Downtown Business District",
                  },
                ].map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-blue-100 rounded-full p-3">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">
                          {contact.title}
                        </h4>
                        <p className="text-gray-600 font-medium">
                          {contact.info}
                        </p>
                        <p className="text-sm text-gray-500">
                          {contact.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <CompanyMap />
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, color: "hover:text-blue-600", Link: "" },
                  { icon: Twitter, color: "hover:text-blue-400" },
                  {
                    icon: Instagram,
                    color: "hover:text-pink-600",
                    Link: "https://www.instagram.com/pyk_investments/",
                  },
                  { icon: Linkedin, color: "hover:text-blue-700" },
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.Link || "#"}
                      className={`p-3 bg-gray-100 rounded-full text-gray-600 ${social.color} transition`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
