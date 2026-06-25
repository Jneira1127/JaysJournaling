//1. should be able to bring up a popup button after the user clicks the ellipses button for the groups
//2. Popup should display a text input field to modify the current name of the group
//3. Popup up should display a color picker to decide the groups color
//4. Popup should display apply and cancel button
//5. After the apply button is hit, the BE should be updated
//6. Add in a X out button to close the window and not save anything

import { useUI } from "@/src/context/UIContext";

const EditPopup = () => {
  const { setActiveGroupEditing } = useUI();

  return (
    <div className="fixed inset-0 top-[10vh] z-40 flex items-center justify-center">
      <div
        className="w-[75vw] h-[60vh] border-4 border-red-500 rounded-xl shadow-2xl"
        style={{
          backgroundColor: "var(--card-bg)",
        }}
      >
        <div className="relative flex items-center justify-center ">
          <input className="text-center mt-3" placeholder="test"></input>
          <button
            className="absolute right-2 text-lg font-bold p-1 mt-3 mr-2 cursor-pointer"
            onClick={() => setActiveGroupEditing(false)}
          >
            X
          </button>
        </div>
        {/* Placeholder text just to identify the box */}
        <div className="flex items-center justify-center h-full text-red-500 font-bold text-4xl opacity-50">
          POPUP AREA
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
