const NoteBox = () => {
  return (
    <div className="w-67 h-67 bg-white rounded-lg mt-4 ml-4 cursor-pointer">
      <div className="flex justify-center items-center border-3 border-black h-5 rounded-lg h-50 text-black">Clickable Note</div>
      <div className="flex justify-center items-center border-black h-5 rounded-sm h-17 text-black">
        Note Title
      </div>
    </div>
  );
};

export default NoteBox;
