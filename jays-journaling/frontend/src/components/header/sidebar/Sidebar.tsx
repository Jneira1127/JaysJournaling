import { Dispatch, SetStateAction } from "react";
import AddNoteButton from "./AddNoteIcon";
import GroupedNotesButton from "./GroupNotesIcon";
import FilterNotesButton from "./FilterNotesIcon";
import DeleteNoteButton from "../../notes/DeleteButton/DeleteNoteIcon";
import GroupSidebar from "./GroupsSidebar";
import { page, Group } from "@/src/app/page";

type SidebarProps = {
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  groups: Group[];
  groupsRef: React.RefObject<HTMLDivElement | null>;
  handleCloseBurger: () => void;
  // handleConfirmGroup: (id: number) => void;
  handleGroupClick: (id: number) => void;
  openBurger: boolean;
  openGroups: boolean;
  setOpenGroups: (value: boolean) => void;
  setJournal: Dispatch<SetStateAction<page[]>>;
  journal: page[];
  setVisibleDelete: (value: boolean) => void;
  setVisibleGrouping: (value: boolean) => void;
  visibleDelete: boolean;
  visibleGrouping: boolean;
};

const Sidebar = ({
  dropdownRef,
  groups,
  groupsRef,
  handleCloseBurger,
  // handleConfirmGroup,
  handleGroupClick,
  openBurger,
  openGroups,
  setOpenGroups,
  setJournal,
  journal,
  setVisibleDelete,
  setVisibleGrouping,
  visibleDelete,
  visibleGrouping
}: SidebarProps) => {
  // const [isClosing, setIsClosing] = useState(false);

  return (
    <div className="flex">
      <div
        ref={dropdownRef}
        className={`${openBurger ? "w-[15vw]" : "w-[0]"} overflow-hidden flex flex-col h-[90vh] bg-[#FF746C] shadow-xl transition-all duration-250 ease-in-out`}
      >
        <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-12 p-4 pb-24 border-r-4 border-gray-400">
          <AddNoteButton pages={journal} handleJournal={setJournal} />
          <DeleteNoteButton
            onClick={() => {
              setVisibleDelete(!visibleDelete);
              handleCloseBurger();
            }}
          />
          <GroupedNotesButton onClick={() => setOpenGroups(!openGroups)} />
          <FilterNotesButton
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </div>
      <GroupSidebar
        groups={groups}
        groupsRef={groupsRef}
        handleBurger={handleCloseBurger}
        // handleConfirmGroup={handleConfirmGroup}
        handleGroupClick={handleGroupClick}
        openBurger={openBurger}
        openGroups={openGroups}
        setVisibleGrouping={setVisibleGrouping}
        visibleGrouping={visibleGrouping}
      />
    </div>
  );
};

export default Sidebar;
