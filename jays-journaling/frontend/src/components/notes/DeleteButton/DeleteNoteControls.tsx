import { page } from "@/src/app/page";

type DeleteControlProps =
  | {
      variant: "single";
      noteId: number;
      onDelete: (id: number) => void;
    }
  | {
      variant: "bulk";
      notes: page[];
      onDeleteSelected: () => void;
      onToggleSelectMode: () => void;
      isSelectMode: boolean;
    };

const DeleteNoteControls = (props: DeleteControlProps) => {
  if (props.variant === "single") {
    return (
      <button
        onClick={() => props.onDelete(props.noteId)}
        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
      >
        Delete Note
      </button>
    );
  }

  const selectedCount = props.notes.filter((n) => n.isSelected).length;

  const handleDeleteSelected = () => {
    if (selectedCount === 0) return; // guard
    props.onDeleteSelected();
    props.onToggleSelectMode();
  };

  return (
    <div
      className={` fixed bottom-10 flex justify-center z-50 w-full overflow-hidden transition-all duration-300 ease-in-out ${
        props.isSelectMode ? "max-h-20" : "max-h-0"
      }`}
    >
      <button
        onClick={handleDeleteSelected}
        disabled={selectedCount === 0}
        className="pointer-events-auto cursor-pointer w-50 h-12 bg-sky-500 text-white rounded-full border-black border-3 hover:bg-sky-400"
      >
        {selectedCount === 0
          ? "Select notes to delete"
          : `Delete (${selectedCount})`}
      </button>
    </div>
  );
};

export default DeleteNoteControls;
