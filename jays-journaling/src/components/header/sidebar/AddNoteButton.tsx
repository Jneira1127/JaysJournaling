import { NoteAdd } from "../../material-ui-components";

const AddNoteButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="flex items-center justify-center w-25 h-25 bg-white rounded-lg text-gray-400 text-9xl cursor-pointer hover:opacity-85  drop-shadow-lg"
      >
        <NoteAdd sx={{ fontSize: 85 }} />
      </button>
      <p className="text-center mt-1 text-lg text-white font-medium">ADD NOTE</p>
    </div>
  );
};

export default AddNoteButton;
