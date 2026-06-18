"use client";
import { useJournal } from "@/src/context/JournalContext";
import { useUI } from "@/src/context/UIContext";
import NoteBox from "./NoteBox/NoteBox";
import DeleteNoteControls from "./DeleteButton/DeleteNoteControls";
import GroupNoteButton from "./GroupingButton/GroupNoteButton";

const Notes = () => {
  const { notes } = useJournal();

  return (
    <div className="flex flex-1 overflow-y-auto min-w-0 bg-main-bg">
      <div className="flex flex-wrap gap-4 p-4 flex-1 content-start justify-center transition-all duration-1000">
        <DeleteNoteControls />
        <GroupNoteButton />

        {notes.map((note) => (
          <NoteBox key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default Notes;
