import { page } from "@/src/app/page";
import {
  Bookmark,
  CheckCircle,
  Ellipses,
  UncheckCircle,
} from "../material-ui-components";
import DropdownItem from "../notes/Dropdown/DropdownItems";
import { useState } from "react";
import { useRouter } from "next/navigation";

const NoteBox = ({
  note,
  visibleDelete,
  onDelete,
  onToggleSelect,
}: {
  note: page;
  visibleDelete: boolean;
  onDelete: (id: number) => void;
  onToggleSelect: (id: number) => void;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div
      onClick={() => {
        if (visibleDelete) {
          onToggleSelect(note.id);
        } else {
          router.push(`/note/${note.id}`);
        }
      }}
      className="group w-67 h-67 bg-white rounded-lg overflow-hidden mt-4 ml-4 cursor-pointer border-3 border-black drop-shadow-lg"
    >
      {visibleDelete && (
        <div
          className="absolute top-2 right-2 flex gap-1"
          onClick={(e) => {
            e.stopPropagation();
            setIsChecked(!isChecked);
          }}
        >
          {note.isSelected ? (
            <CheckCircle sx={{ color: "skyblue" }} />
          ) : (
            <UncheckCircle sx={{ color: "skyblue" }} />
          )}
        </div>
      )}

      <div className="flex justify-center items-center h-5 rounded-lg h-50 text-black pt-5 ">
        <p className="text-sm line-clamp-8 pl-2 pr-2">
          {note.text || "Empty page..."}
        </p>
      </div>

      <div className="relative flex justify-center items-center border-black h-20 pb-4 rounded-sm text-black bg-gray-500">
        <div className="absolute left-0 top-0 bottom-0 flex items-stretch h-full">
          <Bookmark/>
        </div>

        {note.label}
        <div className="absolute right-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen((prev) => !prev);
            }}
          >
            <Ellipses
              className="opacity-0 transition-opacity duration-450 group-hover:opacity-60"
              sx={{ width: 30, height: 50 }}
            />
          </button>

          {isOpen && (
            <div className="absolute right-0 bottom-full mb-1 w-36 bg-white border border-gray-200 rounded shadow-lg origin-bottom-right animate-[scaleIn_500ms_ease-out]">
              <DropdownItem
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(note.id);
                  setIsOpen(false);
                }}
              >
                DELETE NOTE
              </DropdownItem>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteBox;
