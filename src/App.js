import "./App.css";
import { createBrowserHistory } from "history";

import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import { Route, Router, Switch } from "react-router";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail.js/Detail";
import { CheckoutTemplate } from "./templates/CheckoutTemplate/CheckoutTemplate";
import Checkout from "./pages/Checkout/Checkout";
import { Suspense, lazy, Fragment } from "react";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import Loading from "./components/Loading/Loading";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./pages/Profile/Profile";
import Films from "./pages/Admin/Films/Films";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import AddNew from "./pages/Admin/Films/AddNew/AddNew";
import Edit from "./pages/Admin/Films/Edit/Edit";
import ShowTime from "./pages/Admin/Films/ShowTime/ShowTime";
import DrawerMovie from "./HOC/Sidlebar/DrawerMovie";
import ModalMovie from "./components/Modal/ModalMoive";

export const history = createBrowserHistory();

function App() {
  return (
    <div>
      <Fragment>
        <Loading />
      </Fragment>
      <Fragment>
        <DrawerMovie />
      </Fragment>
      <Fragment>
        <ModalMovie />
      </Fragment>
      <Router history={history}>
        <Switch>
          <HomeTemplate path="/home" exact Component={Home} />
          <HomeTemplate path="/contact" exact Component={Contact} />
          <UserTemplate path="/login" exact Component={Login} />
          <UserTemplate path="/register" exact Component={Register} />
          <HomeTemplate path="/profile" exact Component={Profile} />
          <HomeTemplate path="/news" exact Component={News} />
          <HomeTemplate path="/detail/:id" exact Component={Detail} />
          <HomeTemplate path="/" exact Component={Home} />
          <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />
          <AdminTemplate path="/admin/films" exact Component={Films} />
          <AdminTemplate path="/admin/films/addnew" exact Component={AddNew} />
          <AdminTemplate path="/admin" exact Component={Dashboard} />
          <AdminTemplate path="/admin/films/edit/:id/" exact Component={Edit} />
          <AdminTemplate path="/admin/films/showtime/:id/:tenPhim" exact Component={ShowTime} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
