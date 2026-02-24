import { FaUsers, FaUserMd } from "react-icons/fa";
import { IoTrendingUpOutline } from "react-icons/io5";

const statsData = [
  {
    icon: <FaUsers size={20} className="text-white" />,
    value: 4,
    label: "Total Patients",
    change: "+12%",
  },
  {
    icon: <IoTrendingUpOutline size={20} className="text-white" />,
    value: 1,
    label: "Active Connections",
    change: "+8%",
  },
  {
    icon: <FaUserMd size={20} className="text-white" />,
    value: 4,
    label: "Total Clinicians",
    change: "+5%",
  },
  {
    icon: <IoTrendingUpOutline size={20} className="text-white" />,
    value: 67,
    label: "Avg Health Score",
    change: "+3%",
  },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <div className="flex items-start justify-between mb-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#00AAA7" }}
            >
              {stat.icon}
            </div>
            <span className="text-green-500 text-xs font-medium flex items-center gap-0.5">
              ↑ {stat.change}
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
          <div className="text-sm text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;