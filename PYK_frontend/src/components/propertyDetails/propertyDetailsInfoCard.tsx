import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
    Building,
    Calendar as CalendarIcon,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

import { type PropertyData } from "@/types/property";
// adjust the path/type if needed

interface PropertyDetailsInfoCardProps {
    property: PropertyData;
}

const PropertyDetailsInfoCard: React.FC<PropertyDetailsInfoCardProps> = ({
    property,
}) => {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    // -------------------------------
    // Local Label Dictionaries
    // -------------------------------
    const propertyTypeLabels: Record<string, string> = {
        apartment: "Apartment",
        villa: "Villa",
        townhouse: "Townhouse",
        twinhouse: "Twin House",
        duplex: "Duplex",
        penthouse: "Penthouse",
        studio: "Studio",
        "": "",
        house: "House",
    };

    const finishingLabels: Record<string, string> = {
        finished: "Finished",
        "semi-Finished": "Semi-Finished",
        "core-Shell": "Core & Shell",
        furnished: "Furnished",
    };

    return (
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
                <CardTitle className="text-xl text-blue flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Property Information
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Property Details Table */}
                <div className="overflow-hidden rounded-xl border border-blue-100">
                    <table className="w-full">
                        <tbody className="divide-y divide-blue-50">
                            {/* Property Type */}
                            <tr className="bg-blue-50">
                                <td className="px-4 py-3 text-sm font-medium text-slate-600">
                                    Property Type
                                </td>
                                <td className="px-4 py-3 text-sm font-semibold text-blue-700">
                                    {propertyTypeLabels[property.propertyType] ??
                                        property.propertyType}
                                </td>
                            </tr>

                            {/* Listing Type */}
                            <tr>
                                <td className="px-4 py-3 text-sm font-medium text-slate-600">
                                    Listing Type
                                </td>
                                <td className="px-4 py-3 text-sm font-semibold text-slate-900 capitalize">
                                    {property.listingType}
                                </td>
                            </tr>

                            {/* Finishing */}
                            {property.finishing && (
                                <tr className="bg-blue-50">
                                    <td className="px-4 py-3 text-sm font-medium text-slate-600">
                                        Finishing
                                    </td>
                                    <td className="px-4 py-3 text-sm font-semibold text-blue-700">
                                        {finishingLabels[property.finishing] ??
                                            property.finishing}
                                    </td>
                                </tr>
                            )}

                            {/* Delivery Date */}
                            {property.deliveryDate && (
                                <tr>
                                    <td className="px-4 py-3 text-sm font-medium text-slate-600">
                                        Delivery Date
                                    </td>
                                    <td className="px-4 py-3 text-sm font-semibold text-slate-900 flex items-center gap-2">
                                        <CalendarIcon className="h-4 w-4" />
                                        {new Date(property.deliveryDate).getFullYear() === new Date().getFullYear() ? "ready to move" : new Date(property.deliveryDate).getFullYear()}
                                    </td>
                                </tr>
                            )}

                            {/* Developer */}
                            {property.developer?.name && (
                                <tr className="bg-blue-50">
                                    <td className="px-4 py-3 text-sm font-medium text-slate-600">
                                        Developer
                                    </td>
                                    <td className="px-4 py-3 text-sm font-semibold text-blue-700">
                                        {property.developer.name}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Description */}
                {property.description && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-blue">Description</h3>

                        <div className="relative">
                            <p
                                className={cn(
                                    "text-slate-700 leading-relaxed",
                                    !isDescriptionExpanded && "line-clamp-4"
                                )}
                            >
                                {property.description}
                            </p>

                            {property.description.length > 200 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        setIsDescriptionExpanded(!isDescriptionExpanded)
                                    }
                                    className="mt-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                >
                                    {isDescriptionExpanded ? (
                                        <>
                                            Show Less <ChevronUp className="ml-1 h-4 w-4" />
                                        </>
                                    ) : (
                                        <>
                                            Show More <ChevronDown className="ml-1 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default PropertyDetailsInfoCard;
