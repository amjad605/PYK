import React, { useState } from "react";
import type { ListingType } from "../property/FiltersCard";
import type {
  Status,
  Price,
  Areas,
  Furnishing,
  Finishing,
  Developer,
  Location,
  RentDetails,
  UnitLevel,
  Owner,
} from "../property/PropertyCard.type";
import type { PropertyType } from "../property/PropertyTypeDropDown";

interface PropertyFormData {
  title: string;
  status: Status;
  description?: string;
  listingType: ListingType;
  propertyType: PropertyType;
  price: Price;
  areas: Areas;
  bedrooms?: number;
  bathrooms?: number;
  features: string[];
  facilities: string[];
  location: Location;
  furnishing?: Furnishing;
  finishing?: Finishing;
  developer?: Developer;
  deliveryDate?: string;
  owner?: Owner;
  rentDetails?: RentDetails;
  unitLevel?: UnitLevel;
}

const PropertyFormSimple: React.FC = () => {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    status: "available",
    listingType: "primary",
    propertyType: "Apartment",
    price: {
      currency: "EGP",
      amount: 0,
    },
    areas: {
      builtUp: 0,
    },
    features: [],
    facilities: [],
    location: {
      city: "",
    },
  });

  const [featureInput, setFeatureInput] = useState("");
  const [facilityInput, setFacilityInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof PropertyFormData],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value) || 0;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof PropertyFormData],
          [child]: numValue,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: numValue,
      }));
    }
  };

  const addFeature = () => {
    if (
      featureInput.trim() &&
      !formData.features.includes(featureInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const addFacility = () => {
    if (
      facilityInput.trim() &&
      !formData.facilities.includes(facilityInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        facilities: [...prev.facilities, facilityInput.trim()],
      }));
      setFacilityInput("");
    }
  };

  const removeFacility = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the data to your backend
      console.log("Submitting property data:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Property created successfully!");
      // Reset form or redirect here
    } catch (error) {
      console.error("Error creating property:", error);
      alert("Failed to create property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isVilla = formData.propertyType === ("villa" as PropertyType);
  const isRent = formData.listingType === ("rent" as ListingType);
  const showUnitLevel = ["apartment", "duplex", "penthouse", "studio"].includes(
    formData.propertyType
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <h1 className="text-3xl font-bold text-center text-slate-800 mb-8">
        Add New Property
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="p-6 bg-slate-50 rounded-lg">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-slate-700"
              >
                Property Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-slate-700"
              >
                Status *
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
                <option value="reserved">Reserved</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Property Classification */}
        <div className="p-6 bg-slate-50 rounded-lg">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            Property Classification
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <label
                htmlFor="listingType"
                className="block text-sm font-medium text-slate-700"
              >
                Listing Type *
              </label>
              <select
                id="listingType"
                name="listingType"
                value={formData.listingType}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="primary">Primary</option>
                <option value="resale">Resale</option>
                <option value="rent">Rent</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="propertyType"
                className="block text-sm font-medium text-slate-700"
              >
                Property Type *
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="townhouse">Townhouse</option>
                <option value="twin_house">Twin House</option>
                <option value="duplex">Duplex</option>
                <option value="penthouse">Penthouse</option>
                <option value="studio">Studio</option>
              </select>
            </div>
          </div>

          {showUnitLevel && (
            <div className="space-y-2">
              <label
                htmlFor="unitLevel"
                className="block text-sm font-medium text-slate-700"
              >
                Unit Level
              </label>
              <select
                id="unitLevel"
                name="unitLevel"
                value={formData.unitLevel || ""}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select unit level</option>
                <option value="ground">Ground Floor</option>
                <option value="middle">Middle Floor</option>
                <option value="roof">Roof</option>
                <option value="duplex-lower">Duplex Lower</option>
                <option value="duplex-upper">Duplex Upper</option>
              </select>
            </div>
          )}
        </div>

        {/* Pricing & Specifications */}
        <div className="p-6 bg-slate-50 rounded-lg">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            Pricing & Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="space-y-2">
              <label
                htmlFor="price.amount"
                className="block text-sm font-medium text-slate-700"
              >
                Price (EGP) *
              </label>
              <input
                type="number"
                id="price.amount"
                name="price.amount"
                value={formData.price.amount}
                onChange={handleNumberInputChange}
                min="0"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="areas.builtUp"
                className="block text-sm font-medium text-slate-700"
              >
                Built-up Area (sqm) *
              </label>
              <input
                type="number"
                id="areas.builtUp"
                name="areas.builtUp"
                value={formData.areas.builtUp}
                onChange={handleNumberInputChange}
                min="0"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="bedrooms"
                className="block text-sm font-medium text-slate-700"
              >
                Bedrooms
              </label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms || ""}
                onChange={handleNumberInputChange}
                min="0"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="bathrooms"
                className="block text-sm font-medium text-slate-700"
              >
                Bathrooms
              </label>
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms || ""}
                onChange={handleNumberInputChange}
                min="0"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <label
                htmlFor="furnishing"
                className="block text-sm font-medium text-slate-700"
              >
                Furnishing
              </label>
              <select
                id="furnishing"
                name="furnishing"
                value={formData.furnishing || ""}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select furnishing</option>
                <option value="furnished">Furnished</option>
                <option value="semi-furnished">Semi-Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="finishing"
                className="block text-sm font-medium text-slate-700"
              >
                Finishing
              </label>
              <select
                id="finishing"
                name="finishing"
                value={formData.finishing || ""}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select finishing</option>
                <option value="finished">Finished</option>
                <option value="semi-finished">Semi-Finished</option>
                <option value="core-shell">Core & Shell</option>
                <option value="red-brick">Red Brick</option>
                <option value="luxury-finished">Luxury Finished</option>
              </select>
            </div>
          </div>

          {/* Villa-specific fields */}
          {isVilla && (
            <div className="p-4 bg-blue-50 rounded-lg mt-4">
              <h3 className="text-lg font-medium text-slate-700 mb-4">
                Villa Specific Areas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="areas.land"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Land Area (sqm) *
                  </label>
                  <input
                    type="number"
                    id="areas.land"
                    name="areas.land"
                    value={formData.areas.land || ""}
                    onChange={handleNumberInputChange}
                    min="0"
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="areas.garden"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Garden Area (sqm)
                  </label>
                  <input
                    type="number"
                    id="areas.garden"
                    name="areas.garden"
                    value={formData.areas.garden || ""}
                    onChange={handleNumberInputChange}
                    min="0"
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="areas.terrace"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Terrace Area (sqm)
                  </label>
                  <input
                    type="number"
                    id="areas.terrace"
                    name="areas.terrace"
                    value={formData.areas.terrace || ""}
                    onChange={handleNumberInputChange}
                    min="0"
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="areas.roof"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Roof Area (sqm)
                  </label>
                  <input
                    type="number"
                    id="areas.roof"
                    name="areas.roof"
                    value={formData.areas.roof || ""}
                    onChange={handleNumberInputChange}
                    min="0"
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="areas.total"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Total Area (sqm)
                  </label>
                  <input
                    type="number"
                    id="areas.total"
                    name="areas.total"
                    value={formData.areas.total || ""}
                    onChange={handleNumberInputChange}
                    min="0"
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Location Details */}
        <div className="p-6 bg-slate-50 rounded-lg">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            Location Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="location.city"
                className="block text-sm font-medium text-slate-700"
              >
                City *
              </label>
              <input
                type="text"
                id="location.city"
                name="location.city"
                value={formData.location.city}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="location.district"
                className="block text-sm font-medium text-slate-700"
              >
                District
              </label>
              <input
                type="text"
                id="location.district"
                name="location.district"
                value={formData.location.district || ""}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="location.compound"
                className="block text-sm font-medium text-slate-700"
              >
                Compound
              </label>
              <input
                type="text"
                id="location.compound"
                name="location.compound"
                value={formData.location.compound || ""}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Features & Facilities */}
        <div className="p-6 bg-slate-50 rounded-lg">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            Features & Facilities
          </h2>

          <div className="space-y-2 mb-6">
            <label className="block text-sm font-medium text-slate-700">
              Features
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="Add a feature (e.g. balcony, central AC)"
                className="flex-1 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {feature}
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Facilities
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={facilityInput}
                onChange={(e) => setFacilityInput(e.target.value)}
                placeholder="Add a facility (e.g. Parking, Gym)"
                className="flex-1 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addFacility}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.facilities.map((facility, index) => (
                <span
                  key={index}
                  className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                >
                  {facility}
                  <button
                    type="button"
                    onClick={() => removeFacility(index)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Developer & Owner Information */}
        <div className="p-6 bg-slate-50 rounded-lg">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            Developer & Owner Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <label
                htmlFor="developer.name"
                className="block text-sm font-medium text-slate-700"
              >
                Developer Name
              </label>
              <input
                type="text"
                id="developer.name"
                name="developer.name"
                value={formData.developer?.name || ""}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="owner.name"
                className="block text-sm font-medium text-slate-700"
              >
                Owner Name
              </label>
              <input
                type="text"
                id="owner.name"
                name="owner.name"
                value={formData.owner?.name || ""}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <label
                htmlFor="owner.contact.phone"
                className="block text-sm font-medium text-slate-700"
              >
                Owner Phone
              </label>
              <input
                type="text"
                id="owner.contact.phone"
                name="owner.contact.phone"
                value={formData.owner?.contact?.phone || ""}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="owner.contact.email"
                className="block text-sm font-medium text-slate-700"
              >
                Owner Email
              </label>
              <input
                type="email"
                id="owner.contact.email"
                name="owner.contact.email"
                value={formData.owner?.contact?.email || ""}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="deliveryDate"
              className="block text-sm font-medium text-slate-700"
            >
              Delivery Date
            </label>
            <input
              type="date"
              id="deliveryDate"
              name="deliveryDate"
              value={formData.deliveryDate || ""}
              onChange={handleInputChange}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Rent Details */}
        {isRent && (
          <div className="p-6 bg-slate-50 rounded-lg">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">
              Rent Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="rentDetails.leaseTerm"
                  className="block text-sm font-medium text-slate-700"
                >
                  Lease Term
                </label>
                <input
                  type="text"
                  id="rentDetails.leaseTerm"
                  name="rentDetails.leaseTerm"
                  value={formData.rentDetails?.leaseTerm || ""}
                  onChange={handleInputChange}
                  placeholder="e.g., 1 year"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="rentDetails.deposit"
                  className="block text-sm font-medium text-slate-700"
                >
                  Deposit (EGP)
                </label>
                <input
                  type="number"
                  id="rentDetails.deposit"
                  name="rentDetails.deposit"
                  value={formData.rentDetails?.deposit || ""}
                  onChange={handleNumberInputChange}
                  min="0"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2 flex items-end">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="rentDetails.utilitiesIncluded"
                    checked={formData.rentDetails?.utilitiesIncluded || false}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        rentDetails: {
                          ...prev.rentDetails,
                          utilitiesIncluded: e.target.checked,
                        },
                      }));
                    }}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Utilities Included
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
          <button
            type="button"
            className="px-6 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-slate-400 transition-colors"
          >
            {isSubmitting ? "Creating..." : "Create Property"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyFormSimple;
