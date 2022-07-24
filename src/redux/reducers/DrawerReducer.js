import React from "react";
import { CLOSE_DRAWER, OPEN_DRAWER, OPEN_SIDEBAR_MENU } from "../types/DrawerType";

const initialState = {
  visible: false,
  withDrawer: 0,
  ComponentContent: <p>default content</p>,
  placement: "left",
};
export const DrawerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case OPEN_DRAWER:
      return { ...state, visible: true };

    case CLOSE_DRAWER:
      return { ...state, visible: false };
    case OPEN_SIDEBAR_MENU:
      return {
        ...state,

        visible: true,
        withDrawer: 230,
        ComponentContent: payload,
      };
    default:
      return { ...state };
  }
};
