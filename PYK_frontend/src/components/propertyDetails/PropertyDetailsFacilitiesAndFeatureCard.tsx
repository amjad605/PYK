import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Home, Car, Wifi, Shield, Waves, Trees } from "lucide-react";
import type { PropertyData } from "@/types/property"; // adjust import if needed
// adjust import if needed

interface PropertyDetailsFacilitiesAndFeatureCardProps {
    property: PropertyData;
}

const PropertyDetailsFacilitiesAndFeatureCard: React.FC<
    PropertyDetailsFacilitiesAndFeatureCardProps
> = ({ property }) => {
    // ---------------------------------------
    // Facility Icons (local dictionary)
    // ---------------------------------------
    const facilityIcons: Record<string, React.ElementType> = {
        parking: Car,
        wifi: Wifi,
        security: Shield,
        pool: Waves,
        garden: Trees,
        gym: Home,
    };

    return (
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-xl text-blue">
                    Facilities & Features
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Facilities */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.facilities?.map((facility, index) => {
                        const IconComponent =
                            facilityIcons[facility.toLowerCase()] || Home;

                        return (
                            <div
                                key={index}
                                className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100"
                            >
                                <IconComponent className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-medium text-slate-700 capitalize">
                                    {facility}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Features */}
                <div className="space-y-3">
                    <h4 className="text-md font-semibold text-blue">
                        Additional Features
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {property.features?.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 p-2 rounded-lg bg-slate-50"
                            >
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                                <span className="text-sm text-slate-700">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PropertyDetailsFacilitiesAndFeatureCard;
