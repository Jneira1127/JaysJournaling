import Link from "next/link";
import { page } from "@/src/app/page";
import { CheckCircle, UncheckCircle } from "../material-ui-components";
import { useState } from "react";

const NoteBox = ({
  note,
  visibleDelete,
}: {
  note: page;
  visibleDelete: boolean;
}) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Link
      href={`/note/${note.id}`}
      className="w-67 h-67 bg-white rounded-lg overflow-hidden mt-4 ml-4 cursor-pointer border-3 border-black drop-shadow-lg"
    >
      {visibleDelete && (
        <div
          className="absolute top-2 right-2 flex gap-1"
          onClick={() => setIsChecked(!isChecked)}
        >
          <CheckCircle sx={{ color: "skyblue" }} />
          <UncheckCircle sx={{ color: "skyblue" }} />
        </div>
      )}

      <div className="flex justify-center items-center h-5 rounded-lg h-50 text-black pt-5 ">
        <p className="text-sm line-clamp-8 pl-2 pr-2">
          {note.text || "Empty page..."}
        </p>
      </div>

      <div className="flex justify-center items-center border-black h-20 pb-4 rounded-sm text-black bg-gray-500">
        {note.label}
      </div>
    </Link>
  );
};

export default NoteBox;
