"use client";
import { useJournal } from "@/src/context/JournalContext";
import { useUI } from "@/src/context/UIContext";

const GroupNoteButton = () => {
  const { notes, groups, groupSelectedNotes } = useJournal();
  const { visibleGrouping, setVisibleGrouping, selectedGroupId } = useUI();

  if (!visibleGrouping || selectedGroupId === null) return null;

  const targetGroup = groups.find((g) => g.id === selectedGroupId);
  const selectedCount = notes.filter((n) => n.isSelected).length;

  const handleGroup = async () => {
    await groupSelectedNotes(selectedGroupId);
    setVisibleGrouping(false);
  };

  return (
    <div className="fixed bottom-10 flex justify-center z-50 w-full">
      <button
        style={{ backgroundColor: targetGroup?.color }}
        onClick={handleGroup}
        disabled={selectedCount === 0}
        className="cursor-pointer px-10 h-12 text-white rounded-full border-black border-2 shadow-2xl"
      >
        {selectedCount === 0
          ? "Select notes"
          : `Add ${selectedCount} to ${targetGroup?.name}`}
      </button>
      <button
        onClick={() => setVisibleGrouping(false)}
        className="ml-2 px-4 rounded-full border-2"
        style={{
          borderColor: "var(--header-bg)",
          background: "var(--text-header)",
          color: "var(--header-bg)",
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default GroupNoteButton;
