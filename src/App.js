import "./App.css";
import { createBrowserHistory } from "history";
import { Router } from "react-router";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import { Route } from "react-router";
import Login from "./pages/Logins/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail.js/Detail";

export const history = createBrowserHistory();

function App() {
  return (
    <div className="app">
      <Router history={history}>
        <switch>
          <HomeTemplate path="/home" exact Component={Home} />
          <HomeTemplate path="/contact" exact Component={Contact} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <HomeTemplate path="/news" exact Component={News} />
          <HomeTemplate path="/detail/:id" exact Component={Detail} />
          <HomeTemplate path="/" exact Component={Home} />
        </switch>
      </Router>
    </div>
  );
}

export default App;
