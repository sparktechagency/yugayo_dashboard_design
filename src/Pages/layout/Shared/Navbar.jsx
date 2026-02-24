import { useState } from "react";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { Popover } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const TEAL = "#00AAA7";

const routeTitles = {
  "/dashboard": {
    title: "Dashboard Overview",
    sub: "Real-time system monitoring and management",
  },
  "/patients": {
    title: "Patients",
    sub: "Manage and monitor your patient list",
  },
  "/clinicians": {
    title: "Clinicians",
    sub: "View and manage clinician profiles",
  },
  "/connections": {
    title: "Connections",
    sub: "Patient-clinician connection management",
  },
  "/analytics": { title: "Analytics", sub: "Insights and performance metrics" },
  "/alerts": { title: "Alerts", sub: "System alerts and notifications" },
  "/settings/profile": {
    title: "Settings",
    sub: "Manage your account and preferences",
  },
  "/settings/privacy-policy": {
    title: "Privacy Policy",
    sub: "Manage platform privacy policy",
  },
  "/settings/terms-and-condition": {
    title: "Terms & Conditions",
    sub: "Manage platform terms and conditions",
  },
};

const Navbar = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Patient flare-up detected",
      read: false,
      createdAt: "2 hours ago",
    },
    {
      id: 2,
      message: "New connection request",
      read: false,
      createdAt: "5 hours ago",
    },
    {
      id: 3,
      message: "Critical alert: Low health score",
      read: true,
      createdAt: "Yesterday",
    },
  ]);

  const navigate = useNavigate();
  const location = useLocation();

  const currentRoute = Object.keys(routeTitles).find((key) =>
    location.pathname.startsWith(key)
  );
  const pageInfo = routeTitles[currentRoute] || {
    title: "Dashboard",
    sub: "Welcome back",
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationClick = () => {
    setPopoverOpen(false);
    navigate("/alerts");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const NotificationContent = (
    <div className="w-80 font-poppins">
      <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="text-xs font-medium hover:underline"
            style={{ color: TEAL }}
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="max-h-72 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={handleNotificationClick}
              className={`flex items-start gap-3 px-4 py-3 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${
                !n.read ? "bg-teal-50/40" : ""
              }`}
            >
              <div
                className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                style={{
                  backgroundColor: !n.read ? TEAL : "transparent",
                  border: n.read ? "1.5px solid #d1d5db" : "none",
                }}
              />
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm ${
                    !n.read ? "font-medium text-gray-800" : "text-gray-600"
                  }`}
                >
                  {n.message}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{n.createdAt}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-sm text-gray-400">
            No notifications
          </div>
        )}
      </div>

      <div className="px-4 py-2.5 border-t border-gray-100">
        <button
          onClick={handleNotificationClick}
          className="w-full text-xs font-medium text-center py-1 rounded-lg hover:bg-gray-50 transition-colors"
          style={{ color: TEAL }}
        >
          View all alerts →
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-between mx-6 bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100 font-poppins ">
      {/* Left: Page title */}
      <div>
        <h1 className="text-base font-bold text-gray-800 leading-tight">
          {pageInfo.title}
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">{pageInfo.sub}</p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <Popover
          content={NotificationContent}
          trigger="click"
          placement="bottomRight"
          open={popoverOpen}
          onOpenChange={setPopoverOpen}
          overlayInnerStyle={{
            padding: 0,
            borderRadius: 16,
            overflow: "hidden",
          }}
          overlayStyle={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
        >
          <button className="relative w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-teal-300 hover:text-teal-600 transition-all bg-white">
            <MdOutlineNotificationsNone size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
                {unreadCount}
              </span>
            )}
          </button>
        </Popover>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-teal-300 hover:text-teal-600 transition-all bg-white"
          title="Logout"
        >
          <TbLogout size={18} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
