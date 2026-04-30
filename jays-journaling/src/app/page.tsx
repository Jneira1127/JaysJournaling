"use client";
import NoteBox from "../components/notes/NoteBox";
import Header from "../components/header/Header";
import { useState } from "react";

export type page = { id: number; label: string; text: string };

const initialJournals: page[] = [
  { id: 1, label: "Jays Note", text: "this is Jays note" },
  {
    id: 2,
    label: "Lorem Ipsum",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  { id: 3, label: "Untitled", text: "" },
];

export default function Home() {
  const [journals, setJournals] = useState<page[]>(initialJournals);

  const handleAdd = () => {
    const newJournal: page = {
      id: journals.length ? Math.max(...journals.map((j) => j.id)) + 1 : 1,
      label: "Untitled",
      text: "",
    };
    setJournals((prev) => [...prev, newJournal]);
  };

  return (
    <div className="flex flex-col flex-1 min-w-5 items-center justify-center font-sans">
      <Header onClick={handleAdd} />

      <div className="flex flex-wrap min-h-[100vh] min-w-[100vw] content-baseline flex-start row-gap-4 bg-[#D10000] justify-center rounded-lg">
        {journals.map((note) => (
          <NoteBox key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
