import { HomeOutlined } from "@ant-design/icons";
import { useEffect } from "react";

import { Route } from "react-router";
import { NavLink } from "react-router-dom";

export const UserTemplate = (props) => {
  const { Component, ...restProps } = props;
  useEffect(() => {
    console.log("yes");
    window.scrollTo(0, 0);
  });
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        //props.location, props.history,props.match
        return (
          <div className="userBackground">
            <div className="flex justify-end bg-transparent  container mx-auto pt-8">
              <NavLink
                className="text-2xl  font-bold text-orange-400 flex items-center transition-colors  hover:text-orange-600"
                to="/"
                rel="noopener noreferrer"
              >
                <p className="mb-0 mr-2">Trang chủ</p> <HomeOutlined />
              </NavLink>
            </div>
            <Component {...propsRoute} />
          </div>
        );
      }}
    />
  );
};
