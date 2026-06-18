"use client";
import { useJournal } from "@/src/context/JournalContext";
import { useUI } from "@/src/context/UIContext";

const DeleteNoteControls = () => {
  const { notes, deleteSelectedNotes } = useJournal();
  const { visibleDelete, setVisibleDelete } = useUI();

  if (!visibleDelete) return null;

  const selectedCount = notes.filter((n) => n.isSelected).length;

  const handleConfirm = async () => {
    await deleteSelectedNotes();
    setVisibleDelete(false);
  };

  return (
    <div className="fixed bottom-10 flex justify-center z-50 w-full animate-bounce">
      <button
        onClick={handleConfirm}
        disabled={selectedCount === 0}
        className="cursor-pointer px-10 h-12 rounded-full border-2 hover:bg-red-400 disabled:bg-gray-400"
        style={{
          borderColor: "var(--text-header)",
          background: "var(--header-bg)",
          color: "var(--text-header)",
        }}
      >
        {selectedCount === 0
          ? "Select notes to delete"
          : `Delete (${selectedCount})`}
      </button>
      <button
        onClick={() => setVisibleDelete(false)}
        className="ml-2 px-4 h-12 rounded-full border-2 cursor-pointer"
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

export default DeleteNoteControls;
