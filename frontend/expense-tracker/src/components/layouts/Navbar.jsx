import React, { useState } from "react";
import SideMenu from "./SideMenu";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 bg-[#1a2332] sticky top-0 z-30 border-b border-white/5">
        
        <div className="flex items-center gap-3">
          <button
            className="block lg:hidden text-white/60 hover:text-white transition-colors"
            onClick={() => setOpenSideMenu(!openSideMenu)}
          >
            {openSideMenu?<HiOutlineX className="text-xl" />
              :<HiOutlineMenu className="text-xl" />
            }
          </button>

          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">
              Expense Tracker
            </h2>
            <p className="text-[10px] text-white/30 font-mono uppercase tracking-wider">
              {activeMenu}
            </p>
          </div>
        </div>

      </div>

      {openSideMenu && (
        <div className="fixed top-[57px] left-0 z-40 h-full w-[220px] shadow-xl lg:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </>
  );
};

export default Navbar;