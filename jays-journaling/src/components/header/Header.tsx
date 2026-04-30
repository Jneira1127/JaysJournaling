import AddNoteButton from "./sidebar/AddNoteButton";
import GroupedNotesButton from "./sidebar/GroupNotesButton";
import DeleteNoteButton from "./sidebar/DeleteNoteButton";
import { Hamburger, Burger } from "../material-ui-components";
import { useState } from "react";

const Header = ({ onClick }: { onClick: () => void }) => {
  const [openBurger, setOpenBurger] = useState(false);

  return (
    <div className="relative flex justify-center items-center h-30 border-b-5 border-gray-300 bg-zinc-600 min-h-[10vh] min-w-[100vw] sticky top-0 z-50">
      <div className="absolute left-4">
        <Burger
          onClick={() => setOpenBurger(!openBurger)}
          className="relative text-lg cursor-pointer"
          sx={{ width: 60, height: 60 }}
        />
      </div>
      <h1 className="font-sans text-5xl text-white">Jays Journaling App</h1>
      {openBurger && (
        <div className="Flex justify-center absolute gap-20 top-30 left-0 w-[100vw] min-h-[15vh] bg-red-300 flex flex-wrap p-4 shadow-xl">
          <AddNoteButton onClick={onClick} />
          <GroupedNotesButton onClick={onClick} />
          <DeleteNoteButton onClick={onClick} />
        </div>
      )}
    </div>
  );
};

export default Header;
