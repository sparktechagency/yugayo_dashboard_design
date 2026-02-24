import { useState } from "react";
import { Button } from "antd";

const TEAL = "#00AAA7";

const noteTypes = [
  "Observation",
  "Recommendation",
  "Follow-up",
  "Visible to Patient",
];

const PatientNotes = () => {
  const [activeType, setActiveType] = useState("Observation");
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);

  const handleSave = () => {
    if (!note.trim()) return;
    setSavedNotes([
      { type: activeType, content: note, date: new Date().toLocaleString() },
      ...savedNotes,
    ]);
    setNote("");
  };

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-800 mb-5">Add Note</h2>

      {/* Note Type Tabs */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        {noteTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
              activeType === type
                ? "text-white"
                : "text-teal-600 hover:bg-teal-50"
            }`}
            style={activeType === type ? { backgroundColor: TEAL } : {}}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a clinical note......"
        rows={7}
        className="w-full border border-gray-200 rounded-xl p-4 text-sm text-gray-700 resize-none focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-200 transition-all"
      />

      <div className="flex justify-end mt-3">
        <Button
          onClick={handleSave}
          className="px-6 h-9 rounded-lg text-sm font-medium text-white"
          style={{ backgroundColor: TEAL, borderColor: TEAL }}
        >
          Save Note
        </Button>
      </div>

      {/* Saved Notes */}
      {savedNotes.length > 0 && (
        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-700">Saved Notes</h3>
          {savedNotes.map((n, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-xl p-4 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: "#E0F7F6", color: TEAL }}
                >
                  {n.type}
                </span>
                <span className="text-xs text-gray-400">{n.date}</span>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {n.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientNotes;
