import { useNavigate } from "react-router-dom";

const PendingActions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base font-semibold text-gray-800">Pending Actions</h2>

      {/* Connection Requests */}
      <div
        className="rounded-2xl p-5 border"
        style={{ backgroundColor: "#FFFBEB", borderColor: "#FDE68A" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-yellow-500 text-lg">🕐</span>
          <span className="text-sm font-medium text-gray-700">
            Connection Requests
          </span>
        </div>
        <div className="text-3xl font-bold text-gray-800 mb-3">2</div>
        <button
          onClick={() => navigate("/connections")}
          className="flex items-center gap-1 text-sm font-medium text-yellow-600 hover:text-yellow-700 transition-colors"
        >
          Review Now <span>›</span>
        </button>
      </div>

      {/* Critical Alerts */}
      <div
        className="rounded-2xl p-5 border"
        style={{ backgroundColor: "#FFF5F5", borderColor: "#FECACA" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-red-500 text-lg">⚠</span>
          <span className="text-sm font-medium text-gray-700">
            Critical Alerts
          </span>
        </div>
        <div className="text-3xl font-bold text-gray-800 mb-3">1</div>
        <button
          onClick={() => navigate("/alerts")}
          className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
        >
          View Alerts <span>›</span>
        </button>
      </div>
    </div>
  );
};

export default PendingActions;
