import { Fragment, useEffect } from "react";
import { Route } from "react-router";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";

export const HomeTemplate = (props) => {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // });
  const { Component, ...restProps } = props;
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        //props.location, props.history,props.match
        return (
          <div className="bg-home-page">
            <Header {...propsRoute} />

            <Component {...propsRoute} />

            <Footer />
          </div>
        );
      }}
    />
  );
};
