const statuses = [
  {
    label: "Stable",
    count: 2,
    color: "#22c55e",
    icon: (
      <span className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center">
        <span className="w-2 h-2 rounded-full bg-green-500" />
      </span>
    ),
    percent: 50,
  },
  {
    label: "At Risk",
    count: 1,
    color: "#f59e0b",
    icon: <span className="text-yellow-500 text-base leading-none">⚠</span>,
    percent: 25,
  },
  {
    label: "Flare-up",
    count: 1,
    color: "#ef4444",
    icon: <span className="text-red-500 text-base leading-none">⚠</span>,
    percent: 25,
  },
];

const PatientStatusDistribution = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-base font-semibold text-gray-800 mb-5">
        Patient Status Distribution
      </h2>

      <div className="space-y-5">
        {statuses.map((s, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {s.icon}
                <span className="text-sm text-gray-700">{s.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  {s.count}
                </span>
                <span className="text-gray-400 text-sm">›</span>
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${s.percent}%`, backgroundColor: s.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientStatusDistribution;
