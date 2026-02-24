import { IoTrendingUpOutline } from "react-icons/io5";
import { GiForkKnifeSpoon } from "react-icons/gi";

const TEAL = "#00AAA7";

const timelineEvents = [
  { type: "meal", label: "Lunch", time: "08:49", position: 15, above: true },
  { type: "meal", label: "Lunch", time: "08:49", position: 30, above: true },
  {
    type: "symptom",
    label: "Acid Reflux",
    time: "08:49",
    position: 22,
    above: false,
  },
];

const EventIcon = ({ type }) => {
  const base =
    "w-10 h-10 rounded-full flex items-center justify-center border-2 border-white shadow-sm flex-shrink-0";
  if (type === "meal") {
    return (
      <div className={base} style={{ backgroundColor: TEAL }}>
        <GiForkKnifeSpoon size={16} className="text-white" />
      </div>
    );
  }
  return (
    <div className={base} style={{ backgroundColor: TEAL }}>
      <IoTrendingUpOutline size={16} className="text-white" />
    </div>
  );
};

const PatientTimeline = () => {
  return (
    <div>
      <h2 className="text-base font-semibold text-gray-800 mb-8">
        Activity Timeline
      </h2>

      {/* Timeline track */}
      <div className="relative py-6">
        {/* Above-line events (meals) */}
        <div className="relative h-20 mb-0">
          {timelineEvents
            .filter((e) => e.above)
            .map((event, i) => (
              <div
                key={i}
                className="absolute flex flex-col items-center"
                style={{ left: `${event.position}%` }}
              >
                <EventIcon type={event.type} />
                <span
                  className="text-xs font-medium mt-1"
                  style={{ color: TEAL }}
                >
                  {event.label}
                </span>
                <span className="text-xs text-gray-400">{event.time}</span>
              </div>
            ))}
        </div>

        {/* The line */}
        <div
          className="relative h-1 rounded-full"
          style={{ backgroundColor: "#E5E7EB" }}
        >
          <div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{ width: "20%", backgroundColor: TEAL }}
          />
        </div>

        {/* Below-line events (symptoms) */}
        <div className="relative h-20">
          {timelineEvents
            .filter((e) => !e.above)
            .map((event, i) => (
              <div
                key={i}
                className="absolute flex flex-col items-center"
                style={{ left: `${event.position}%` }}
              >
                <span
                  className="text-xs font-medium mb-1"
                  style={{ color: "#f59e0b" }}
                >
                  {event.label}
                </span>
                <span className="text-xs text-gray-400 mb-1">{event.time}</span>
                <EventIcon type={event.type} />
              </div>
            ))}
        </div>

        {/* Scrollbar track */}
        <div className="mt-4 h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: "25%", backgroundColor: TEAL }}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientTimeline;
