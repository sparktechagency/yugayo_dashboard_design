import { useState } from "react";
import { Input } from "antd";
import { SearchOutlined, EyeOutlined, MoreOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi";

const TEAL = "#00AAA7";

const clinicians = [
  {
    id: 1,
    name: "Dr. Sarah Jenkins",
    email: "sarah.j@example.com",
    specialty: "Gastroenterologist",
    patients: 1,
    availability: "Available",
  },
  {
    id: 2,
    name: "Dr. Sarah Jenkins",
    email: "sarah.j@example.com",
    specialty: "Gastroenterologist",
    patients: 1,
    availability: "Available",
  },
  {
    id: 3,
    name: "Dr. Sarah Jenkins",
    email: "sarah.j@example.com",
    specialty: "Gastroenterologist",
    patients: 1,
    availability: "Limited",
  },
  {
    id: 4,
    name: "Dr. Sarah Jenkins",
    email: "sarah.j@example.com",
    specialty: "Gastroenterologist",
    patients: 1,
    availability: "Unavailable",
  },
];

const availabilityStyle = {
  Available: "bg-green-50 text-green-600 border-green-200",
  Limited: "bg-yellow-50 text-yellow-600 border-yellow-200",
  Unavailable: "bg-red-50 text-red-500 border-red-200",
};

const statCards = [
  {
    label: "Total Clinicians",
    value: 4,
    bg: "bg-white",
    labelColor: "text-gray-500",
    valueColor: "text-gray-800",
  },
  {
    label: "Available",
    value: 1,
    bg: "bg-green-50",
    labelColor: "text-green-600",
    valueColor: "text-gray-800",
  },
  {
    label: "Avg Rating",
    value: 4,
    bg: "bg-yellow-50",
    labelColor: "text-yellow-500",
    valueColor: "text-gray-800",
  },
  {
    label: "Total Patients",
    value: 67,
    bg: "bg-blue-50",
    labelColor: "text-blue-500",
    valueColor: "text-gray-800",
  },
];

const CliniciansPage = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();
  const tabs = ["All", "Available", "Limited", "Unavailable"];

  const filtered = clinicians.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchTab = activeTab === "All" || c.availability === activeTab;
    return matchSearch && matchTab;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-poppins">
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
        <div className="grid grid-cols-5 px-6 py-3 border-b border-gray-100">
          {[
            "Clinician",
            "Specialty",
            "Patients",
            "Availability",
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

        {filtered.map((c) => (
          <div
            key={c.id}
            className="grid grid-cols-5 px-6 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors items-center"
          >
            {/* Clinician */}
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                style={{ backgroundColor: TEAL }}
              >
                {c.name[4]}
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800">
                  {c.name}
                </div>
                <div className="text-xs text-gray-400">{c.email}</div>
              </div>
            </div>
            {/* Specialty */}
            <div className="flex items-center justify-center gap-1.5 text-sm text-gray-600">
              <MdOutlineBusinessCenter size={15} className="text-gray-400" />
              {c.specialty}
            </div>
            {/* Patients */}
            <div className="flex items-center justify-center gap-1.5 text-sm text-gray-600">
              <HiOutlineUsers size={15} className="text-gray-400" />
              {c.patients} active
            </div>
            {/* Availability */}
            <div className="flex justify-center">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full border ${
                  availabilityStyle[c.availability]
                }`}
              >
                {c.availability}
              </span>
            </div>
            {/* Actions */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => navigate(`/clinicians/${c.id}`)}
                className="text-gray-400 hover:text-teal-500 transition-colors"
              >
                <EyeOutlined style={{ fontSize: 17 }} />
              </button>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <MoreOutlined style={{ fontSize: 17 }} />
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400 text-sm">
            No clinicians found.
          </div>
        )}
      </div>
    </div>
  );
};

export default CliniciansPage;
