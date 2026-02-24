import { useState } from "react";
import { Input } from "antd";
import { SearchOutlined, EyeOutlined, MoreOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const TEAL = "#00AAA7";

const allPatients = [
  {
    id: 1,
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    status: "Stable",
    healthScore: 72,
    clinician: "Dr. Sarah Smith",
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    status: "At Risk",
    healthScore: 72,
    clinician: "Dr. Sarah Smith",
    lastActive: "2 hours ago",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    status: "Flare-up",
    healthScore: 72,
    clinician: "Dr. Sarah Smith",
    lastActive: "2 hours ago",
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    status: "Stable",
    healthScore: 72,
    clinician: "Dr. Sarah Smith",
    lastActive: "2 hours ago",
  },
];

const statusStyles = {
  Stable: {
    badge: "bg-green-50 text-green-600 border border-green-200",
    bar: "#22c55e",
  },
  "At Risk": {
    badge: "bg-yellow-50 text-yellow-600 border border-yellow-200",
    bar: "#f59e0b",
  },
  "Flare-up": {
    badge: "bg-red-50 text-red-500 border border-red-200",
    bar: "#ef4444",
    icon: true,
  },
};

const statCards = [
  {
    label: "Total Patients",
    value: 4,
    bg: "bg-white",
    labelColor: "text-gray-500",
    valueColor: "text-gray-800",
  },
  {
    label: "Stable",
    value: 1,
    bg: "bg-green-50",
    labelColor: "text-green-600",
    valueColor: "text-gray-800",
  },
  {
    label: "At Risk",
    value: 4,
    bg: "bg-yellow-50",
    labelColor: "text-yellow-500",
    valueColor: "text-gray-800",
  },
  {
    label: "Flare-up",
    value: 67,
    bg: "bg-red-50",
    labelColor: "text-red-400",
    valueColor: "text-gray-800",
  },
];

const HealthBar = ({ score, status }) => {
  const color = statusStyles[status]?.bar || TEAL;
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-sm text-gray-700 font-medium">{score}</span>
    </div>
  );
};

const PatientsPage = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();

  const tabs = ["All", "Stable", "At Risk", "Flare-up"];

  const filtered = allPatients.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase());
    const matchTab = activeTab === "All" || p.status === activeTab;
    return matchSearch && matchTab;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-poppins pb-20">
      {/* Search + Filter Tabs */}
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
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-150 border ${
                activeTab === tab
                  ? "text-white border-transparent"
                  : "bg-white text-gray-600 border-gray-200 hover:border-teal-300"
              }`}
              style={
                activeTab === tab
                  ? { backgroundColor: TEAL, borderColor: TEAL }
                  : {}
              }
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {statCards.map((card, i) => (
          <div
            key={i}
            className={`${card.bg} rounded-2xl p-5 border border-gray-100 shadow-sm`}
          >
            <div className={`text-sm font-medium mb-2 ${card.labelColor}`}>
              {card.label}
            </div>
            <div className={`text-3xl font-bold ${card.valueColor}`}>
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-6 px-6 py-3 border-b border-gray-100">
          {[
            "Patient",
            "Status",
            "Health Score",
            "Connected Clinician",
            "Last Active",
            "Actions",
          ].map((h) => (
            <div
              key={h}
              className="text-xs font-medium text-gray-400 uppercase tracking-wide text-center first:text-left"
            >
              {h}
            </div>
          ))}
        </div>

        {/* Rows */}
        {filtered.map((patient) => {
          const style = statusStyles[patient.status];
          return (
            <div
              key={patient.id}
              className="grid grid-cols-6 px-6 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors items-center"
            >
              {/* Patient */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                  style={{ backgroundColor: TEAL }}
                >
                  {patient.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">
                    {patient.name}
                  </div>
                  <div className="text-xs text-gray-400">{patient.email}</div>
                </div>
              </div>

              {/* Status */}
              <div className="flex justify-center">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 ${style.badge}`}
                >
                  {style.icon && <span>⚠</span>}
                  {patient.status}
                </span>
              </div>

              {/* Health Score */}
              <div className="flex justify-center">
                <HealthBar
                  score={patient.healthScore}
                  status={patient.status}
                />
              </div>

              {/* Clinician */}
              <div className="text-sm text-gray-600 text-center">
                {patient.clinician}
              </div>

              {/* Last Active */}
              <div className="text-sm text-gray-500 text-center">
                {patient.lastActive}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => navigate(`/patients/${patient.id}`)}
                  className="text-gray-400 hover:text-teal-500 transition-colors"
                >
                  <EyeOutlined style={{ fontSize: 18 }} />
                </button>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreOutlined style={{ fontSize: 18 }} />
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400 text-sm">
            No patients found.
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientsPage;
