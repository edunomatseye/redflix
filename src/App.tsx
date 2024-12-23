import React from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import ThemeToggle from "./components/ThemeToggle";
import "./styles/theme.css";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="app">
        <ThemeToggle />
        {/* Your other components */}
      </div>
    </ThemeProvider>
  );
};

export default App;
