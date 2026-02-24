import { useNavigate } from "react-router-dom";

const actions = [
  { label: "View All Patients", link: "/patients" },
  { label: "Manage Clinicians", link: "/clinicians" },
  { label: "Review Connections", link: "/connections" },
  { label: "View Analytics", link: "/analytics" },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-6">
      <h2 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, i) => (
          <button
            key={i}
            onClick={() => navigate(action.link)}
            className="flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm text-gray-700 font-medium hover:border-teal-400 hover:text-teal-600 transition-all duration-150 shadow-sm"
          >
            <span>{action.label}</span>
            <span className="text-gray-400">›</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;