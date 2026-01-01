// src/pages/ComparePage.tsx
import React from "react";
import { useCompare } from "@/context/CompareContext";
import { X, MapPin, Bed, Bath, Square, ChevronLeft, Layers, Paintbrush, Calendar, Building2, Tent, Trees } from "lucide-react";
import { useNavigate } from "react-router-dom";
import formatPrice from "@/utils/formatPrice";
import Nav from "@/components/common/Nav";

const ComparePage = () => {
    const { compareList, removeFromCompare } = useCompare();
    const navigate = useNavigate();

    if (compareList.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h2 className="text-2xl font-bold text-gray-800">No properties to compare</h2>
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 text-blue-600 hover:underline flex items-center"
                >
                    <ChevronLeft className="h-4 w-4" /> Go back to listings
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-20">


            <Nav isBlack />
            <div className="max-w-7xl mx-auto px-4 py-12 mt-10">

                <h1 className="text-3xl font-bold mb-8 text-gray-900">Compare Properties</h1>

                <div className="overflow-x-auto">
                    <div className="inline-flex min-w-full space-x-4">
                        {compareList.map((property) => (



                            <div key={property.id} className="w-[320px] flex-shrink-0 bg-white border border-gray-200 rounded-xl relative overflow-hidden flex flex-col shadow-sm">
                                {/* Remove Button */}
                                <button
                                    onClick={() => removeFromCompare(property.id || "")}
                                    className="absolute top-2 right-2 z-20 bg-black/60 text-white p-1.5 rounded-full hover:bg-red-500 transition-colors shadow-lg"
                                >
                                    <X className="h-4 w-4" />
                                </button>

                                {/* Top Image & Type Badge */}
                                <div className="relative h-44">
                                    <img src={property.media.images[0] || "/placeHolder.svg"} className="w-full h-full object-cover" alt={property.title} />
                                    <div className="absolute bottom-2 left-2 flex gap-1">
                                        <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                                            {property.propertyType}
                                        </span>
                                        {property.status && (
                                            <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                                                {property.status}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="p-5 flex-grow flex flex-col">
                                    {/* Title & Price */}
                                    <div className="mb-4">
                                        <h3 className="font-bold text-gray-800 text-lg line-clamp-1 mb-1">{property.title}</h3>
                                        <p className="text-blue-600 font-bold text-xl">
                                            {formatPrice(property.price.amount ?? 0, property.listingType)}
                                        </p>
                                        <div className="flex items-center text-gray-500 text-sm mt-1">
                                            <MapPin className="h-3.5 w-3.5 mr-1" />
                                            {property.location.city}
                                        </div>
                                    </div>

                                    {/* Primary Specs Grid */}
                                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 py-4 border-t border-gray-100 text-gray-600">
                                        <div className="flex items-center text-sm">
                                            <Bed className="h-4 w-4 mr-2 text-gray-400" />
                                            <span className="font-medium">{property.bedrooms || 0}</span> <span className="ml-1 text-gray-400 text-xs">Beds</span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <Bath className="h-4 w-4 mr-2 text-gray-400" />
                                            <span className="font-medium">{property.bathrooms || 0}</span> <span className="ml-1 text-gray-400 text-xs">Baths</span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <Square className="h-4 w-4 mr-2 text-gray-400" />
                                            <span className="font-medium">{property.areas.builtUp}</span> <span className="ml-1 text-gray-400 text-xs">sqft</span>
                                        </div>
                                        {property.unitLevel && (
                                            <div className="flex items-center text-sm">
                                                <Layers className="h-4 w-4 mr-2 text-gray-400" />
                                                <span className="font-medium">{property.unitLevel}</span> <span className="ml-1 text-gray-400 text-xs">Floor</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Construction & Delivery Info */}
                                    <div className="space-y-2 py-4 border-t border-gray-100">
                                        {property.finishing && (
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Paintbrush className="h-4 w-4 mr-2 text-blue-500/70" />
                                                <span className="text-xs text-gray-400 mr-1 italic">Finishing:</span>
                                                <span className="font-medium">{property.finishing}</span>
                                            </div>
                                        )}
                                        {property.deliveryDate && (
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Calendar className="h-4 w-4 mr-2 text-blue-500/70" />
                                                <span className="text-xs text-gray-400 mr-1 italic">Ready:</span>
                                                <span className="font-medium">{new Date(property.deliveryDate).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                        {property.developer?.name && (
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Building2 className="h-4 w-4 mr-2 text-blue-500/70" />
                                                <span className="font-medium truncate">{property.developer.name}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Boolean Flags (Garden/Terrace) */}
                                    {(property.hasGarden || property.hasTerrace) && (
                                        <div className="flex gap-4 py-3 border-t border-gray-100">
                                            {property.hasGarden && (
                                                <div className="flex items-center text-emerald-600 text-xs font-semibold">
                                                    <Trees className="h-4 w-4 mr-1" /> Garden
                                                </div>
                                            )}
                                            {property.hasTerrace && (
                                                <div className="flex items-center text-orange-600 text-xs font-semibold">
                                                    <Tent className="h-4 w-4 mr-1" /> Terrace
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Facilities Tags */}
                                    <div className="pt-4 border-t border-gray-100 mb-6">
                                        <p className="text-[10px] uppercase text-gray-400 font-bold mb-2 tracking-wider">Top Amenities</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {property.facilities?.slice(0, 4).map((f) => (
                                                <span key={f} className="bg-gray-50 text-gray-600 text-[10px] border border-gray-100 px-2 py-1 rounded-md">
                                                    {f}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        onClick={() => navigate(`/property/${property.id}`, { state: { property } })}
                                        className="w-full mt-auto bg-blue-600 text-white py-2.5 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all shadow-md active:scale-95"
                                    >
                                        View Full Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComparePage;