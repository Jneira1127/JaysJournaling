//1. should be able to bring up a popup button after the user clicks the ellipses button for the groups
//2. Popup should display a text input field to modify the current name of the group
//3. Popup up should display a color picker to decide the groups color
//4. Popup should display apply and cancel button
//5. After the apply button is hit, the BE should be updated
//6. Add in a X out button to close the window and not save anything

import { useUI } from "@/src/context/UIContext";
import { useJournal } from "@/src/context/JournalContext";
import { editGroup } from "@/src/app/action";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

const EditPopup = () => {
  const { setActiveGroupEditing, selectedGroupId } = useUI();
  const { groups, updateGroup } = useJournal();
  const activeGroup = groups.find((g) => g.id === selectedGroupId);
  const [name, setName] = useState(activeGroup!.name);
  const [color, setColor] = useState(activeGroup!.color);

  const handleApply = async () => {
    if (!activeGroup) return;
    await updateGroup(activeGroup!.id, name, color);
    setActiveGroupEditing(false);
  };
  const boxSize = "240px";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div
        className="relative w-[90vw] max-w-[700px] border border-gray-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        style={{ backgroundColor: "var(--card-bg, white)" }}
      >
        {/* Header: title centered, X in top right */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex-1 px-4">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
              Group Name
            </label>
            <input
              className="text-2xl font-bold bg-transparent border-none focus:ring-0 outline-none w-full p-0"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Group Name"
              autoFocus
            />
          </div>
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
            onClick={() => setActiveGroupEditing(false)}
          >
            <span className="text-xl">✕</span>
          </button>
        </div>

        {/* Main content area */}
        <div className="flex items-center justify-center p-10">
          <div className="flex items-center gap-12">
            {/* Left Side: The Picker */}
            <div className="flex flex-col items-center gap-4">
              {/* Note: We use a style object to force the picker size */}
              <div
                style={{ width: boxSize, height: boxSize }}
                className="custom-color-picker"
              >
                <HexColorPicker
                  color={color}
                  onChange={setColor}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                Choose Color
              </p>
            </div>

            {/* Middle: The Divider */}
            <div className="w-[1px] h-48 bg-gray-200" />

            {/* Right Side: The Preview */}
            <div className="flex flex-col items-center gap-4">
              <div
                style={{
                  width: boxSize,
                  height: boxSize,
                  backgroundColor: color,
                  borderRadius: "12px", // Matches react-colorful default radius
                  boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)",
                  border: "8px solid white",
                }}
                className="shadow-inner"
              />
              <div className="text-center">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter mb-1">
                  Selected
                </p>
                <code className="text-lg font-mono font-bold bg-gray-100 px-3 py-1 rounded-md lowercase">
                  {color}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Footer: Apply and Cancel centered at bottom */}
        <div className="flex items-center justify-center gap-4 pb-4">
          <button
            className="cursor-pointer border-2 border-black rounded-lg p-3"
            onClick={() => {
              handleApply();
              setActiveGroupEditing(false);
            }}
          >
            APPLY
          </button>
          <button
            className="cursor-pointer border-2 border-black rounded-lg p-3"
            onClick={() => setActiveGroupEditing(false)}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
