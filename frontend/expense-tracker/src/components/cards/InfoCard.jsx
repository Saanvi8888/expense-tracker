

const InfoCard = ({ icon, label, value, index }) => {
  // const bgColor = ["#D4EDBE", "#FFEEA0", "#FFCEDA"];
  const textcolor=["#508F45","#6D6A28","#791468"]
  return (
    <div
      className="relative flex gap-6 p-4  rounded-t-2xl shadow-md  border border-slate-600/30 h-28 bg-white"
      // style={{ backgroundColor: bgColor[index] }}
    >
      <div className="w-16 h-16 flex items-center justify-center text-[26px] bg-slate-200/50 rounded-full  "
      style={{color:textcolor[index]}}
      >
        {icon}
      </div>

      <div className="flex flex-col justify-center">
        <h6 className="text-sm text-slate-700 mb-1">{label}</h6>
        <span className="text-[22px] text-slate-700 font-bold">Rs.{value}</span>
        

      </div>
      <div className="absolute w-full h-[3px] bg-slate-700 bottom-0 left-0  "></div>
      
    </div>
    
  );
};
export default InfoCard