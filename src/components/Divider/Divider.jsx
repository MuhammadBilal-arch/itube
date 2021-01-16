import { Divider } from "antd";

import React, { useContext } from "react";
import { Theme } from "../../context/themecontext";

export const UseDivider = ({ text }) => {
  const ThemeContext = useContext(Theme);
  const { ThemeTxt } = ThemeContext.ThemeColor;
  return (
    <Divider
      orientation="left"
      style={{ padding: "0px 0px 15px 0px", border: ThemeTxt, color: ThemeTxt }}
    >
      {text}
    </Divider>
  );
};
