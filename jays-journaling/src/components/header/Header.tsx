"use client";
import { Hamburger } from "../material-ui-components";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const cycle = { light: "dark", dark: "psycho", psycho: "light" } as const;
  const labels = { light: "🌙 Dark", dark: "🔴 Psycho", psycho: "☀️ Light" };

  return (
    <button
      onClick={() => setTheme(cycle[theme])}
      className="absolute right-4 text-white border border-white px-3 py-1 rounded-full text-sm hover:opacity-80"
    >
      {labels[theme]}
    </button>
  );
};

type HeaderProps = {
  handleCloseBurger: () => void;
  handleOpenBurger: (value: boolean) => void;
  openBurger: boolean;
  burgerRef: React.RefObject<HTMLDivElement | null>;
};

const Header = ({
  handleCloseBurger,
  handleOpenBurger,
  openBurger,
  burgerRef,
}: HeaderProps) => {
  return (
    <div
      className="relative flex justify-center items-center h-30 border-b-4 border-gray-400 min-h-[10vh] min-w-[100vw] sticky top-0 z-50 overflow-visible"
      style={{ background: "var(--header-bg)" }}
    >
      <div className="absolute left-4" ref={burgerRef}>
        <Hamburger
          onClick={() =>
            openBurger ? handleCloseBurger() : handleOpenBurger(true)
          }
          className="relative text-lg cursor-pointer"
          sx={{ width: 60, height: 60 }}
        />
      </div>
      <h1 className="font-sans text-5xl text-white">Jays Journaling App</h1>
      <ThemeToggle />
    </div>
  );
};

export default Header;
