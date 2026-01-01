// src/components/CompareFloatButton.tsx
import { useCompare } from "@/context/CompareContext";
import { useNavigate } from "react-router-dom";
import { ArrowRightLeft } from "lucide-react";

export const CompareFloatButton = () => {
    const { compareList } = useCompare();
    const navigate = useNavigate();

    if (compareList.length === 0) return null;

    return (
        <button
            onClick={() => navigate("/compare")}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-full shadow-2xl hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95"
        >
            <ArrowRightLeft className="h-5 w-5" />
            <span className="font-semibold">
                Compare ({compareList.length}/4)
            </span>
        </button>
    );
};