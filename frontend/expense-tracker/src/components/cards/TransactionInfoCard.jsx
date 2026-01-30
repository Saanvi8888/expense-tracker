
import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash,
  LuSmile,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
  // isEmpty=false,
}) => {



  const getAmountStyles = () =>
    type === "income"
      ? "bg-green-50 text-green-600"
      : "bg-red-50 text-red-600";

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition">

      
      <div className="w-11 h-11 flex items-center justify-center rounded-full bg-white  text-black shrink-0 border-1 border-gray-300">
        {icon ? (
          icon
        ) : (
          <LuSmile />
        )}
      </div>


      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">
          {title }
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          {date}
        </p>
      </div>

    
      <div className="flex items-center gap-3">
        {!hideDeleteBtn && (
          <button onClick={onDelete} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <LuTrash size={18}/>  
          </button>
        )}
        

        
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium ${getAmountStyles()}`}
        >
          <span>
            {type === "income" ? "+" : "-"}Rs.{amount}
          </span>
          {type === "income" ? (
            <LuTrendingUp size={14} />
          ) : (
            <LuTrendingDown size={14} />
          )}
        </div>

      </div>
    </div>
  );
};

export default TransactionInfoCard;
