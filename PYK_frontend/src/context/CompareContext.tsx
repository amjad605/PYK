// src/context/CompareContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import type { PropertyData } from "@/types/property";
import toast from "react-hot-toast"; // Changed import
import { useNavigate } from "react-router-dom";

interface CompareContextType {
    compareList: PropertyData[];
    addToCompare: (property: PropertyData) => void;
    removeFromCompare: (id: string) => void;
    isInCompare: (id: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [compareList, setCompareList] = useState<PropertyData[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const saved = localStorage.getItem("compareProperties");
        if (saved) {
            try {
                setCompareList(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse compare list", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("compareProperties", JSON.stringify(compareList));
    }, [compareList]);

    const addToCompare = (property: PropertyData) => {
        // 1. Check if already exists
        if (compareList.find((p) => p.id === property.id)) {
            toast.error("Property already in comparison list");
            return;
        }

        // 2. Check limit
        if (compareList.length >= 4) {
            toast.error("You can only compare up to 4 properties.");
            return;
        }

        // 3. Add to state
        setCompareList((prev) => [...prev, property]);

        // 4. Trigger React Hot Toast with custom JSX for the button
        toast.success((t) => (
            <span className="flex items-center justify-between gap-4">
                <b>Added to compare!</b>
                <button
                    onClick={() => {
                        toast.dismiss(t.id); // Close toast
                        navigate("/compare"); // Navigate
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-700 transition-colors"
                >
                    Compare Now
                </button>
            </span>
        ), {
            duration: 4000,
            position: "bottom-center",

            style: {
                minWidth: '400px',
                height: 'auto',
                borderRadius: "40px"

            }
        });
    };

    const removeFromCompare = (id: string) => {
        setCompareList((prev) => prev.filter((p) => p.id !== id));
        toast("Removed from list", { icon: '🗑️' });
    };

    const isInCompare = (id: string) => compareList.some((p) => p.id === id);

    return (
        <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, isInCompare }}>
            {children}
        </CompareContext.Provider>
    );
};

export const useCompare = () => {
    const context = useContext(CompareContext);
    if (!context) throw new Error("useCompare must be used within CompareProvider");
    return context;
};