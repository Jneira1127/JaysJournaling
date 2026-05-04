"use client";
import NoteBox from "../components/notes/NoteBox";
import Header from "../components/header/Header";
import AddNoteButton from "../components/header/sidebar/AddNoteButton";
import GroupedNotesButton from "../components/header/sidebar/GroupNotesButton";
import DeleteNoteButton from "../components/header/sidebar/DeleteNoteButton";
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
];

export default function Home() {
  const [journal, setJournal] = useState<page[]>(initialJournals);
  const [openBurger, setOpenBurger] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);

  const handleAdd = () => {
    const newJournal: page = {
      id: journal.length ? Math.max(...journal.map((j) => j.id)) + 1 : 1,
      label: "Untitled",
      text: "",
      isSelected: false,
    };
    setJournal((prev) => [...prev, newJournal]);
  };

  const handleCloseBurger = () => {
    setIsClosing(true); // trigger closing animation
    setTimeout(() => {
      setOpenBurger(false);
      setIsClosing(false);
    }, 250); // match your animation duration
  };

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
              onClick={() => setVisibleDelete(!visibleDelete)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 p-4 flex-1 content-start justify-center transition-all duration-1000 ease-in-out">
          <div
            className={`flex justify-center w-full overflow-hidden transition-all duration-300 ease-in-out ${visibleDelete ? "max-h-24" : "max-h-0"}`}
          >
            <button className="w-40 h-20 bg-sky-400 border-black border-3 rounded-lg cursor-pointer">
              Delete Notes
            </button>
          </div>
          {journal.map((note) => (
            <NoteBox key={note.id} note={note} visibleDelete={visibleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}
