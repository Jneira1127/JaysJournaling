"use client";
import { NoteType } from "@/src/app/types";
import { useJournal } from "@/src/context/JournalContext";
import { useUI } from "@/src/context/UIContext";
import {
  CheckCircle,
  UncheckCircle,
  Ellipses,
} from "../../material-ui-components";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import DropdownItem from "../Dropdown/DropdownItems";

const NoteBox = ({ note }: { note: NoteType }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleNoteSelection, deleteSingleNote } = useJournal();
  const { visibleDelete, visibleGrouping } = useUI();
  const ellipsesRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();

  const handleBoxClick = () => {
    if (visibleDelete || visibleGrouping) {
      toggleNoteSelection(note.id);
    } else {
      router.push(`/note/${note.id}`);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ellipsesRef && !ellipsesRef.current?.contains(event.target as Node))
        setIsMenuOpen(false);
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isMenuOpen]);

  return (
    <div
      onClick={handleBoxClick}
      className="group w-64 h-64 rounded-lg overflow-hidden cursor-pointer border-3 shadow-lg relative bg-card border-note-border"
    >
      {(visibleDelete || visibleGrouping) && (
        <div className="absolute top-2 right-2 z-10">
          {note.isSelected ? (
            <CheckCircle sx={{ color: "skyblue" }} />
          ) : (
            <UncheckCircle sx={{ color: "skyblue" }} />
          )}
        </div>
      )}

      <div className="h-44 flex items-center justify-center p-4 text-text-card overflow-hidden">
        <p className="flex text-center justify-center text-sm line-clamp-6">
          {note.text.slice(0, 303) || "Empty Page"}
        </p>
      </div>

      <div
        className="h-20 flex items-center justify-center relative text-note-label-txt"
        style={{ background: note.groupColor || "var(--card-footer)" }}
      >
        <span className="font-bold">{note.label}</span>

        <button
          className="absolute right-2 opacity-0 group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          ref={ellipsesRef}
        >
          <Ellipses />
        </button>

        {isMenuOpen && (
          <div
            className="absolute right-0 bottom-full bg-white shadow-xl z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownItem
              onClick={(e) => {
                e.stopPropagation();
                deleteSingleNote(note.id);
              }}
            >
              DELETE
            </DropdownItem>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteBox;
