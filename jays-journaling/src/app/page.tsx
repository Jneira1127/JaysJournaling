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
  groupColor?: string | null;
  groupId?: number | null;
};

export type Group = {
  id: number;
  name: string;
  notes: page[];
  color: string;
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

const initialGroups: Group[] = [
  { id: 1, name: "personal", notes: [], color: "#FF746C" },
  { id: 2, name: "professional", notes: [], color: "#82C8E5" },
  { id: 3, name: "misc", notes: [], color: "#FFBF00" },
];

export default function Home() {
  const [journal, setJournal] = useState<page[]>(initialJournals);
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleGrouping, setVisibleGrouping] = useState(false);
  const [openBurger, setOpenBurger] = useState(false);
  const [openGroups, setOpenGroups] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
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

  const handleGroupClick = (groupId: number) => {
    console.log("Setting selected group to:", groupId);
    setSelectedGroup(groupId);
  };

  const handleConfirmGroup = () => groupSelectedNotes();

  const activeGroupColor = groups.find((g) => g.id == selectedGroup)?.color;

  const groupSelectedNotes = () => {
    const targetGroup = groups.find((g) => g.id === selectedGroup);
    const colorToApply = targetGroup ? targetGroup.color : "#9ca3af";
    const selectedNotes = journal.filter((note) => note.isSelected);

    //here for debugging purposes
    console.log(
      "Updating group ID:",
      selectedGroup,
      "with notes:",
      selectedNotes,
    );

    setGroups((prev) =>
      prev.map((g) =>
        g.id === selectedGroup
          ? {
              ...g,
              notes: [
                ...g.notes,
                ...selectedNotes.filter(
                  (note) => !g.notes.some((n) => n.id === note.id),
                ),
              ],
            }
          : g,
      ),
    );

    setJournal((prev) =>
      prev.map((note) => {
        if (note.isSelected) {
          return {
            ...note,
            isSelected: false,
            groupColor: colorToApply,
          };
        }
        return note;
      }),
    );
    setVisibleGrouping(false);
    setSelectedGroup(null);
  };

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
    <div className="flex flex-col w-screen h-screen font-sans">
      <Header
        burgerRef={burgerRef}
        handleCloseBurger={handleCloseBurger}
        handleOpenBurger={setOpenBurger}
        openBurger={openBurger}
      />
      <div className="flex flex-1 w-full overflow-hidden">
        <Sidebar
          dropdownRef={dropdownRef}
          groups={groups}
          groupsRef={groupsRef}
          handleGroupClick={handleGroupClick}
          // handleConfirmGroup={handleConfirmGroup}
          handleCloseBurger={handleCloseBurger}
          journal={journal}
          openBurger={openBurger}
          openGroups={openGroups}
          setOpenGroups={setOpenGroups}
          setJournal={setJournal}
          setVisibleDelete={setVisibleDelete}
          setVisibleGrouping={setVisibleGrouping}
          visibleDelete={visibleDelete}
          visibleGrouping={visibleGrouping}
        />
        <Notes
          buttonColor={activeGroupColor}
          deleteSelectedNotes={deleteSelectedNotes}
          deleteSingleNote={deleteSingleNote}
          groupSelectedNotes={groupSelectedNotes}
          journal={journal}
          setVisibleDelete={setVisibleDelete}
          setVisibleGrouping={setVisibleGrouping}
          toggleSelect={toggleSelect}
          visibleDelete={visibleDelete}
          visibleGrouping={visibleGrouping}
        />
      </div>
    </div>
  );
}
