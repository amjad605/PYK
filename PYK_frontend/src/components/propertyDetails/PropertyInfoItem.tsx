import React from "react";

interface PropertyInfoItemProps {
    icon: React.ElementType; // Lucide Icon component
    value: string | number;
    label: string;
}

export default function PropertyInfoItem({
    icon: Icon,
    value,
    label,
}: PropertyInfoItemProps) {
    return (
        <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-blue-50">
            <Icon className="h-4 w-4 text-blue-600" />
            <span className="text-sm md:text-md font-bold text-blue-900">
                {value}
            </span>
            <span className="text-xs text-slate-600">{label}</span>
        </div>
    );
}
