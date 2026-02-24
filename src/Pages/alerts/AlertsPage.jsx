import { useState } from "react";
import { EyeOutlined, CheckOutlined } from "@ant-design/icons";
import { MdOutlineWarningAmber, MdOutlineInfo, MdCheckCircleOutline } from "react-icons/md";
import { IoSendOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const TEAL = "#00AAA7";

const initialAlerts = [
  { id: 1, type: "critical", title: "Patient Flare-up Detected", message: "Michael Chen is experiencing a flare-up. Immediate attention recommended.", date: "Invalid Date", priority: "high", status: "new" },
  { id: 2, type: "warning", title: "Patient At Risk", message: "Michael Chen is experiencing a flare-up. Immediate attention recommended.", date: "Invalid Date", priority: "high", status: "new" },
  { id: 3, type: "info", title: "Low Health Score", message: "Michael Chen is experiencing a flare-up. Immediate attention recommended.", date: "Invalid Date", priority: "high", status: "new" },
  { id: 4, type: "success", title: "Patient Improvement", message: "Michael Chen is experiencing a flare-up. Immediate attention recommended.", date: "Invalid Date", priority: "high", status: "resolved" },
];

const typeConfig = {
  critical: {
    icon: <MdOutlineWarningAmber size={18} className="text-red-500" />,
    bg: "bg-red-50",
    border: "border-red-100",
    badgeBg: "bg-red-50",
    badgeText: "text-red-500",
    badgeBorder: "border-red-200",
  },
  warning: {
    icon: <MdOutlineWarningAmber size={18} className="text-yellow-500" />,
    bg: "bg-yellow-50",
    border: "border-yellow-100",
    badgeBg: "bg-yellow-50",
    badgeText: "text-yellow-500",
    badgeBorder: "border-yellow-200",
  },
  info: {
    icon: <MdOutlineInfo size={18} className="text-blue-500" />,
    bg: "bg-blue-50",
    border: "border-blue-100",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-500",
    badgeBorder: "border-blue-200",
  },
  success: {
    icon: <MdCheckCircleOutline size={18} className="text-green-500" />,
    bg: "bg-white",
    border: "border-gray-100",
    badgeBg: "bg-green-50",
    badgeText: "text-green-600",
    badgeBorder: "border-green-200",
  },
};

const statCards = [
  { label: "Total Alerts", value: 4, bg: "bg-white", labelColor: "text-gray-500" },
  { label: "New Alerts", value: 1, bg: "bg-red-50", labelColor: "text-red-400" },
  { label: "Critical", value: 4, bg: "bg-red-50", labelColor: "text-red-400" },
  { label: "Resolved", value: 67, bg: "bg-green-50", labelColor: "text-green-600" },
];

const typeFilters = ["All", "critical", "warning", "info", "success"];
const statusFilters = ["All", "new", "in progress", "resolved"];

const AlertsPage = () => {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = alerts.filter((a) => {
    const matchType = typeFilter === "All" || a.type === typeFilter;
    const matchStatus = statusFilter === "All" || a.status === statusFilter;
    return matchType && matchStatus;
  });

  const handleResolve = (id) => {
    setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, status: "resolved" } : a));
    toast.success("Alert marked as resolved.");
  };

  const FilterBtn = ({ label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
        active ? "text-white border-transparent" : "bg-white text-gray-600 border-gray-200 hover:border-teal-300"
      }`}
      style={active ? { backgroundColor: TEAL, borderColor: TEAL } : {}}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-poppins">
      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {statCards.map((card, i) => (
          <div key={i} className={`${card.bg} rounded-2xl p-5 border border-gray-100 shadow-sm`}>
            <div className={`text-sm font-medium mb-2 ${card.labelColor}`}>{card.label}</div>
            <div className="text-3xl font-bold text-gray-800">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600 mr-1">Type:</span>
          {typeFilters.map((t) => (
            <FilterBtn key={t} label={t} active={typeFilter === t} onClick={() => setTypeFilter(t)} />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600 mr-1">Status:</span>
          {statusFilters.map((s) => (
            <FilterBtn key={s} label={s} active={statusFilter === s} onClick={() => setStatusFilter(s)} />
          ))}
        </div>
      </div>

      {/* Alert Cards */}
      <div className="space-y-3">
        {filtered.map((alert) => {
          const cfg = typeConfig[alert.type];
          const isResolved = alert.status === "resolved";
          return (
            <div key={alert.id} className={`${cfg.bg} border ${cfg.border} rounded-2xl px-5 py-4 flex items-start justify-between gap-4`}>
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-0.5">{cfg.icon}</div>
                <div>
                  <div className="text-sm font-semibold text-gray-800 mb-0.5">{alert.title}</div>
                  <div className="text-xs text-gray-500 mb-1">{alert.message}</div>
                  <div className="text-xs text-gray-400">
                    {alert.date} &nbsp; Priority: <span className="font-medium">{alert.priority}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                {isResolved ? (
                  <span className={`text-xs font-medium px-3 py-1 rounded-full border ${cfg.badgeBg} ${cfg.badgeText} ${cfg.badgeBorder}`}>
                    Resolved
                  </span>
                ) : (
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${cfg.badgeBg} ${cfg.badgeText} ${cfg.badgeBorder}`}>
                    New
                  </span>
                )}
                <button className="text-gray-400 hover:text-teal-500 transition-colors">
                  <EyeOutlined style={{ fontSize: 16 }} />
                </button>
                {!isResolved && (
                  <>
                    <button className="text-gray-400 hover:text-teal-500 transition-colors">
                      <IoSendOutline size={16} />
                    </button>
                    <button
                      onClick={() => handleResolve(alert.id)}
                      className="text-gray-400 hover:text-green-500 transition-colors"
                      title="Mark as resolved"
                    >
                      <CheckOutlined style={{ fontSize: 16 }} />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400 text-sm bg-white rounded-2xl border border-gray-100">No alerts found.</div>
        )}
      </div>
    </div>
  );
};

export default AlertsPage;