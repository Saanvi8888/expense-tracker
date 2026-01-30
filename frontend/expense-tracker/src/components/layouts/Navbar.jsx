import React, { useState } from "react";
import SideMenu from "./SideMenu";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { LuMoon, LuSun } from "react-icons/lu";


const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  

  return (
    <div className="
      flex items-center justify-between gap-5
      bg-slate-700/90
       
      px-7 py-4 sticky top-0 z-30 transition-colors
    ">
      
      <div className="flex items-center gap-4">
        <button
          className="block lg:hidden text-slate-900 dark:text-slate-100"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Expense Tracker
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Dashboard
          </p>
        </div>
      </div>

      

     
      {openSideMenu && (
        <div className="fixed top-[64px] left-0 bg-white ">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
      

    </div>
    
  );
};

export default Navbar;
