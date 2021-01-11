import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Page404 from "./containers/pages/Page404";
import PageMain from "./containers/pages/PageMain";
import PageVideos from "./containers/pages/PageVideos";
import PageFavVideos from "./containers/pages/PageFavVideos";
import Nav from "./components/nav/Nav";
import Layout from "./components/Layout/layout";
function App() {
  return (
    <BrowserRouter>
      {/* <Nav /> */}
      <Layout>
        <Switch>
          <Route exact path="/" component={PageMain} />
          <Route exact path="/videos" component={PageVideos} />
          <Route exact path="/videos/flist" component={PageFavVideos} />
          <Route component={Page404} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
