import { createContext, useContext, useState } from "react";

export const Themes = {
  light: {
    background: "#2f6f91",
    card: "#3b82a0",
    text: "#f3fbff",
    accent: "#f7ad19",
    primary: "#1e4f6a",
  },

  dark: {
    background: "#070b14",
    card: "#0c1422",
    text: "#cfe9ff",
    accent: "#7cc7ff",
    primary: "#4aa3ff",
  },
};

type ThemeType = "light" | "dark";

const ThemeContext = createContext<any>(null);

export function ThemeProvider({ children }: any) {
  const [theme, setTheme] = useState<ThemeType>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        colors: Themes[theme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);