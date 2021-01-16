import { useState, useCallback } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Page404 from "./containers/pages/Page404";
import PageMain from "./containers/pages/PageMain";
import PageVideos from "./containers/pages/PageVideos";
import PageFavVideos from "./containers/pages/PageFavVideos";
import Layout from "./components/Layout/layout";
import { Auth } from "./context/authcontext";
import { Theme } from "./context/themecontext";

function App() {
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [ThemeColor, setThemeColor] = useState({
    ThemeBG: "rgba(0,0,0,0.8)",
    ThemeTxt: "#1890ff",
    ThemeContent: "rgba(0,0,0,0.8)",
    ThemeNav:"rgb(50,50,50)"
  });

  const LoggedIn = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const Logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const ThemeChange = () => {
    ThemeColor.ThemeBG === "rgba(0,0,0,0.8)"
      ? setThemeColor({
          ThemeBG: "rgba(0,0,0,0.1)",
          ThemeTxt: "black",
          ThemeContent: "rgba(0,0,0,0.1)",
          ThemeNav: "rgb(240,240,240)"
        })
      : setThemeColor({
          ThemeBG: "rgba(0,0,0,0.8)",
          ThemeTxt: "#1890ff",
          ThemeContent: "rgba(0,0,0,0.8)",
          ThemeNav: "rgb(50,50,50)"
        });
  };

  return (
    <Auth.Provider
      value={{ IsLoggedIn: IsLoggedIn, LoggedIn: LoggedIn, Logout: Logout }}
    >
      <Theme.Provider
        value={{
          ThemeColor,
          ThemeChange,
        }}
      >
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/" component={PageMain} />
              <Route exact path="/videos" component={PageVideos} />
              <Route exact path="/videos/flist" component={PageFavVideos} />
              <Route component={Page404} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </Theme.Provider>
    </Auth.Provider>
  );
}

export default App;
