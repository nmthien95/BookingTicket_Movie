import { DISPLAY_LOADING, HIDE_LOADING } from "../types/LoadingType";

const stateDedault = {
  isLoading: false,
};
export const LoadingReducer = (state = stateDedault, action) => {
  switch (action.type) {
    case DISPLAY_LOADING: {
      state.isLoading = true;
      return { ...state };
    }
    case HIDE_LOADING: {
      state.isLoading = false;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
