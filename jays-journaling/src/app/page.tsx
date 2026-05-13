"use client";
import Header from "../components/header/Header";
import Sidebar from "../components/header/sidebar/Sidebar";
import { useEffect, useRef, useState } from "react";
import Notes from "../components/notes/Notes";

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

const Groups = {
  Personal: [],
  Professional: [],
  Misc: [],
};

export default function Home() {
  const [journal, setJournal] = useState<page[]>(initialJournals);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [openBurger, setOpenBurger] = useState(false);
  const [openGroups, setOpenGroups] = useState(false);
  const burgerRef = useRef<HTMLDivElement | null>(null);
  const groupsRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleCloseBurger = () => {
    setOpenBurger(false);
    setOpenGroups(false);
  };

  const toggleSelect = (id: number) => {
    setJournal((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, isSelected: !note.isSelected } : note,
      ),
    );
  };

  const deleteSingleNote = (id: number) =>
    setJournal((prev) => prev.filter((note) => note.id !== id));

  const deleteSelectedNotes = () =>
    setJournal((prev) => prev.filter((page) => !page.isSelected));

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!openBurger) return; // do nothing if sidebar is already closed

      const clickedOutsidePrimary =
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node);
      const clickedOutsideGroups =
        groupsRef.current && !groupsRef.current.contains(e.target as Node);
      const clickedOutsideBurger =
        burgerRef.current && !burgerRef.current.contains(e.target as Node);

      if (
        clickedOutsidePrimary &&
        clickedOutsideGroups &&
        clickedOutsideBurger
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
        burgerRef={burgerRef}
        handleCloseBurger={handleCloseBurger}
        handleOpenBurger={setOpenBurger}
        openBurger={openBurger}
      />
      <Sidebar
        dropdownRef={dropdownRef}
        groups={Groups}
        groupsRef={groupsRef}
        handleCloseBurger={handleCloseBurger}
        journal={journal}
        openBurger={openBurger}
        openGroups={openGroups}
        setOpenGroups={setOpenGroups}
        setJournal={setJournal}
        setVisibleDelete={setVisibleDelete}
        visibleDelete={visibleDelete}
      />
      <Notes
        deleteSelectedNotes={deleteSelectedNotes}
        deleteSingleNote={deleteSingleNote}
        journal={journal}
        setVisibleDelete={setVisibleDelete}
        toggleSelect={toggleSelect}
        visibleDelete={visibleDelete}
      />
    </div>
  );
}
