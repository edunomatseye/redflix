import { createStore } from "@xstate/store";

type ThemeState = {
  value: "light" | "dark";
};

const themeMachine = createStore<ThemeState, { type: "TOGGLE" }>({
  initial: "light",
  states: {
    light: {
      on: {
        TOGGLE: "dark",
      },
    },
    dark: {
      on: {
        TOGGLE: "light",
      },
    },
  },
});

export default themeMachine;
