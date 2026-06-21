import React, { useContext } from 'react'
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from '../cards/CharAvatar';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      localStorage.clear();
      clearUser();
      navigate('/login');
      return;
    }
    navigate(route);
  };

  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-[#1a2332] border-r border-white/5 py-5 px-2 sticky top-[61px] z-20'>
      
      <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt='Profile Image'
            className='w-20 h-20 bg-slate-200 rounded-full object-cover'
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}
        <h5 className='text-white font-medium'>{user?.fullName || ""}</h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-1 transition-all border-l-2
            ${activeMenu === item.label
              ? "text-emerald-400 bg-emerald-500/10 border-emerald-500"
              : "text-white/50 hover:text-white hover:bg-white/5 border-transparent"
            }`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className='text-xl' />
          {item.label}
        </button>
      ))}

    </div>
  );
};

export default SideMenu;