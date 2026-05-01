import { Hamburger, Burger } from "../material-ui-components";
<<<<<<< HEAD

type HeaderProps = {
  handleCloseBurger: () => void;
  handleOpenBurger: (value: boolean) => void;
  openBurger: boolean;
  burgerRef: React.RefObject<HTMLDivElement | null>;
};
=======
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { page } from "@/src/app/page";

type HeaderProps = {
  journal: page[];
  handleJournal: Dispatch<SetStateAction<page[]>>;
  deleteButton: Dispatch<SetStateAction<boolean>>;
};

const Header = ({ deleteButton, handleJournal, journal }: HeaderProps) => {
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
>>>>>>> e562330 (refactor the add note button)

const Header = ({
  handleCloseBurger,
  handleOpenBurger,
  openBurger,
  burgerRef,
}: HeaderProps) => {
  return (
    <div className="relative flex justify-center items-center h-30 border-b-4 border-gray-400 bg-black min-h-[10vh] min-w-[100vw] sticky top-0 z-50 overflow-visible">
      <div className="absolute left-4" ref={burgerRef}>
        <Burger
          onClick={() =>
            openBurger ? handleCloseBurger() : handleOpenBurger(true)
          }
          className="relative text-lg cursor-pointer"
          sx={{ width: 60, height: 60 }}
        />
      </div>
      <h1 className="font-sans text-5xl text-white">Jays Journaling App</h1>
    </div>
  );
};

export default Header;
