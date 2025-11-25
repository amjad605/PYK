import SideBar from "@/components/admin/SideBar";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dashboard } from "./Dashboard";


const AdminPage = () => {
  const [active, setActive] = useState<string>("property");
  return (
    <div className="flex flex-row min-h-screen bg-white">
      <SideBar activeTab={active} setActiveTab={setActive} />
      {/*content*/}
      <div className="w-full flex flex-col p-14">
        {/*header*/}
        {active === "property" && <Dashboard />}

        {/*content*/}
      </div>
    </div>
  );
};

export default AdminPage;
