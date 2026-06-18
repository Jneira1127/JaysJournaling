"use client";
import { useJournal } from "@/src/context/JournalContext";
import { useUI } from "@/src/context/UIContext";
import { useState } from "react";

const GroupSidebar = () => {
  const { groups } = useJournal();
  const {
    openBurger,
    openGroups,
    setVisibleGrouping,
    setSelectedGroupId,
    closeAllSidebars,
    isAddingGroup,
  } = useUI();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  if (!openBurger || !openGroups) return <div className="w-0" />;

  return (
    <div className="w-[15vw] flex flex-col h-[90vh] shadow-xl transition-all bg-sidebar border-r-4 border-sidebar-border text-text-main">
      <div className="flex flex-col items-center overflow-hidden">
        {groups.map((group) => (
          <div
            key={group.id}
            onMouseEnter={() => setHoveredId(group.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => {
              setSelectedGroupId(group.id);
              setVisibleGrouping(true);
              closeAllSidebars();
            }}
            className="font-rubik text-xl border-b-2 w-full text-center pt-3 pb-3 cursor-pointer hover:bg-sidebar-group-hover-bg"
          >
            {group.name.toUpperCase()} NOTES
          </div>
        ))}

        {isAddingGroup && (
          <button className="font-rubik text-xl border-b-2 w-full text-center pt-3 pb-3 hover:bg-sidebar-group-hover-bg cursor-pointer">
            ADD GROUP +
          </button>
        )}
      </div>
    </div>
  );
};

export default GroupSidebar;
