import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineLocationOn,
  MdOutlineBusinessCenter,
} from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi";

const TEAL = "#00AAA7";

const connectedPatients = [
  {
    id: 1,
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    healthScore: 72,
    status: "Stable",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    healthScore: 72,
    status: "Stable",
  },
];

const clinician = {
  name: "Dr. Sarah Jenkins",
  specialty: "Gastroenterologist",
  availability: "Available",
  email: "sarah.smith@yugayo.com",
  phone: "Not provided",
  location: "San Francisco, CA",
  experience: "12 years experience",
  connectedPatients: 7,
  avatar: "https://i.pravatar.cc/80?img=12",
};

const CliniciansDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-poppins">
      <button
        onClick={() => navigate("/clinicians")}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-teal-600 mb-5 transition-colors"
      >
        <ArrowLeftOutlined /> Back to Clinicians
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">
        {/* Header Row */}
        <div className="flex items-start gap-4 mb-5">
          <img
            src={clinician.avatar}
            alt={clinician.name}
            className="w-16 h-16 rounded-full object-cover flex-shrink-0"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.innerHTML = `<div style="width:64px;height:64px;border-radius:50%;background:${TEAL};display:flex;align-items:center;justify-content:center;color:white;font-size:22px;font-weight:600;flex-shrink:0">D</div>`;
            }}
          />
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-800 mb-0.5">
              {clinician.name}
            </h1>
            <p className="text-sm text-gray-500 mb-2">{clinician.specialty}</p>
            <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-200">
              ✓ {clinician.availability}
            </span>
          </div>

          {/* Contact Info Grid */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MdOutlineEmail size={16} className="text-gray-400" />
              {clinician.email}
            </div>
            <div className="flex items-center gap-2">
              <MdOutlinePhone size={16} className="text-gray-400" />
              {clinician.phone}
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineLocationOn size={16} className="text-gray-400" />
              {clinician.location}
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineBusinessCenter size={16} className="text-gray-400" />
              {clinician.experience}
            </div>
          </div>
        </div>
      </div>

      {/* Health Overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">
        <h2 className="text-base font-semibold text-gray-800 mb-4">
          Health Overview
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
              <HiOutlineUsers size={14} style={{ color: TEAL }} />
              <span>Connected Patients</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {String(clinician.connectedPatients).padStart(2, "0")}
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
              <MdOutlineBusinessCenter size={14} style={{ color: TEAL }} />
              <span>Experience</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">12 years</div>
          </div>
        </div>
      </div>

      {/* Connected Patients */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4">
          Connected Patients
        </h2>
        <div className="space-y-3">
          {connectedPatients.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between bg-gray-50 rounded-xl px-5 py-4 border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                  style={{ backgroundColor: TEAL }}
                >
                  {p.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">
                    {p.name}
                  </div>
                  <div className="text-xs text-gray-400">{p.email}</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-0.5">Health Score</div>
                <div className="text-base font-bold text-gray-800">
                  {p.healthScore}
                </div>
              </div>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-200">
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CliniciansDetail;
