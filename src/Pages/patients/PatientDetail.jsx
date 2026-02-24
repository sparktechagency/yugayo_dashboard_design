import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import PatientOverview from "../../components/patients/PatientOverview";
import PatientTimeline from "../../components/patients/PatientTimeline";
import PatientNotes from "../../components/patients/PatientNotes";



const patient = {
  id: 1,
  name: "Sarah Jenkins",
  age: 34,
  idCode: "#p1",
  status: "Stable",
  avatar: "https://i.pravatar.cc/80?img=12",
};

const PatientDetail = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const navigate = useNavigate();
  const tabs = ["Overview", "Timeline", "Notes"];

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-poppins pb-20">
      <button
        onClick={() => navigate("/patients")}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-teal-600 mb-5 transition-colors"
      >
        <ArrowLeftOutlined /> Back to Patients
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Patient Header */}
        <div className="px-6 pt-6 pb-0">
          <div className="flex items-center gap-4 mb-5">
            <img
              src={patient.avatar}
              alt={patient.name}
              className="w-16 h-16 rounded-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentNode.innerHTML = `<div style="width:64px;height:64px;border-radius:50%;background:#00AAA7;display:flex;align-items:center;justify-content:center;color:white;font-size:24px;font-weight:600">${patient.name[0]}</div>`;
              }}
            />
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {patient.name}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {patient.age} yrs • ID: {patient.idCode}
              </p>
              <span className="inline-block mt-1.5 text-xs font-medium px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-200">
                {patient.status}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium transition-all duration-150 border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-teal-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "Overview" && <PatientOverview />}
          {activeTab === "Timeline" && <PatientTimeline />}
          {activeTab === "Notes" && <PatientNotes />}
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
