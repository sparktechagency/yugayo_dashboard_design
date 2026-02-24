import { FaUserInjured } from "react-icons/fa";
import { IoTrendingUpOutline } from "react-icons/io5";
import { MdOutlineWarningAmber } from "react-icons/md";

const activities = [
  {
    icon: "patient",
    name: "Sarah Jenkins",
    action: "logged symptoms",
    time: "2 hours ago",
    badge: {
      label: "Stable",
      color: "text-green-600 bg-green-50 border-green-200",
    },
  },
  {
    icon: "patient",
    name: "Sarah Jenkins",
    action: "logged symptoms",
    time: "2 hours ago",
    badge: {
      label: "Flare-up",
      color: "text-red-500 bg-red-50 border-red-200",
    },
  },
  {
    icon: "connection",
    name: "Sarah Jenkins",
    action: "requested connection with Dr. Sarah Smith",
    time: "20/01/2026, 09:57:44",
    badge: {
      label: "pending",
      color: "text-gray-500 bg-transparent border-transparent",
    },
  },
  {
    icon: "patient",
    name: "Sarah Jenkins",
    action: "logged symptoms",
    time: "2 hours ago",
    badge: {
      label: "pending",
      color: "text-gray-500 bg-transparent border-transparent",
    },
  },
  {
    icon: "alert",
    name: "Sarah Jenkins",
    action: "flare-up detected",
    time: "15 mins ago",
    badge: {
      label: "critical",
      color: "text-red-500 bg-red-50 border-red-200",
    },
  },
];

const IconAvatar = ({ type }) => {
  const base =
    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0";
  if (type === "alert") {
    return (
      <div className={`${base}`} style={{ backgroundColor: "#FEE2E2" }}>
        <MdOutlineWarningAmber size={18} className="text-red-500" />
      </div>
    );
  }
  if (type === "connection") {
    return (
      <div className={`${base}`} style={{ backgroundColor: "#CCEEEE" }}>
        <IoTrendingUpOutline size={18} style={{ color: "#00AAA7" }} />
      </div>
    );
  }
  return (
    <div className={`${base}`} style={{ backgroundColor: "#CCEEEE" }}>
      <FaUserInjured size={16} style={{ color: "#00AAA7" }} />
    </div>
  );
};

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-6">
      <div className="px-6 pt-5 pb-2">
        <h2 className="text-base font-semibold text-gray-800">
          Recent Activity
        </h2>
      </div>

      <div>
        {activities.map((activity, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <IconAvatar type={activity.icon} />
              <div>
                <p className="text-sm text-gray-800">
                  <span className="font-semibold">{activity.name}</span>{" "}
                  <span className="text-gray-600">{activity.action}</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {activity.badge.label !== "pending" ? (
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full border ${activity.badge.color}`}
                >
                  {activity.badge.label}
                </span>
              ) : (
                <span className="text-sm text-gray-400">
                  {activity.badge.label}
                </span>
              )}
              <span className="text-gray-300 text-sm">›</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
