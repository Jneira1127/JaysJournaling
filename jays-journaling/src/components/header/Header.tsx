"use client";
import { Hamburger } from "../material-ui-components";
import { useTheme } from "../../context/ThemeContext";

type ThemeType = "light" | "dark" | "psycho";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  
  const options: { id: ThemeType; label: string; icon: string }[] = [
    { id: "light", label: "Light", icon: "☀️" },
    { id: "dark", label: "Dark", icon: "🌙" },
    { id: "psycho", label: "Psycho", icon: "🔴" },
  ];

  return (
    <div 
      className="absolute right-4 flex p-1 rounded-full border-2 transition-all duration-300"
      style={{ 
        borderColor: "var(--text-header)",
        background: "rgba(0,0,0,0.05)" // Subtle inner background
      }}
    >
      {/* Sliding Background Highlight */}
      <div 
        className="absolute h-[calc(100%-8px)] transition-all duration-300 ease-out rounded-full shadow-sm"
        style={{
          width: `calc(${100 / options.length}% - 4px)`,
          transform: `translateX(${options.findIndex(o => o.id === theme) * 100}%)`,
          backgroundColor: "var(--text-header)",
          opacity: 0.9
        }}
      />

      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => setTheme(opt.id)}
          className={`relative z-10 px-3 py-1 text-xs font-bold transition-colors duration-300 rounded-full flex items-center gap-1`}
          style={{ 
            // Invert text color when background is behind it
            color: theme === opt.id ? "var(--header-bg)" : "var(--text-header)" 
          }}
        >
          <span>{opt.icon}</span>
          <span className="hidden md:inline uppercase tracking-tighter">{opt.label}</span>
        </button>
      ))}
    </div>
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
      className="relative flex justify-center items-center h-30 border-b-4 min-h-[10vh] min-w-[100vw] sticky top-0 z-50"
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
        className="font-oi text-2xl md:text-5xl text-white"
        style={{ color: "var(--text-header)" }}
      >
        Jays Journaling App
      </div>
      <ThemeToggle />
    </div>
  );
};

export default Header;