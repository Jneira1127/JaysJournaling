"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "psycho";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({ theme: "light", setTheme: () => {} });

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // 👇 initialize directly from localStorage, no effect needed
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("theme") as Theme) ?? "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme === "light" ? "" : theme,
    );
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
