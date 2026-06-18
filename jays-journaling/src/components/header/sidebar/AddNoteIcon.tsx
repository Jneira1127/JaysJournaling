import { useJournal } from "@/src/context/JournalContext";
import { NoteAdd } from "@mui/icons-material";

const AddNoteButton = () => {
  const { addNote } = useJournal();
  return (
    <div>
      <button
        onClick={addNote}
        className="flex items-center justify-center w-25 h-25 bg-white rounded-lg text-gray-400 text-9xl cursor-pointer hover:opacity-85  drop-shadow-lg"
        style={{ background: "var(--sidebar-icon-bg)" }}
      >
        <NoteAdd sx={{ fontSize: 85, color: "var(--sidebar-icon)" }} />
      </button>
      <p
        className="font-rubik text-center mt-1 text-lg text-white font-medium"
        style={{ color: "var(--text-main)" }}
      >
        ADD NOTE
      </p>
    </div>
  );
};

export default AddNoteButton;
