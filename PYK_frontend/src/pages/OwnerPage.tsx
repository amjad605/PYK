"use client";

import type React from "react";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export default function OwnerPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    propertyType: "",
    location: "",
    budget: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    setSubmitted(true);
    // Reset after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        phone: "",
        propertyType: "",
        location: "",
        budget: "",
        notes: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-blue text-primary-foreground py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/rent"
            className="inline-flex items-center text-sm opacity-80 hover:opacity-100 mb-4"
          >
            <span>← Back to Rent</span>
          </Link>
          <h1 className="text-3xl text-white font-bold">
            List Your Property with Us
          </h1>
          <p className="text-lg text-gray-300 opacity-90 mt-2">
            Professional management from listing to tenant placement
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Welcome Section */}
        <Card className="p-8 mb-12 bg-card">
          <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            We make property management simple, transparent, and stress-free.
            Our platform connects property owners like you with qualified
            tenants while handling all the administrative work.
          </p>
        </Card>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* What We Offer */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-6">What We Offer</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold text-lg">1</span>
                <div>
                  <p className="font-semibold">Professional Photography</p>
                  <p className="text-sm text-muted-foreground">
                    High-quality photos & virtual tours
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold text-lg">2</span>
                <div>
                  <p className="font-semibold">Wide Distribution</p>
                  <p className="text-sm text-muted-foreground">
                    Listed across multiple platforms
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold text-lg">3</span>
                <div>
                  <p className="font-semibold">Tenant Screening</p>
                  <p className="text-sm text-muted-foreground">
                    Background & credit verification
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold text-lg">4</span>
                <div>
                  <p className="font-semibold">Legal Support</p>
                  <p className="text-sm text-muted-foreground">
                    Contract & documentation help
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold text-lg">5</span>
                <div>
                  <p className="font-semibold">Ongoing Support</p>
                  <p className="text-sm text-muted-foreground">
                    24/7 tenant & property support
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Process Steps */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-6">How It Works</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-blue text-primary-foreground flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="w-0.5 h-12 bg-border mt-2"></div>
                </div>
                <div className="pb-8">
                  <h4 className="font-bold mb-1">Submit Your Property</h4>
                  <p className="text-sm text-muted-foreground">
                    Fill out our simple form with property details and your
                    contact information.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-blue text-primary-foreground flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="w-0.5 h-12 bg-border mt-2"></div>
                </div>
                <div className="pb-8">
                  <h4 className="font-bold mb-1">Professional Setup</h4>
                  <p className="text-sm text-muted-foreground">
                    Our team handles photography, copywriting, and creates your
                    professional listing.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-blue text-primary-foreground flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="w-0.5 h-12 bg-border mt-2"></div>
                </div>
                <div className="pb-8">
                  <h4 className="font-bold mb-1">Tenant Matching</h4>
                  <p className="text-sm text-muted-foreground">
                    We screen and match you with qualified tenants who fit your
                    criteria.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-blue text-primary-foreground flex items-center justify-center font-bold">
                    4
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Move In & Beyond</h4>
                  <p className="text-sm text-muted-foreground">
                    We coordinate move-in, handle disputes, and manage
                    maintenance requests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <Card className="p-8">
          <h3 className="text-2xl font-bold mb-6">
            Tell Us About Your Property
          </h3>

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2">Thank You!</h4>
              <p className="text-muted-foreground">
                We've received your property details. Our team will contact you
                shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 000-0000"
                    required
                  />
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Property Type *
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    required
                  >
                    <option value="">Select property type</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="studio">Studio</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Location *
                  </label>
                  <Input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, State or Address"
                    required
                  />
                </div>

                {/* Budget / Expected Rent */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Expected Monthly Rent *
                  </label>
                  <Input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="e.g., $2,500"
                    required
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Tell us more about your property, amenities, lease terms, etc."
                  rows={5}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                />
              </div>

              {/* Submit */}
              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  Submit Property
                </Button>
                <Link to="/rent" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    Cancel
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                We'll review your information and contact you within 24 hours to
                discuss your property.
              </p>
            </form>
          )}
        </Card>
      </div>
    </main>
  );
}
