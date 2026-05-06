"use client";
import NoteBox from "../components/notes/NoteBox";
import Header from "../components/header/Header";
import AddNoteButton from "../components/header/sidebar/AddNoteIcon";
import GroupedNotesButton from "../components/header/sidebar/GroupNotesIcon";
import DeleteNoteButton from "../components/header/sidebar/DeleteButton/DeleteNoteIcon";
import DeleteNoteControls from "../components/header/sidebar/DeleteButton/DeleteNoteControls";
import { useEffect, useRef, useState } from "react";

export type page = {
  id: number;
  label: string;
  text: string;
  isSelected: boolean;
};

const initialJournals: page[] = [
  { id: 1, label: "Jays Note", text: "this is Jays note", isSelected: false },
  {
    id: 2,
    label: "Lorem Ipsum",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    isSelected: false,
  },
  { id: 3, label: "Untitled", text: "", isSelected: false },
  {
    id: 4,
    label: "sfafsad",
    text: "a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a",
    isSelected: false,
  },
];

export default function Home() {
  const [journal, setJournal] = useState<page[]>(initialJournals);
  const [openBurger, setOpenBurger] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);

  const handleCloseBurger = () => {
    setIsClosing(!isClosing); // trigger closing animation
    setTimeout(() => {
      setOpenBurger(false);
      setIsClosing(!isClosing);
    }, 250); // match your animation duration
  };

  const toggleSelect = (id: number) => {
    setJournal((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, isSelected: !note.isSelected } : note,
      ),
    );
  };

  const deleteSelectedNotes = () => {
    setJournal((prev) =>
      prev
        .filter((note) => !note.isSelected)
        .map((note) => ({ ...note, isSelected: false })),
    );
    setVisibleDelete(false);
  };

  const deleteSingleNote = (id: number) =>
    setJournal((prev) => prev.filter((note) => note.id !== id));

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        openBurger &&
        dropdownRef.current &&
        burgerRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !burgerRef.current.contains(e.target as Node)
      ) {
        handleCloseBurger();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openBurger]);

  return (
    <div className="flex flex-col flex-1 w-[100vw] h-[100vh] items-center justify-center font-sans">
      <Header
        handleCloseBurger={handleCloseBurger}
        handleOpenBurger={setOpenBurger}
        openBurger={openBurger}
        burgerRef={burgerRef}
      />

      <div className="flex flex-1 min-w-[100vw] bg-[#D10000]">
        <div
          ref={dropdownRef}
          className={`${openBurger ? "w-[15vw] slide-right" : "w-[0] slide-left"} flex flex-col min-h-full bg-[#FF746C] shadow-xl transition-all duration-250 ease-in-out`}
        >
          <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-20 p-4 pb-24 border-r-4 border-gray-400">
            <AddNoteButton pages={journal} handleJournal={setJournal} />
            <GroupedNotesButton
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
            <DeleteNoteButton
              onClick={() => {
                setVisibleDelete(!visibleDelete);
                handleCloseBurger();
              }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 p-4 flex-1 content-start justify-center transition-all duration-1000 ease-in-out">
          <DeleteNoteControls
            variant="bulk"
            notes={journal}
            onDeleteSelected={deleteSelectedNotes}
            onToggleSelectMode={() => setVisibleDelete(false)}
            isSelectMode={visibleDelete}
          />

          {journal.map((note) => (
            <NoteBox
              key={note.id}
              note={note}
              visibleDelete={visibleDelete}
              onDelete={deleteSingleNote}
              onToggleSelect={toggleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
