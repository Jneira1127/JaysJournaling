const AddNoteButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-39 h-39 bg-white rounded-lg text-gray-400 text-9xl cursor-pointer"
    >
      +
    </button>
  );
};

export default AddNoteButton;
