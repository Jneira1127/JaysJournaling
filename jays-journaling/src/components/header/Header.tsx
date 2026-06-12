"use client";
import { Hamburger } from "../material-ui-components";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const cycle = { light: "dark", dark: "psycho", psycho: "light" } as const;
  const labels = { light: "☀️ Light", dark: "🌙 Dark", psycho: "🔴 Psycho" };

  return (
    <button
      onClick={() => setTheme(cycle[theme])}
      className="absolute right-4 text-white border-2 px-3 py-1 rounded-full text-sm hover:opacity-80 cursor-pointer"
      style={{ borderColor: "var(--text-header)", color: "var(--text-header)" }}
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
      className="relative flex justify-center items-center h-30 border-b-4 min-h-[10vh] min-w-[100vw] sticky top-0 z-50 overflow-visible"
      style={{
        background: "var(--header-bg)",
        borderColor: "var(--header-border)",
      }}
    >
      <div className="absolute left-4" ref={burgerRef}>
        <Hamburger
          onClick={() =>
            openBurger ? handleCloseBurger() : handleOpenBurger(true)
          }
          className="relative text-lg cursor-pointer"
          sx={{ width: 60, height: 60, color: "var(--text-header)" }}
        />
      </div>
      <div
        className="font-oi text-5xl text-white"
        style={{ color: "var(--text-header)" }}
      >
        Jays Journaling App
      </div>
      <ThemeToggle />
    </div>
  );
};

export default Header;
