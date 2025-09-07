"use client";

import { useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button"; // adjust import path if needed

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: hook this into your backend / email service
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Send us a Message
      </h3>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="John"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Doe"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="john@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="+20 100 737 9415"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
            placeholder="Tell us about your property needs..."
            required
          ></textarea>
        </div>
        <Button
          type="submit"
          className="w-full h-12  px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
        >
          Send Message
        </Button>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <Button
            type="button"
            className="flex items-center h-12  justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            onClick={() => window.open("https://wa.me/201007379415", "_blank")}
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp
          </Button>
          <Button
            type="button"
            className="flex items-center h-12  justify-center gap-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            onClick={() => window.open("tel:+201007379415", "_self")}
          >
            <Phone className="h-5 w-5" />
            Call Agent
          </Button>
        </div>
      </form>
    </div>
  );
};
