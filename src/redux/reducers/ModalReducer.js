import { IS_SHOWING } from "../types/ModalType";

const stateDefault = { isShowing: false, trailerUrl: "" };
export const ShowModalReducer = (state = stateDefault, { type, payload }) => {
  switch (type) {
    case IS_SHOWING: {
      state.isShowing = !state.isShowing;
      state.trailerUrl = payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
