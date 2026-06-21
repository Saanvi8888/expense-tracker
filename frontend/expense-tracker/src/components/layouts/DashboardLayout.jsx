import React, { useContext } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { UserContext } from "../../context/UserContext";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar activeMenu={activeMenu} />

      <div className="flex">
        {user && (
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
        )}

        <div className="flex-1 mx-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;