import { useState } from "react";
import { Input } from "antd";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import { TbRefresh } from "react-icons/tb";
import toast from "react-hot-toast";

const TEAL = "#00AAA7";

const initialPending = [
  { id: 1, patient: "Michael Chen", patientRole: "Patient", clinician: "Dr. Sarah Smith", clinicianRole: "Gastroenterologist", date: "20/01/2026" },
  { id: 2, patient: "Michael Chen", patientRole: "Patient", clinician: "Dr. Sarah Smith", clinicianRole: "Gastroenterologist", date: "20/01/2026" },
  { id: 3, patient: "Michael Chen", patientRole: "Patient", clinician: "Dr. Sarah Smith", clinicianRole: "Gastroenterologist", date: "20/01/2026" },
  { id: 4, patient: "Michael Chen", patientRole: "Patient", clinician: "Dr. Sarah Smith", clinicianRole: "Gastroenterologist", date: "20/01/2026" },
];

const activeConnections = [
  { id: 1, patient: "Michael Chen", patientRole: "Patient", clinician: "Dr. Sarah Smith", clinicianRole: "Gastroenterologist" },
  { id: 2, patient: "Michael Chen", patientRole: "Patient", clinician: "Dr. Sarah Smith", clinicianRole: "Gastroenterologist" },
];

const statCards = [
  { label: "Total Connections", value: 4, bg: "bg-white", labelColor: "text-gray-500" },
  { label: "Pending", value: 1, bg: "bg-yellow-50", labelColor: "text-yellow-500" },
  { label: "Active", value: 4, bg: "bg-green-50", labelColor: "text-green-600" },
  { label: "Rejected", value: 67, bg: "bg-red-50", labelColor: "text-red-400" },
];

const AvatarCircle = ({ name, color, size = "w-9 h-9" }) => (
  <div className={`${size} rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`} style={{ backgroundColor: color || TEAL }}>
    {name[0]}
  </div>
);

const ConnectionRow = ({ item, isPending, onAccept, onReject }) => (
  <div className="flex items-center justify-between px-5 py-4 border-b  border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
    {/* Patient */}
    <div className="flex items-center gap-3 w-40">
      <AvatarCircle name={item.patient} color="#6366f1" />
      <div>
        <div className="text-sm font-semibold text-gray-800">{item.patient}</div>
        <div className="text-xs text-gray-400">{item.patientRole}</div>
      </div>
    </div>

    {/* Link icon */}
    <div className="flex items-center gap-2">
      <span className="text-gray-300 text-lg">⇔</span>
      {/* Clinician avatar circle with initials */}
      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: TEAL }}>
        DSS
      </div>
    </div>

    {/* Clinician */}
    <div className="w-44">
      <div className="text-sm font-semibold text-gray-800">{item.clinician}</div>
      <div className="text-xs text-gray-400">{item.clinicianRole}</div>
    </div>

    {isPending ? (
      <>
        <div className="text-sm text-gray-400">{item.date}</div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAccept(item.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white transition-colors"
            style={{ backgroundColor: TEAL }}
          >
            ✓ Accept
          </button>
          <button
            onClick={() => onReject(item.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-red-500 bg-red-50 border border-red-200 hover:bg-red-100 transition-colors"
          >
            ⊗ Reject
          </button>
        </div>
      </>
    ) : (
      <div className="flex items-center gap-3">
        <button className="text-gray-400 hover:text-teal-500 transition-colors">
          <EyeOutlined style={{ fontSize: 17 }} />
        </button>
        <button className="text-gray-400 hover:text-teal-500 transition-colors">
          <TbRefresh size={17} />
        </button>
      </div>
    )}
  </div>
);

const ConnectionsPage = () => {
  const [pending, setPending] = useState(initialPending);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Available", "Limited", "Unavailable"];

  const handleAccept = (id) => {
    setPending((prev) => prev.filter((p) => p.id !== id));
    toast.success("Connection accepted!");
  };

  const handleReject = (id) => {
    setPending((prev) => prev.filter((p) => p.id !== id));
    toast.error("Connection rejected.");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-poppins pb-20">
      {/* Search + Tabs */}
      <div className="flex items-center justify-between mb-5 gap-4">
        <Input
          prefix={<SearchOutlined className="text-gray-400" />}
          placeholder="Search patients by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-lg h-10 rounded-xl border-gray-200 text-sm"
        />
        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all border ${
                activeTab === tab ? "text-white border-transparent" : "bg-white text-gray-600 border-gray-200 hover:border-teal-300"
              }`}
              style={activeTab === tab ? { backgroundColor: TEAL, borderColor: TEAL } : {}}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {statCards.map((card, i) => (
          <div key={i} className={`${card.bg} rounded-2xl p-5 border border-gray-100 shadow-sm`}>
            <div className={`text-sm font-medium mb-2 ${card.labelColor}`}>{card.label}</div>
            <div className="text-3xl font-bold text-gray-800">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Pending Requests */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-5">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">Pending Requests</h2>
          <span className="text-sm text-gray-400">{pending.length} requests</span>
        </div>
        {pending.length === 0 ? (
          <div className="py-10 text-center text-gray-400 text-sm">No pending requests.</div>
        ) : (
          pending.map((item) => (
            <ConnectionRow key={item.id} item={item} isPending onAccept={handleAccept} onReject={handleReject} />
          ))
        )}
      </div>

      {/* Active Connections */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">Active Connections</h2>
          <span className="text-sm text-gray-400">{activeConnections.length} Active</span>
        </div>
        {activeConnections.map((item) => (
          <ConnectionRow key={item.id} item={item} isPending={false} />
        ))}
      </div>
    </div>
  );
};

export default ConnectionsPage;