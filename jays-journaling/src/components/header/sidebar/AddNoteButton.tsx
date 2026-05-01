import { NoteAdd } from "../../material-ui-components";
import { Dispatch, SetStateAction } from "react";

// 1. Define the shape of your data object
export interface JournalEntry {
  id: number;
  label: string;
  text: string;
  isSelected: boolean;
}

// 2. Define the props for this button
interface pages {
  pages: JournalEntry[]; // The list of notes
  handleJournal: Dispatch<SetStateAction<JournalEntry[]>>; // The useState setter
}

const AddNoteButton = ({ pages, handleJournal }: pages) => {
  const handleAdd = () => {
    const newJournal: JournalEntry = {
      id: pages.length ? Math.max(...pages.map((j) => j.id)) + 1 : 1,
      label: "Untitled",
      text: "",
      isSelected: false,
    };
    handleJournal((prev) => [...prev, newJournal]);
  };

  return (
    <div>
      <button
        onClick={handleAdd}
        className="flex items-center justify-center w-25 h-25 bg-white rounded-lg text-gray-400 text-9xl cursor-pointer hover:opacity-85  drop-shadow-lg"
      >
        <NoteAdd sx={{ fontSize: 85 }} />
      </button>
      <p className="text-center mt-1 text-lg text-white font-medium">
        ADD NOTE
      </p>
    </div>
  );
};

export default AddNoteButton;
