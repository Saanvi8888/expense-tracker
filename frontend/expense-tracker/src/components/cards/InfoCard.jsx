const STYLES = [
  { icon: "bg-emerald-50 text-emerald-500", bar: "bg-emerald-500" },
  { icon: "bg-blue-50 text-blue-500",       bar: "bg-blue-500"    },
  { icon: "bg-rose-50 text-rose-500",       bar: "bg-rose-500"    },
];

const InfoCard = ({ icon, label, value, index }) => {
  const style = STYLES[index] || STYLES[0];
  return (
    <div className="relative bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4 overflow-hidden">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${style.icon}`}>
        {icon}
      </div>

      <div>
        <p className="text-xs text-slate-400 uppercase tracking-wider font-mono mb-1">
          {label}
        </p>
        <p className="text-2xl font-bold text-slate-800 tracking-tight">
          ₹{value}
        </p>
      </div>
      <div className={`absolute bottom-0 left-0 w-full h-[3px] ${style.bar}`} />
    </div>
  );
};

export default InfoCard;