"use client";

import type React from "react";
import { useState } from "react";
import axios from "axios";

export default function AddPropertyPage() {
  const predefinedFacilities = [
    "Swimming Pool",
    "Gym",
    "Parking",
    "Security",
    "Garden",
    "Playground",
    "Clubhouse",
    "Tennis Court",
    "Basketball Court",
    "Spa",
    "Sauna",
    "Jacuzzi",
    "BBQ Area",
    "Kids Area",
    "Pet Area",
    "Concierge",
    "Elevator",
    "Central AC",
    "Balcony",
    "Terrace",
  ];

  // Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFacilitiesOpen, setIsFacilitiesOpen] = useState(false);

  // Image states
  const [propertyImages, setPropertyImages] = useState<File[]>([]);
  const [floorPlanImages, setFloorPlanImages] = useState<File[]>([]);

  // Individual form states
  const [listingType, setListingType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [unitLevel, setUnitLevel] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  // Area states
  const [builtUpArea, setBuiltUpArea] = useState(0);
  const [landArea, setLandArea] = useState(0);
  const [totalArea, setTotalArea] = useState(0);
  const [gardenArea, setGardenArea] = useState(0);
  const [terraceArea, setTerraceArea] = useState(0);
  const [roofArea, setRoofArea] = useState(0);

  // Price states
  const [currency, setCurrency] = useState("EGP");
  const [priceAmount, setPriceAmount] = useState(0);
  const [monthlyRent, setMonthlyRent] = useState(0);

  // Payment plan states
  const [downPayment, setDownPayment] = useState(0);
  const [installmentYears, setInstallmentYears] = useState(0);
  const [paymentFrequency, setPaymentFrequency] = useState("monthly");

  // Property details
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);

  // Location states
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [compound, setCompound] = useState("");
  const [developerName, setDeveloperName] = useState("");

  // Features and facilities
  const [finishing, setFinishing] = useState("");
  const [hasGarden, setHasGarden] = useState(false);
  const [hasTerrace, setHasTerrace] = useState(false);
  const [facilities, setFacilities] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");

  // Handle property images
  const handlePropertyImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setPropertyImages((prev) => [...prev, ...newFiles]);
    }
  };

  // Handle floor plan images
  const handleFloorPlanImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFloorPlanImages((prev) => [...prev, ...newFiles]);
    }
  };

  // Remove property image
  const removePropertyImage = (indexToRemove: number) => {
    setPropertyImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  // Remove floor plan image
  const removeFloorPlanImage = (indexToRemove: number) => {
    setFloorPlanImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  // Toggle facility selection
  const handleFacilityToggle = (facility: string) => {
    setFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  };

  // Add feature on Enter key press
  const handleFeatureAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && featureInput.trim()) {
      const newFeature = featureInput.trim();
      if (!features.includes(newFeature)) {
        setFeatures((prev) => [...prev, newFeature]);
      }
      setFeatureInput("");
      e.preventDefault();
    }
  };

  // Remove feature
  const handleFeatureRemove = (featureToRemove: string) => {
    setFeatures((prev) => prev.filter((f) => f !== featureToRemove));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the data object in the required format
    const formData = {
      listingType,
      propertyType,
      unitLevel,
      title,
      description,
      status,
      areas: {
        builtUp: builtUpArea,
        land: landArea,
        total: totalArea,
        garden: gardenArea,
        terrace: terraceArea,
        roof: roofArea,
      },
      price: {
        currency,
        amount: priceAmount,
        monthlyRent,
        paymentPlan: {
          downPayment,
          installments: {
            year: installmentYears,
            frequency: paymentFrequency,
          },
        },
      },
      bedrooms,
      bathrooms,
      location: {
        city,
        district,
        compound,
      },
      media: {
        images: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1548&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1740&auto=format&fit=crop",
        ],
        floorPlans: floorPlanImages,
      },
      developer: {
        name: developerName,
      },
      finishing,
      hasGarden,
      hasTerrace,
      facilities,
      features,
    };

    console.log("Property Data:", formData);

    try {
      const res = await axios.post("http://localhost:3000/property", formData, {
        headers: {},
      });
      console.log("Created property:", res.data);
      alert("Property created successfully!");
      setIsFormOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error creating property:", error);
      alert("Error creating property. Please try again.");
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setListingType("");
    setPropertyType("");
    setUnitLevel(null);
    setTitle("");
    setDescription("");
    setStatus("");
    setBuiltUpArea(0);
    setLandArea(0);
    setTotalArea(0);
    setGardenArea(0);
    setTerraceArea(0);
    setRoofArea(0);
    setCurrency("EGP");
    setPriceAmount(0);
    setMonthlyRent(0);
    setDownPayment(0);
    setInstallmentYears(0);
    setPaymentFrequency("monthly");
    setBedrooms(0);
    setBathrooms(0);
    setCity("");
    setDistrict("");
    setCompound("");
    setDeveloperName("");
    setFinishing("");
    setHasGarden(false);
    setHasTerrace(false);
    setFacilities([]);
    setFeatures([]);
    setFeatureInput("");
    setPropertyImages([]);
    setFloorPlanImages([]);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl flex justify-between mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Property Management
        </h1>

        {/* Add Property Button */}
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Add Property
        </button>

        {/* Property Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-gray-900/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Add New Property
                  </h2>
                  <button
                    onClick={() => setIsFormOpen(false)}
                    className="text-muted hover:text-foreground text-2xl"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Section 1: Basic Information */}
                  <div className="bg-card p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-card-foreground mb-4">
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                          placeholder="Property title"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Status
                        </label>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                          required
                        >
                          <option value="">Select status</option>
                          <option value="available">Available</option>
                          <option value="sold">Sold</option>
                          <option value="rented">Rented</option>
                          <option value="reserved">Reserved</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Description
                        </label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={3}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                          placeholder="Property description"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Property Classification */}
                  <div className="bg-card p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-card-foreground mb-4">
                      Property Classification
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Listing Type
                        </label>
                        <select
                          value={listingType}
                          onChange={(e) => setListingType(e.target.value)}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                          required
                        >
                          <option value="">Select listing type</option>
                          <option value="primary">Primary</option>
                          <option value="resale">Resale</option>
                          <option value="rent">Rent</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Property Type
                        </label>
                        <select
                          value={propertyType}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                          required
                        >
                          <option value="">Select property type</option>
                          <option value="apartment">Apartment</option>
                          <option value="villa">Villa</option>
                          <option value="townhouse">Townhouse</option>
                          <option value="twin_house">Twin House</option>
                          <option value="duplex">Duplex</option>
                          <option value="penthouse">Penthouse</option>
                          <option value="studio">Studio</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Unit Level
                        </label>
                        <select
                          value={null}
                          onChange={(e) => setUnitLevel(e.target.value)}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                        >
                          <option value="">Select unit level</option>
                          <option value="ground">Ground</option>
                          <option value="middle">Middle</option>
                          <option value="roof">Roof</option>
                          <option value="duplex-lower">Duplex Lower</option>
                          <option value="duplex-upper">Duplex Upper</option>
                        </select>
                      </div>
                      <div className="flex gap-6">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={hasGarden}
                            onChange={(e) => setHasGarden(e.target.checked)}
                            className="mr-2 w-4 h-4 text-accent bg-input border-border rounded focus:ring-ring"
                          />
                          <span className="text-sm font-medium text-card-foreground">
                            Has Garden
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={hasTerrace}
                            onChange={(e) => setHasTerrace(e.target.checked)}
                            className="mr-2 w-4 h-4 text-accent bg-input border-border rounded focus:ring-ring"
                          />
                          <span className="text-sm font-medium text-card-foreground">
                            Has Terrace
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Pricing & Specifications */}
                  <div className="bg-card p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-card-foreground mb-4">
                      Pricing & Specifications
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Currency
                        </label>
                        <select
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                        >
                          <option value="EGP">EGP</option>
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          {listingType === "rent" ? "Monthly Rent" : "Price"}
                        </label>
                        <input
                          type="number"
                          value={
                            listingType === "rent" ? monthlyRent : priceAmount
                          }
                          onChange={(e) =>
                            listingType === "rent"
                              ? setMonthlyRent(Number(e.target.value))
                              : setPriceAmount(Number(e.target.value))
                          }
                          className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                          placeholder="Enter amount"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Built Up Area (sqm)
                        </label>
                        <input
                          type="number"
                          value={builtUpArea}
                          onChange={(e) =>
                            setBuiltUpArea(Number(e.target.value))
                          }
                          className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                          placeholder="120"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Bedrooms
                        </label>
                        <input
                          type="number"
                          value={bedrooms}
                          onChange={(e) => setBedrooms(Number(e.target.value))}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                          placeholder="3"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Bathrooms
                        </label>
                        <input
                          type="number"
                          value={bathrooms}
                          onChange={(e) => setBathrooms(Number(e.target.value))}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                          placeholder="2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Land Area (sqm)
                        </label>
                        <input
                          type="number"
                          value={landArea}
                          onChange={(e) => setLandArea(Number(e.target.value))}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                          placeholder="200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Garden Area (sqm)
                        </label>
                        <input
                          type="number"
                          value={gardenArea}
                          onChange={(e) =>
                            setGardenArea(Number(e.target.value))
                          }
                          className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                          placeholder="50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Terrace Area (sqm)
                        </label>
                        <input
                          type="number"
                          value={terraceArea}
                          onChange={(e) =>
                            setTerraceArea(Number(e.target.value))
                          }
                          className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                          placeholder="30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Finishing
                        </label>
                        <select
                          value={finishing}
                          onChange={(e) => setFinishing(e.target.value)}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                        >
                          <option value="">Select finishing</option>
                          <option value="core-shell">Core & Shell</option>
                          <option value="semi-finished">Semi-finished</option>
                          <option value="finished">Finished</option>
                          <option value="red-brick">Red Brick</option>
                          <option value="luxury-finished">
                            Luxury Finished
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Location */}
                  <div className="bg-card p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-card-foreground mb-4">
                      Location
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                          placeholder="Cairo"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          District
                        </label>
                        <input
                          type="text"
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                          placeholder="New Cairo"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Developer Name
                        </label>
                        <input
                          type="text"
                          value={developerName}
                          onChange={(e) => setDeveloperName(e.target.value)}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                          placeholder="Developer name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Compound Name
                        </label>
                        <input
                          type="text"
                          value={compound}
                          onChange={(e) => setCompound(e.target.value)}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                          placeholder="Compound name"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 5: Payment Plan */}
                  {listingType === "primary" && (
                    <div className="bg-card p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-card-foreground mb-4">
                        Payment Plan
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-card-foreground mb-2">
                            Down Payment (%)
                          </label>
                          <input
                            type="number"
                            value={downPayment}
                            onChange={(e) =>
                              setDownPayment(Number(e.target.value))
                            }
                            className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                            placeholder="20"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-card-foreground mb-2">
                            Installment Years
                          </label>
                          <input
                            type="number"
                            value={installmentYears}
                            onChange={(e) =>
                              setInstallmentYears(Number(e.target.value))
                            }
                            className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                            placeholder="5"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-card-foreground mb-2">
                            Payment Frequency
                          </label>
                          <select
                            value={paymentFrequency}
                            onChange={(e) =>
                              setPaymentFrequency(e.target.value)
                            }
                            className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                          >
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="yearly">Yearly</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Section 6: Facilities & Features */}
                  <div className="bg-card p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-card-foreground mb-4">
                      Facilities & Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Facilities Dropdown */}
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Facilities
                        </label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setIsFacilitiesOpen(!isFacilitiesOpen)
                            }
                            className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-left flex justify-between items-center"
                          >
                            <span className="text-sm">
                              {facilities.length
                                ? `${facilities.length} selected`
                                : "Select facilities"}
                            </span>
                            <span
                              className={`transform transition-transform ${
                                isFacilitiesOpen ? "rotate-180" : ""
                              }`}
                            >
                              ▼
                            </span>
                          </button>

                          {isFacilitiesOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-input border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                              {predefinedFacilities.map((facility) => (
                                <label
                                  key={facility}
                                  className="flex items-center p-3 hover:bg-muted cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    checked={facilities.includes(facility)}
                                    onChange={() =>
                                      handleFacilityToggle(facility)
                                    }
                                    className="mr-3 w-4 h-4 text-accent bg-input border-border rounded focus:ring-ring"
                                  />
                                  <span className="text-sm text-card-foreground">
                                    {facility}
                                  </span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Selected Facilities Display */}
                        {facilities.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {facilities.map((facility) => (
                              <span
                                key={facility}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground"
                              >
                                {facility}
                                <button
                                  type="button"
                                  onClick={() => handleFacilityToggle(facility)}
                                  className="ml-2 text-accent-foreground hover:text-destructive"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Features Input */}
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Features
                        </label>
                        <input
                          type="text"
                          value={featureInput}
                          onChange={(e) => setFeatureInput(e.target.value)}
                          onKeyDown={handleFeatureAdd}
                          placeholder="Type a feature and press Enter"
                          className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                        />
                        <p className="text-xs text-muted mt-1">
                          Press Enter to add each feature
                        </p>

                        {/* Features List */}
                        {features.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {features.map((feature, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-2 bg-muted rounded-lg"
                              >
                                <span className="text-sm text-card-foreground">
                                  {feature}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleFeatureRemove(feature)}
                                  className="text-muted-foreground hover:text-destructive text-sm"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section 7: Images */}
                  <div className="bg-card p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-card-foreground mb-4">
                      Images
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Property Images */}
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Property Images
                        </label>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handlePropertyImagesChange}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-secondary-foreground hover:file:bg-opacity-90"
                        />

                        {propertyImages.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <p className="text-sm text-muted-foreground">
                              {propertyImages.length} image(s) selected:
                            </p>
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                              {propertyImages.map((file, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-2 bg-muted rounded-lg"
                                >
                                  <span className="text-sm text-card-foreground truncate flex-1 mr-2">
                                    {file.name}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => removePropertyImage(index)}
                                    className="text-muted-foreground hover:text-destructive text-sm px-2 py-1 rounded"
                                  >
                                    Remove
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Floor Plan Images */}
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Floor Plan Images
                        </label>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFloorPlanImagesChange}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-secondary-foreground hover:file:bg-opacity-90"
                        />

                        {floorPlanImages.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <p className="text-sm text-muted-foreground">
                              {floorPlanImages.length} image(s) selected:
                            </p>
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                              {floorPlanImages.map((file, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-2 bg-muted rounded-lg"
                                >
                                  <span className="text-sm text-card-foreground truncate flex-1 mr-2">
                                    {file.name}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => removeFloorPlanImage(index)}
                                    className="text-muted-foreground hover:text-destructive text-sm px-2 py-1 rounded"
                                  >
                                    Remove
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end gap-4 pt-6 border-t border-border">
                    <button
                      type="button"
                      onClick={() => {
                        setIsFormOpen(false);
                        resetForm();
                      }}
                      className="px-6 py-3 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                      Add Property
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
