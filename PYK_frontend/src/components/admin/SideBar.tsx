import React from "react";
import { HousePlusIcon, User, House, SidebarIcon } from "lucide-react";
import LOGO from "../../assets/PYK INVEST Brand identity-25.svg";
interface SideBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
const SideBar = (props: SideBarProps) => {
  const icons = {
    property: <House />,
    user: <User />,
    rental: <HousePlusIcon />,
  };
  return (
    <div className="bg-black text-white w-1/4 min-h-screen">
      {/*header*/}

      <div className="p-0 flex items-center justify-between ">
        <img src={LOGO} alt="Logo" className="w-30 h-30 ml-8 sm:ml-0  " />
        <SidebarIcon className="mr-2 sm:mr-8" />
      </div>

      {/*sidebar*/}
      <nav className=" px-12 w-full text-left ">
        <ul className="list-none ">
          {["property", "user", "rental"].map((item) => {
            return (
              <li className="mb-0">
                <div
                  onClick={() => props.setActiveTab(item)}
                  className={`
                  flex items-center cursor-pointer ${
                    props.activeTab === item ? "bg-gray-50/10" : "bg-black"
                  } ${
                    props.activeTab === item ? "text-blue" : "text-white"
                  } bg-black  hover:text-blue text-left px-4 rounded-2xl mx-auto  py-6 w-full  `}
                >
                  {icons[item]}
                  <button
                    className="ml-4"
                    onClick={() => props.setActiveTab(item)}
                  >
                    {item.toUpperCase()}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
