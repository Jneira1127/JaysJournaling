"use client";
import { Hamburger, Burger } from "../material-ui-components";
import { useTheme } from "../../context/ThemeContext";
import { useUI } from "@/src/context/UIContext";
import { useEffect, useRef } from "react";

type ThemeType = "light" | "dark" | "psycho";

// Keep this internal component here to fix the "Module Not Found" error
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const options: { id: ThemeType; label: string; icon: string }[] = [
    { id: "light", label: "Light", icon: "☀️" },
    { id: "dark", label: "Dark", icon: "🌙" },
    { id: "psycho", label: "Psycho", icon: "🔴" },
  ];

  const activeIndex = options.findIndex((o) => o.id === theme);

  return (
    <div
      className="absolute right-4 flex p-1 rounded-full border-2 transition-all duration-300"
      style={{
        borderColor: "var(--text-header)",
        background: "rgba(0,0,0,0.05)",
      }}
    >
      <div
        className="absolute h-[calc(100%-8px)] transition-all duration-300 ease-out rounded-full shadow-sm"
        style={{
          width: `calc(33.33% - 4px)`,
          transform: `translateX(${activeIndex * 100}%)`,
          backgroundColor: "var(--text-header)",
          opacity: 0.9,
        }}
      />

      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => setTheme(opt.id)}
          className={`relative z-10 px-3 py-1 text-xs font-bold transition-colors duration-300 rounded-full flex items-center gap-1`}
          style={{
            color: theme === opt.id ? "var(--header-bg)" : "var(--text-header)",
          }}
        >
          <span>{opt.icon}</span>
          <span className="hidden md:inline uppercase tracking-tighter cursor-pointer">
            {opt.label}
          </span>
        </button>
      ))}
    </div>
  );
};

const Header = () => {
  // Use UI Context instead of props
  const {
    burgerRef,
    openBurger,
    setEditingGroupName,
    setOpenBurger,
    setActiveActions,
    sidebarRef,
    closeAllSidebars,
  } = useUI();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        burgerRef &&
        !burgerRef.current?.contains(event.target as Node) &&
        sidebarRef &&
        !sidebarRef.current?.contains(event.target as Node)
      ) {
        setActiveActions(false);
        setEditingGroupName(false);
        closeAllSidebars();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [burgerRef, closeAllSidebars, sidebarRef]);

  return (
    <div
      className="relative flex justify-center items-center h-30 border-b-4 min-h-[10vh] min-w-[100vw] sticky top-0 z-50"
      style={{
        background: "var(--header-bg)",
        borderColor: "var(--header-border)",
      }}
    >
      <div ref={burgerRef} className="absolute left-4">
        <Burger
          onClick={() =>
            openBurger ? closeAllSidebars() : setOpenBurger(true)
          }
          className="relative text-lg cursor-pointer"
          sx={{ width: 60, height: 60, color: "var(--text-header)" }}
        />
      </div>
      <div
        className="font-oi text-2xl md:text-5xl"
        style={{ color: "var(--text-header)" }}
      >
        Jays Journaling App
      </div>
      <ThemeToggle />
    </div>
  );
};

export default Header;
