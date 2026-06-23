"use client";
import { useJournal } from "@/src/context/JournalContext";
import { useUI } from "@/src/context/UIContext";
import { input } from "framer-motion/client";
import { useState } from "react";

const GroupSidebar = () => {
  const { addGroup, groups } = useJournal();
  const {
    closeAllSidebars,
    isAddingGroup,
    openBurger,
    openGroups,
    pendingGroupName,
    setPendingGroupName,
    setSelectedGroupId,
    setVisibleGrouping,
  } = useUI();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [editingGroupName, setEditingGroupName] = useState(false);

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

        {editingGroupName ? (
          <input
            // 1. Same font, size, and padding as the group items
            className="font-rubik text-xl border-b-2 border-sidebar-border w-full text-center pt-3 pb-3 
               bg-transparent text-text-main uppercase outline-none placeholder:opacity-50"
            maxLength={10}
            // 2. Add placeholder so it doesn't look empty
            placeholder="NAME"
            // 3. AutoFocus so the user can start typing immediately
            autoFocus
            onChange={(e) => setPendingGroupName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addGroup(pendingGroupName);
                setEditingGroupName(false);
                setPendingGroupName("");
              }
              // Optional: Allow Esc to cancel
              if (e.key === "Escape") {
                setEditingGroupName(false);
                setPendingGroupName("");
              }
            }}
            value={pendingGroupName}
          />
        ) : null}

        {isAddingGroup && (
          <button
            className="font-rubik text-xl border-b-2 w-full text-center pt-3 pb-3 hover:bg-sidebar-group-hover-bg cursor-pointer"
            onClick={() => setEditingGroupName(true)}
          >
            ADD GROUP +
          </button>
        )}
      </div>
    </div>
  );
};

export default GroupSidebar;
