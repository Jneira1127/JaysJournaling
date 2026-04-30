import Link from "next/link";
import { page } from "@/src/app/page";

const NoteBox = ({ note }: { note: page }) => {
  return (
    <Link
      href={`/note/${note.id}`}
      className="w-67 h-67 bg-white rounded-lg overflow-hidden mt-4 ml-4 cursor-pointer border-3 border-black drop-shadow-lg"
    >
      <div className="flex justify-center items-center h-5 rounded-lg h-50 text-black ">
        <p className="text-sm line-clamp-8 p-2">
          {note.text || "Empty page..."}
        </p>
      </div>
      <div className="flex justify-center items-center border-black h-16 rounded-sm text-black bg-gray-500">
        {note.label}
      </div>
    </Link>
  );
};

export default NoteBox;
