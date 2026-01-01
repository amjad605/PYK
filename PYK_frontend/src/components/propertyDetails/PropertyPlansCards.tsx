"use client";

import { useState } from "react";
import { Map, Layout, X, ZoomIn } from "lucide-react";
import type { PropertyData } from "@/types/property";

interface PropertyDetailsPlansCardProps {
    property: PropertyData;
}

export default function PropertyDetailsPlansCard({ property }: PropertyDetailsPlansCardProps) {
    const [activePlan, setActivePlan] = useState<{ title: string; url: string[] } | null>(null);

    // Example data structure based on your provided snippet
    const plans = [
        {
            title: "Master Plan",
            url: property.media.masterPlans || "a   ",
            icon: <ZoomIn className="w-6 h-6 text-indigo-600" />,
        },

        {
            title: "Floor Plan",
            url: property.media.floorPlans,
            icon: <Layout className="w-6 h-6 text-blue" />,
        },
    ].filter((plan) => plan.url);

    if (plans.length === 0) return null;

    return (
        <>
            {/* --- The Card Buttons --- */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Plans & Layouts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {plans.map((plan) => (
                        <button
                            key={plan.title}
                            onClick={() => setActivePlan({ title: plan.title, url: plan.url! })}
                            className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all group text-left"
                        >
                            <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-white transition-colors">
                                {plan.icon}
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-slate-900">{plan.title}</p>
                                <p className="text-sm text-slate-500">Click to enlarge</p>
                            </div>
                            <ZoomIn className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                        </button>
                    ))}
                </div>
            </div>

            {/* --- Centered Modal Overlay --- */}
            {activePlan && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop with Blur */}
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
                        onClick={() => setActivePlan(null)}
                    />

                    {/* Modal Content */}
                    <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <Layout className="w-5 h-5 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">{activePlan.title}</h3>
                            </div>
                            <button
                                onClick={() => setActivePlan(null)}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors group"
                            >
                                <X className="w-6 h-6 text-slate-400 group-hover:text-slate-600" />
                            </button>
                        </div>

                        {/* Scrollable Image Area */}
                        <div className="flex-1 overflow-auto bg-slate-50 p-4 sm:p-8 flex items-center justify-center">
                            <img
                                src={"https://wpmedia.roomsketcher.com/content/uploads/2022/01/06145940/What-is-a-floor-plan-with-dimensions.png"}
                                alt={activePlan.title}
                                className="max-w-full h-auto object-contain rounded-lg shadow-sm"
                            />
                        </div>

                        {/* Footer / Actions */}
                        <div className="p-4 border-t border-slate-100 bg-white flex justify-end">
                            <button
                                onClick={() => setActivePlan(null)}
                                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all active:scale-95"
                            >
                                Close View
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}