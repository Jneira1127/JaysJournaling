import AddNoteButton from "./sidebar/AddNoteButton";
import GroupedNotesButton from "./sidebar/GroupNotesButton";
import DeleteNoteButton from "./sidebar/DeleteNoteButton";
import { Hamburger, Burger } from "../material-ui-components";
import { useEffect, useRef, useState } from "react";

const Header = ({ onClick }: { onClick: () => void }) => {
  const [openBurger, setOpenBurger] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);

  const handleCloseBurger = () => {
    setIsClosing(true); // trigger closing animation
    setTimeout(() => {
      setOpenBurger(false);
      setIsClosing(false);
    }, 250); // match your animation duration
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        openBurger &&
        dropdownRef.current &&
        burgerRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !burgerRef.current.contains(e.target as Node)
      ) {
        handleCloseBurger();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openBurger]);

  return (
    <div className="relative flex justify-center items-center h-30 border-b-5 border-gray-300 bg-zinc-600 min-h-[10vh] min-w-[100vw] sticky top-0 z-50 overflow-visible">
      <div className="absolute left-4" ref={burgerRef}>
        <Burger
          onClick={() =>
            openBurger ? handleCloseBurger() : setOpenBurger(true)
          }
          className="relative text-lg cursor-pointer"
          sx={{ width: 60, height: 60 }}
        />
      </div>
      <h1 className="font-sans text-5xl text-white">Jays Journaling App</h1>
      {openBurger && (
        <div
          ref={dropdownRef}
          className={`${isClosing ? "slide-up" : "slide-down"} flex justify-center absolute gap-20 top-30 left-0 w-[100vw] min-h-[15vh] bg-red-300 flex flex-wrap p-4 shadow-xl `}
        >
          <AddNoteButton onClick={onClick} />
          <GroupedNotesButton onClick={onClick} />
          <DeleteNoteButton onClick={onClick} />
        </div>
      )}
    </div>
  );
};

export default Header;
