import { TrashCan } from "../../material-ui-components";

const DeleteNoteButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="flex items-center justify-center w-25 h-25 bg-white rounded-lg text-gray-400 text-9xl cursor-pointer"
      >
        <TrashCan sx={{ fontSize: 85 }} />
      </button>
      <p className="text-center mt-1 text-lg text-white font-medium">DELETE</p>
    </div>
  );
};

export default DeleteNoteButton;
