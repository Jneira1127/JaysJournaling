import { Group, page } from "@/src/app/page";

type GroupSidebarProps = {
  groups: Group[];
  groupsRef: React.RefObject<HTMLDivElement | null>;
  handleBurger: () => void;
  // handleConfirmGroup: (id: number) => void;
  handleGroupClick: (id: number) => void;
  openBurger: boolean;
  openGroups: boolean;
  setVisibleGrouping: (value: boolean) => void;
  visibleGrouping: boolean;
};

const GroupSidebar = ({
  groups,
  groupsRef,
  handleBurger,
  // handleConfirmGroup,
  handleGroupClick,
  openBurger,
  openGroups,
  setVisibleGrouping,
  visibleGrouping,
}: GroupSidebarProps) => {
  return (
    <div
      ref={groupsRef}
      className={`${openBurger && openGroups ? "w-[15vw]" : "w-[0]"} flex flex-col h-[90vh] bg-[#FF847C] shadow-xl transition-all duration-250 ease-in-out`}
    >
      <div className="flex flex-col items-center justify-left pb-24 border-r-4 border-gray-400">
        {groups.map((group) => (
          <div
            key={group.id}
            onClick={() => {
              handleGroupClick(group.id)
              // handleConfirmGroup(group.id)
              setVisibleGrouping(true);
              handleBurger();
            }}
            className="border-t-2 w-full text-center pt-3 pb-3 cursor-pointer hover:bg-[#FF747C] first:border-t-0 last:border-b-2"
          >
            {group.name} Notes
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupSidebar;
