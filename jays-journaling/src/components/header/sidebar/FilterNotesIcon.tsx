import { FilterList } from "../../material-ui-components";

const FilterNotesButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="flex items-center justify-center w-25 h-25 bg-white rounded-lg text-gray-400 text-9xl cursor-pointer hover:opacity-85  drop-shadow-lg"
        style={{ background: "var(--sidebar-icon-bg)" }}
      >
        <FilterList sx={{ fontSize: 85, color: "var(--sidebar-icon)" }} />
      </button>
      <p
        className="font-rubik text-center mt-1 text-lg text-white font-medium"
        style={{ color: "var(--text-main)" }}
      >
        FILTER 
      </p>
    </div>
  );
};

export default FilterNotesButton;
