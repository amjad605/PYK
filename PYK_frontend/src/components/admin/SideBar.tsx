import React, { useState } from "react";
import { HousePlusIcon, User, House, SidebarIcon } from "lucide-react";
import LOGO from "../../assets/PYK INVEST Brand identity-25.svg";

interface SideBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SideBar = ({ activeTab, setActiveTab }: SideBarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const icons = {
    property: <House className="h-5 w-5" />,
    user: <User className="h-5 w-5" />,
    rental: <HousePlusIcon className="h-5 w-5" />,
  };

  const tabs = Object.keys(icons) as Array<keyof typeof icons>;

  return (
    <div
      className={`bg-black text-white min-h-screen transition-all duration-300 ease-in-out flex flex-col ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-3 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={LOGO}
          alt="Logo"
          className={`transition-all duration-300 ${
            isOpen ? "w-24 h-24" : "w-12 h-12"
          }`}
        />
        <SidebarIcon
          className={`w-5 h-5 ${
            isOpen ? "rotate-180" : "rotate-0 hidden"
          } text-white hover:text-blue-400 transition-colors`}
        />
      </div>

      {/* Sidebar */}
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          {tabs.map((item) => (
            <li key={item}>
              <button
                onClick={() => setActiveTab(item)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-colors
                  ${
                    activeTab === item
                      ? "bg-white/10 text-blue-400"
                      : "text-gray-300 hover:text-blue-400 hover:bg-white/5"
                  }
                  ${!isOpen ? "justify-center" : ""}
                `}
              >
                {icons[item]}
                {isOpen && (
                  <span className="uppercase tracking-wide text-sm font-medium">
                    {item}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
