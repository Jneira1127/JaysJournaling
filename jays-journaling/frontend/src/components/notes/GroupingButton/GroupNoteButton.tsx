import { page } from "@/src/app/page";

type GroupNoteButtonProps = {
  buttonColor?: string;
  isSelectMode: boolean;
  notes: page[];
  onGroupSelected: () => void;
  onToggleSelectMode: () => void;
};

const GroupNoteButton = ({
  buttonColor,
  isSelectMode,
  notes,
  onGroupSelected,
  onToggleSelectMode,
}: GroupNoteButtonProps) => {
  console.log("Current Button Color:", buttonColor);

  const selectedCount = notes.filter((n) => n.isSelected).length;

  const handleGroupSelected = () => {
    if (selectedCount === 0) return; // guard
    onGroupSelected();
    onToggleSelectMode();
  };

  return (
    <div
      className={` fixed bottom-10 flex justify-center z-50 w-full overflow-hidden transition-all duration-300 ease-in-out ${
        isSelectMode ? "max-h-20" : "max-h-0"
      }`}
    >
      <button
        style={{ backgroundColor: buttonColor }}
        onClick={handleGroupSelected}
        disabled={selectedCount === 0}
        className={`
    pointer-events-auto cursor-pointer w-48 h-12 text-white rounded-full 
    border-black border-2 transition-all duration-200
    ${selectedCount === 0 ? "opacity-100 " : "opacity-100 hover:brightness-110 active:scale-95"}
  `}
      >
        {selectedCount === 0
          ? "Select notes to Group"
          : `notes(${selectedCount})`}
      </button>
    </div>
  );
};

export default GroupNoteButton;
