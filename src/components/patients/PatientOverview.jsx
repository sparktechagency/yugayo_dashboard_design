import { IoTrendingUpOutline } from "react-icons/io5";
import { MdOutlineWarningAmber, MdOutlineAccessTime } from "react-icons/md";
import { GiForkKnifeSpoon } from "react-icons/gi";

const TEAL = "#00AAA7";

const healthStats = [
  {
    icon: <IoTrendingUpOutline size={16} style={{ color: TEAL }} />,
    label: "Digestive Score",
    value: "72",
    sub: "+5 from last week",
    subColor: "text-green-500",
  },
  {
    icon: <GiForkKnifeSpoon size={16} style={{ color: TEAL }} />,
    label: "Meals Logged",
    value: "07",
    sub: "Last 30 days",
    subColor: "text-gray-400",
  },
  {
    icon: <MdOutlineWarningAmber size={16} style={{ color: TEAL }} />,
    label: "Symptoms",
    value: "03",
    sub: "Total tracked",
    subColor: "text-gray-400",
  },
  {
    icon: <MdOutlineAccessTime size={16} style={{ color: TEAL }} />,
    label: "Last Active",
    value: "2 hours ago",
    sub: null,
    subColor: "",
    bigValue: true,
  },
];

const triggers = [
  { name: "Dairy", severity: "High", severityColor: "bg-red-100 text-red-500" },
  {
    name: "Onions",
    severity: "Medium",
    severityColor: "bg-yellow-100 text-yellow-600",
  },
];

const vitals = [
  {
    icon: <IoTrendingUpOutline size={16} style={{ color: TEAL }} />,
    label: "Weight",
    value: "154 lbs",
    sub: "Last updated: Today",
    bg: "bg-blue-50",
  },
  {
    icon: <IoTrendingUpOutline size={16} style={{ color: TEAL }} />,
    label: "Sleep",
    value: "7.2 hrs",
    sub: "Average this week",
    bg: "bg-blue-50",
  },
];

const PatientOverview = () => {
  return (
    <div className="space-y-8">
      {/* Health Overview */}
      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-4">
          Health Overview
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {healthStats.map((stat, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-xl p-4 border border-gray-100"
            >
              <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-2">
                {stat.icon}
                <span>{stat.label}</span>
              </div>
              <div
                className={`font-bold text-gray-800 mb-1 ${
                  stat.bigValue ? "text-xl" : "text-2xl"
                }`}
              >
                {stat.value}
              </div>
              {stat.sub && (
                <div className={`text-xs ${stat.subColor}`}>{stat.sub}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Known Triggers */}
      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-4">
          Known Triggers
        </h2>
        <div className="flex flex-wrap gap-3">
          {triggers.map((t, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-yellow-50 border border-yellow-100 rounded-full px-4 py-1.5"
            >
              <span className="text-sm text-gray-700">{t.name}</span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${t.severityColor}`}
              >
                {t.severity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Vitals */}
      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-4">
          Recent Vitals
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {vitals.map((v, i) => (
            <div
              key={i}
              className={`${v.bg} rounded-xl p-4 border border-blue-100`}
            >
              <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-2">
                {v.icon}
                <span style={{ color: TEAL }} className="font-medium">
                  {v.label}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {v.value}
              </div>
              <div className="text-xs text-gray-400">{v.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientOverview;
