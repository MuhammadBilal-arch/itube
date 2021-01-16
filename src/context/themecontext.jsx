import { createContext } from "react";

export const Theme = createContext({
  Theme: { ThemeBG: "orange", ThemeTxt: "white" ,ThemeContent: "black" ,ThemeNav: "white"},
  ThemeChange: () => {},
});
