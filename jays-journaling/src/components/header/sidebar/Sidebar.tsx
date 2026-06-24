"use client";
import { useUI } from "@/src/context/UIContext";
import AddNoteButton from "./AddNoteIcon";
import GroupedNotesButton from "./GroupNotesIcon";
import FilterNotesButton from "./FilterNotesIcon";
import DeleteNoteButton from "../../notes/DeleteButton/DeleteNoteIcon";
import GroupSidebar from "./GroupSidebar";

const Sidebar = () => {
  const {
    openBurger,
    openGroups,
    setActiveActions,
    setActiveSorting,
    setOpenGroups,
    setVisibleDelete,
    sidebarRef,
  } = useUI();

  return (
    <div className="flex overflow-hidden" ref={sidebarRef}>
      <div
        className={`${openBurger ? "w-[15vw]" : "w-0"} overflow-hidden flex flex-col h-[90vh] shadow-xl transition-all duration-250 ease-in-out bg-sidebar border-r-4 border-sidebar-border`}
      >
        <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-12 p-4">
          <AddNoteButton />
          <DeleteNoteButton onClick={() => setVisibleDelete(true)} />
          <GroupedNotesButton
            onClick={() => {
              setActiveActions(true);
              setActiveSorting(false);
              setOpenGroups(!openGroups);
            }}
          />
          <FilterNotesButton
            onClick={() => {
              setActiveActions(false);
              setActiveSorting(true);
              setOpenGroups(!openGroups);
            }}
          />
        </div>
      </div>
      <GroupSidebar />
    </div>
  );
};

export default Sidebar;
