import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { IoTrendingUpOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi";
import { MdOutlineBusinessCenter } from "react-icons/md";

const TEAL = "#00AAA7";

// --- Data ---
const trendData = [
  { day: "Mon", score: 62 }, { day: "Tue", score: 65 }, { day: "Wed", score: 64 },
  { day: "Thu", score: 67 }, { day: "Fri", score: 66 }, { day: "Sat", score: 68 }, { day: "Sun", score: 67 },
];

const statusDistribution = [
  { label: "Stable", percent: 50, color: "#22c55e" },
  { label: "Stable", percent: 50, color: "#f59e0b" },
  { label: "Stable", percent: 50, color: "#ef4444" },
];

const symptoms = [
  { rank: 1, name: "Bloating", reports: 1 },
  { rank: 1, name: "Bloating", reports: 1 },
  { rank: 1, name: "Bloating", reports: 1 },
  { rank: 1, name: "Bloating", reports: 1 },
];

const triggers = [
  { rank: 1, name: "Dairy", high: 1, med: 0, low: 0 },
  { rank: 1, name: "Dairy", high: 1, med: 0, low: 0 },
  { rank: 1, name: "Dairy", high: 1, med: 0, low: 0 },
  { rank: 1, name: "Dairy", high: 1, med: 0, low: 0 },
];



const xLabels = ["Dairy", "Onions", "Coffee", "Spicy Food"];
const yLabels = ["Bloating", "Gas", "Abdominal Pain", "Heartburn"];

const statsTop = [
  { icon: <IoTrendingUpOutline size={18} style={{ color: TEAL }} />, value: "67", label: "Avg Health Score", change: "+12%", bg: "bg-teal-50" },
  { icon: <HiOutlineUsers size={18} style={{ color: TEAL }} />, value: "1", label: "Total Patients", change: "+8%", bg: "bg-teal-50" },
  { icon: <IoTrendingUpOutline size={18} style={{ color: TEAL }} />, value: "4", label: "Active Connections", change: "+5%", bg: "bg-teal-50" },
  { icon: <MdOutlineBusinessCenter size={18} style={{ color: TEAL }} />, value: "25.0%", label: "Connection Rate", change: "+3%", bg: "bg-teal-50" },
];

const bottomStats = [
  { label: "Total Meals Logged", value: "6", sub: "+15% this month", subColor: "text-green-500" },
  { label: "Total Symptoms Tracked", value: "4", sub: "+8% this month", subColor: "text-yellow-500" },
  { label: "Avg Clinician Load", value: "0.3", sub: "patients per clinician", subColor: "text-blue-500" },
];

// Custom bubble chart using SVG overlay (recharts ScatterChart)
const CorrelationChart = () => {
  const bubbles = [
    { x: 0, y: 0, r: 22, color: "#ef4444" },
    { x: 0, y: 2, r: 18, color: "#f59e0b" },
    { x: 1, y: 1, r: 16, color: "#f59e0b" },
    { x: 2, y: 3, r: 18, color: "#22c55e" },
    { x: 3, y: 3, r: 18, color: "#f59e0b" },
  ];

  const W = 580, H = 260;
  const leftPad = 90, rightPad = 30, topPad = 20, bottomPad = 40;
  const cols = xLabels.length;
  const rows = yLabels.length;
  const cellW = (W - leftPad - rightPad) / (cols - 1);
  const cellH = (H - topPad - bottomPad) / (rows - 1);

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
      {/* Grid lines */}
      {yLabels.map((_, i) => (
        <line key={i} x1={leftPad} x2={W - rightPad} y1={topPad + i * cellH} y2={topPad + i * cellH} stroke="#E5E7EB" strokeWidth={1} />
      ))}
      {xLabels.map((_, j) => (
        <line key={j} x1={leftPad + j * cellW} x2={leftPad + j * cellW} y1={topPad} y2={H - bottomPad} stroke={TEAL} strokeWidth={1} />
      ))}
      {/* Y Labels */}
      {yLabels.map((label, i) => (
        <text key={i} x={leftPad - 8} y={topPad + i * cellH + 4} textAnchor="end" fontSize={10} fill="#9CA3AF">{label}</text>
      ))}
      {/* X Labels */}
      {xLabels.map((label, j) => (
        <text key={j} x={leftPad + j * cellW} y={H - bottomPad + 18} textAnchor="middle" fontSize={10} fill="#9CA3AF">{label}</text>
      ))}
      {/* Bubbles */}
      {bubbles.map((b, i) => (
        <circle
          key={i}
          cx={leftPad + b.x * cellW}
          cy={topPad + (rows - 1 - b.y) * cellH}
          r={b.r}
          fill={b.color}
          fillOpacity={0.85}
        />
      ))}
    </svg>
  );
};

const AnalyticsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 font-poppins pb-20" >
      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {statsTop.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#E0F7F6" }}>
                {s.icon}
              </div>
              <span className="text-green-500 text-xs font-medium">↑ {s.change}</span>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-0.5">{s.value}</div>
            <div className="text-xs text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {/* Area Chart */}
        <div className="col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Average Health Score Trend</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FCD34D" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#FCD34D" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5F7F6" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} domain={[0, 80]} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "none", fontSize: 12 }} />
              <Area type="monotone" dataKey="score" stroke="#F59E0B" strokeWidth={2} fill="url(#scoreGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Patient Status Distribution */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Patient Status Distribution</h2>
          <div className="space-y-4">
            {statusDistribution.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{s.label}</span>
                  <span>{s.percent}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${s.percent}%`, backgroundColor: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Symptoms + Triggers */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        {/* Most Common Symptoms */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Most Common Symptoms</h2>
          <div className="space-y-2">
            {symptoms.map((s, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-500 text-xs flex items-center justify-center font-bold">{s.rank}</span>
                  <span className="text-sm text-gray-700">{s.name}</span>
                </div>
                <span className="text-xs text-gray-400">{s.reports} reports</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Trigger Foods */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Top Trigger Foods</h2>
          <div className="space-y-2">
            {triggers.map((t, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-500 text-xs flex items-center justify-center font-bold">{t.rank}</span>
                  <div>
                    <div className="text-sm text-gray-700 font-medium">{t.name}</div>
                    <div className="text-xs text-gray-400">High:{t.high} • Med:{t.med} • Low:{t.low}</div>
                  </div>
                </div>
                <span className="text-xs text-gray-400">patients</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Food-Symptom Correlations */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-5">
        <h2 className="text-sm font-semibold text-gray-800 mb-4">Food-Symptom Correlations</h2>
        <CorrelationChart />
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-3 gap-4">
        {bottomStats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="text-sm text-gray-500 mb-2">{s.label}</div>
            <div className="text-3xl font-bold text-gray-800 mb-1">{s.value}</div>
            <div className={`text-xs font-medium ${s.subColor}`}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsPage;