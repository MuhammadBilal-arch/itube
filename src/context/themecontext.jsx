import { createContext } from "react";

export const Theme = createContext({
  Theme: {
    ThemeBG: "rgba(0,0,0,0.8)",
    ThemeTxt: "#1890ff",
    ThemeContent: "rgba(0,0,0,0.8)",
    ThemeNav:"rgb(50,50,50)"
  },
  ThemeChange: () => {},
});
