"use client";
import NoteBox from "../components/notes/NoteBox";
import Header from "../components/header/Header";
import { useState } from "react";

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
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  return (
    <div className="flex flex-col flex-1 min-w-5 items-center justify-center font-sans">
      <Header
        handleJournal={setJournal}
        journal={journal}
        deleteButton={setShowDeleteButton}
      />

      <div className="flex flex-col items-center min-h-[100vh] border-5 border-black min-w-[100vw] bg-[#D10000] ">
        {showDeleteButton && (
          <button className="border-2 border-black h-15 pl-5 pr-5 cursor-pointer border-3 bg-[#82C8E5] mt-3 rounded-lg">
            Delete Notes
          </button>
        )}

        <div className="flex flex-wrap justify-center content-baseline flex-start">
          {journal.map((note) => (
            <NoteBox key={note.id} note={note} />
          ))}
        </div>
      </div>
    </div>
  );
}
