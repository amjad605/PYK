import {
  Home,
  CheckCircle,
  TrendingUp,
  Calculator,
  MapIcon,
} from "lucide-react";

const tabs = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "features", label: "Features", icon: CheckCircle },

  { id: "master-plan", label: "Floor Plan", icon: MapIcon },
  { id: "financing", label: "Financing", icon: Calculator },
];

interface PropertyTabsProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}
export default function PropertyTabs(props: PropertyTabsProps) {
  return (
    <div className="border-b border-border overflow-x-auto scrollbar-hide py-5 mb-5 ">
      <div
        className="flex min-w-max gap-1 sm:gap-2 px-1 sm:px-0"
        role="tablist"
        aria-label="Property Sections"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = props.activeTab === tab.id;

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tab.id}-panel`}
              onClick={() => props.setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue to-blue/90 text-primary-foreground shadow-sm "
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
