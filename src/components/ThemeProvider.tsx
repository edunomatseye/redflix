import React, { createContext, useContext, useEffect } from "react";
import { useMachine } from "@xstate/react";
import themeMachine from "../machines/themeMachine";

type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const state = useMachine(themeMachine);

  useEffect(() => {
    // Apply theme class to document body
    document.body.className = state.values;
  }, [state]);

  const toggleTheme = () => {
    themeMachine.send("TOGGLE");
  };

  return (
    <ThemeContext.Provider value={{ theme: state.value, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
