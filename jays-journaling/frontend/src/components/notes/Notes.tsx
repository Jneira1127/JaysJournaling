import NoteBox from "./NoteBox";
import DeleteNoteControls from "./DeleteButton/DeleteNoteControls";
import { page } from "@/src/app/page";
import GroupNoteButton from "./GroupingButton/GroupNoteButton";

type NotesProps = {
  buttonColor?: string;
  deleteSelectedNotes: () => void;
  deleteSingleNote: (id: number) => void;
  groupSelectedNotes: () => void;
  journal: page[];
  setVisibleDelete: (value: boolean) => void;
  setVisibleGrouping: (value: boolean) => void;
  toggleSelect: (id: number) => void;
  visibleDelete: boolean;
  visibleGrouping: boolean;
};

const Notes = ({
  buttonColor,
  deleteSelectedNotes,
  deleteSingleNote,
  groupSelectedNotes,
  journal,
  setVisibleDelete,
  setVisibleGrouping,
  toggleSelect,
  visibleDelete,
  visibleGrouping,
}: NotesProps) => {
  return (
    <div className="flex flex-1 overflow-y-auto min-w-0 bg-[#D10000]">
      <div className="flex flex-wrap gap-4 p-4 flex-1 content-start justify-center transition-all duration-1000 ease-in-out">
        <DeleteNoteControls
          variant="bulk"
          notes={journal}
          onDeleteSelected={deleteSelectedNotes}
          onToggleSelectMode={() => setVisibleDelete(false)}
          isSelectMode={visibleDelete}
        />

        <GroupNoteButton
          buttonColor={buttonColor}
          notes={journal}
          onGroupSelected={groupSelectedNotes}
          onToggleSelectMode={() => setVisibleGrouping(false)}
          isSelectMode={visibleGrouping}
        />

        {journal.map((note) => (
          <NoteBox
            key={note.id}
            note={note}
            visibleDelete={visibleDelete}
            visibleGrouping={visibleGrouping}
            onDelete={deleteSingleNote}
            onToggleSelect={toggleSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default Notes;
