import React from "react";
export const DOMAIN = "https://movieapi.cyberlearn.vn";
export const TOKEN = "accessToken";
export const GROUPID = "GP03";

export const USER_LOGIN = "USER_LOGIN";
export const useViewport = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  return { width };
};
