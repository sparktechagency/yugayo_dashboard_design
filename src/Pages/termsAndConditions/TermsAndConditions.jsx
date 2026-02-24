import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";

const TEAL = "#00AAA7";

const TermsAndConditions = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const handleClear = () => setContent("");

  const handleSave = () => toast.success("Terms & Conditions saved successfully!");

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-poppins pb-20">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-800">Terms & Conditions</h1>
        <p className="text-sm text-gray-400 mt-0.5">Manage and update your platform terms and conditions</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {/* Header strip */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl mb-5"
          style={{ backgroundColor: "#E0F7F6" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{ backgroundColor: TEAL }}
          >
            TC
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Terms & Conditions Document</p>
            <p className="text-xs text-gray-400">Last updated: today</p>
          </div>
        </div>

        <JoditEditor
          ref={editor}
          value={content}
          onBlur={setContent}
          config={{
            buttons: "bold,italic,underline,|,ul,ol,|,h1,h2,paragraph,|,align,|,image,link,|,source",
            height: 420,
            placeholder: "Write your terms and conditions content here...",
            style: { fontFamily: "Poppins, sans-serif", fontSize: "14px" },
          }}
          className="rounded-xl overflow-hidden border border-gray-100"
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={handleClear}
            className="px-5 py-2 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200"
          >
            Clear
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-xl text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: TEAL }}
            onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;