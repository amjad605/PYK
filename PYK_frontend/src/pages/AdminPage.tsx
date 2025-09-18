import SideBar from "@/components/admin/SideBar";

import { useState } from "react";

import { Button } from "@/components/ui/button";

const AdminPage = () => {
  const [active, setActive] = useState<string>("property");
  return (
    <div className="flex flex-row min-h-screen bg-white">
      <SideBar activeTab={active} setActiveTab={setActive} />
      {/*content*/}
      <div className="w-full flex flex-col p-14">
        {/*header*/}
        <div className="flex items-center justify-between ">
          <h1 className="text-4xl font-bold">{active.toUpperCase()}</h1>
          <Button>Add {active.toUpperCase()}</Button>
        </div>

        {/*content*/}
      </div>
    </div>
  );
};

export default AdminPage;
