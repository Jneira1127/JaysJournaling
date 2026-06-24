"use client";
import { useJournal } from "@/src/context/JournalContext";
import { useUI } from "@/src/context/UIContext";
import { useRef } from "react";
import { Ellipses } from "../../material-ui-components";
import { useState } from "react";
import DropdownItem from "../../notes/Dropdown/DropdownItems";

const GroupSidebar = () => {
  const { addGroup, groups } = useJournal();
  const {
    activeActions,
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ellipsesRef = useRef<HTMLButtonElement | null>(null);

  if (!openBurger || !openGroups) return <div className="w-0" />;

  return (
    <div className="w-[15vw] flex flex-col max-h-[90vh] shadow-xl transition-all bg-sidebar border-r-4 border-sidebar-border text-text-main overflow-hidden">
      {/* Scrollable groups section */}
      <div className="flex flex-col items-center overflow-y-auto flex-1 min-h-0">
        {groups.map((group) => (
          <div
            key={group.id}
            onMouseEnter={() => setHoveredId(group.id)}
            onMouseLeave={() => {
              setHoveredId(null);
              setIsMenuOpen(false); // close menu when leaving row
            }}
            onClick={() => {
              setSelectedGroupId(group.id);
              setVisibleGrouping(true);
              closeAllSidebars();
            }}
            className="relative group flex items-center justify-between font-rubik text-xl text-left border-b-2 w-full pt-3 pb-3 pl-2 pr-2 cursor-pointer hover:bg-sidebar-group-hover-bg"
          >
            <span className="whitespace-nowrap min-w-0 mr-4">
              {group.name.toUpperCase()} NOTES
            </span>

            {activeActions && (
              <button
                className="opacity-0 group-hover:opacity-100 cursor-pointer shrink-0 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(true);
                }}
                ref={ellipsesRef}
              >
                <Ellipses />
              </button>
            )}

            {isMenuOpen && hoveredId === group.id && (
              <div
                className="absolute w-30 right-0 bottom-full shadow-xl z-20 rounded-3xl"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-center">{group.name.toUpperCase()}</p>
                <DropdownItem
                  className="rounded-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  EDIT
                </DropdownItem>
                <DropdownItem
                  className="rounded-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  DELETE
                </DropdownItem>
              </div>
            )}
          </div>
        ))}

        {editingGroupName ? (
          <input
            className="font-rubik text-xl border-b-2 border-sidebar-border w-full text-center pt-3 pb-3 
               bg-transparent text-text-main uppercase outline-none placeholder:opacity-50"
            maxLength={10}
            placeholder="NAME"
            autoFocus
            onChange={(e) => setPendingGroupName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addGroup(pendingGroupName);
                setEditingGroupName(false);
                setPendingGroupName("");
              }
              if (e.key === "Escape") {
                setEditingGroupName(false);
                setPendingGroupName("");
              }
            }}
            value={pendingGroupName}
          />
        ) : null}
      </div>

      {/* Pinned Add Group button at the bottom */}
      {activeActions && (
        <button
          className="font-rubik text-xl border-t-2 border-sidebar-border w-full text-center pt-3 pb-3 hover:bg-sidebar-group-hover-bg cursor-pointer shrink-0"
          onClick={() => setEditingGroupName(true)}
        >
          ADD GROUP +
        </button>
      )}
    </div>
  );
};

export default GroupSidebar;
