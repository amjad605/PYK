import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import formatPrice from '@/utils/formatPrice';
import {
    MapPin, Bed, Bath, Home, Square, Trees, Sparkles,
    LandPlot,
} from 'lucide-react';
import type { PropertyData, Status } from '@/types/property';
import { Badge } from "@/components/ui/badge";
import PropertyInfoItem from './PropertyInfoItem';


interface PropertyDetailsHeaderCardProps {
    property: PropertyData;
    isScrolled: boolean;
}

const statusColors: Record<Status, string> = {
    available: "bg-blue-50 text-blue-700 border-blue-200",
    sold: "bg-slate-50 text-slate-700 border-slate-200",
    rented: "bg-blue-50 text-blue-700 border-blue-200",
    reserved: "bg-sky-50 text-sky-700 border-sky-200",
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
};

const formatArea = (area: number) => {
    if (!area || area === 0) return "N/A";
    console.log('Formatting area:', area);
    return `${area.toLocaleString('en-US', { maximumFractionDigits: 0 })} m²`;
};

const PropertyDetailsHeaderCard = ({ property,
    isScrolled
}: PropertyDetailsHeaderCardProps) => {

    return (
        <div className="sticky top-0 z-20 pt-4 pb-2 ">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Card className="overflow-hidden  bg-white/70 backdrop-blur-md">
                    <CardContent className="p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="space-y-2">
                                <h1 className="text-2xl md:text-3xl font-bold text-balance bg-blue bg-clip-text text-transparent">
                                    {property.title}
                                </h1>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <MapPin className="h-4 w-4 text-blue-600" />
                                    <span className="text-sm md:text-base">
                                        {property.location.compound &&
                                            `${property.location.compound}, `}
                                        {property.location.district &&
                                            `${property.location.district}, `}
                                        {property.location.city}
                                    </span>
                                </div>
                            </div>
                            <div className="flex md:flex-col flex-row gap-2 items-end">
                                <div className="text-center">
                                    {property.price.amount && (
                                        <div>
                                            <p className="text-2xl md:text-3xl text-black font-bold">
                                                {formatPrice(
                                                    property.price.amount,
                                                    property.price.currency
                                                )}
                                            </p>
                                            {property.listingType === "rent" &&
                                                property.price.monthlyRent && (
                                                    <p className="text-blue-600 text-sm">
                                                        {formatPrice(
                                                            property.price.monthlyRent,
                                                            property.price.currency
                                                        )}
                                                        /month
                                                    </p>
                                                )}
                                        </div>
                                    )}
                                    {property.listingType === "rent" &&
                                        property.price.monthlyRent &&
                                        !property.price.amount && (
                                            <p className="text-2xl md:text-3xl font-bold text-blue-700">
                                                {formatPrice(
                                                    property.price.monthlyRent,
                                                    property.price.currency
                                                )}
                                                /month
                                            </p>
                                        )}
                                </div>
                                <Badge
                                    className={cn(
                                        "capitalize text-xs px-3 py-1 border",
                                        statusColors[property.status]
                                    )}
                                >
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    {property.status}
                                </Badge>
                            </div>
                        </div>
                        <AnimatePresence>
                            {isScrolled && (
                                <motion.div
                                    initial={{ opacity: 0, maxHeight: 0 }}
                                    animate={{ opacity: 1, maxHeight: 500 }}
                                    exit={{ opacity: 0, maxHeight: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="overflow-hidden"
                                >
                                    <div className="grid grid-cols-4 gap-4 pt-4 mt-4 border-t border-blue-100">
                                        {property.bedrooms && (
                                            <PropertyInfoItem icon={Bed} value={property.bedrooms} label={"Bedrooms"} />
                                        )}
                                        {property.bathrooms && (
                                            <PropertyInfoItem icon={Bath} value={property.bathrooms} label={"Bathrooms"} />
                                        )}
                                        {property.areas.total !== 0 && (
                                            < PropertyInfoItem icon={Home} value={property.areas.total!} label={"Total Area"} />
                                        )}
                                        {property.areas.builtUp !== 0 && (
                                            < PropertyInfoItem icon={Square} value={property.areas.builtUp!} label={"Built-Up Area"} />
                                        )}
                                        {(property.areas.land) !== 0 && (
                                            < PropertyInfoItem icon={LandPlot} value={property.areas.land!} label={"Land Area"} />
                                        )}

                                        {property.areas.garden !== 0 && (
                                            <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-blue-50">
                                                <Trees className="h-4 w-4 text-blue-600" />
                                                <span className="text-sm md:text-md font-bold text-blue-900">
                                                    {formatArea(property.areas.garden!)}
                                                </span>
                                                <span className="text-xs text-slate-600">Garden Area</span>
                                            </div>
                                        )}
                                        {property.areas.terrace && (
                                            <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-blue-50">
                                                <Home className="h-4 w-4 text-blue-600" />
                                                <span className="text-lg font-bold text-blue-900">
                                                    {formatArea(property.areas.terrace)}
                                                </span>
                                                <span className="text-xs text-slate-600">
                                                    Terrace Area
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}

export default PropertyDetailsHeaderCard

