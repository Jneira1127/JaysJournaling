"use client";
import { useUI } from "@/src/context/UIContext";
import AddNoteButton from "./AddNoteIcon";
import GroupedNotesButton from "./GroupNotesIcon";
import FilterNotesButton from "./FilterNotesIcon";
import DeleteNoteButton from "../../notes/DeleteButton/DeleteNoteIcon";
import GroupSidebar from "./GroupSidebar";

const Sidebar = () => {
  const {
    activeActions,
    activeSorting,
    closeAllSidebars,
    openBurger,
    openGroups,
    setActiveActions,
    setActiveSorting,
    setOpenGroups,
    setVisibleDelete,
    sidebarRef,
  } = useUI();

  const handleGroupClick = () => {
    if (!openGroups) {
      // If closed, open it in Group mode
      setActiveActions(true);
      setActiveSorting(false);
      setOpenGroups(true);
    } else if (activeSorting) {
      // If open but in Filter mode, switch to Group mode stay open
      setActiveActions(true);
      setActiveSorting(false);
    } else setOpenGroups(false);
  };

  const handleFilterClick = () => {
    if (!openGroups) {
      // If closed, open it in Filter mode
      setActiveActions(false);
      setActiveSorting(true);
      setOpenGroups(true);
    } else if (activeActions) {
      // If open but in Group mode, switch to Filter mode and stay open
      setActiveActions(false);
      setActiveSorting(true);
    } else setOpenGroups(false);
  };

  return (
    <div className="flex overflow-hidden" ref={sidebarRef}>
      <div
        className={`${openBurger ? "w-[15vw]" : "w-0"} overflow-hidden flex flex-col h-[90vh] shadow-xl transition-all duration-250 ease-in-out bg-sidebar border-r-4 border-sidebar-border`}
      >
        <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-12 p-4">
          <AddNoteButton />
          <DeleteNoteButton
            onClick={() => {
              closeAllSidebars();
              setVisibleDelete(true);
            }}
          />
          <GroupedNotesButton onClick={handleGroupClick} />
          <FilterNotesButton onClick={handleFilterClick} />
        </div>
      </div>
      <GroupSidebar />
    </div>
  );
};

export default Sidebar;
