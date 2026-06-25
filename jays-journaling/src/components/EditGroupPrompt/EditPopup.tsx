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

  return (
    <div className="fixed inset-0 top-[10vh] z-40 flex items-center justify-center">
      <div
        className="relative w-[75vw] h-[60vh] border-4 border-red-500 rounded-xl shadow-2xl flex flex-col"
        style={{
          backgroundColor: "var(--card-bg)",
        }}
      >
        {/* Header: title centered, X in top right */}
        <div className="relative flex items-center justify-center pt-4 px-4">
          <input
            className="text-center h-10"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="absolute right-4 text-lg font-bold cursor-pointer"
            onClick={() => setActiveGroupEditing(false)}
          >
            X
          </button>
        </div>

        {/* Main content area */}
        <div className="flex items-center justify-center flex-1 text-red-500 font-bold text-4xl opacity-50">
          POPUP AREA
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
