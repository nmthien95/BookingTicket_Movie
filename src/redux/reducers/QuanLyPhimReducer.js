import {
  SET_DANH_SACH_PHIM,
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
} from "../types/QuanLyPhimType";

const stateDefault = {
  arrFilm: [],
  dangChieu: false,
  sapChieu: false,
  arrFilmDefault: [],
  heThognRapChieu: [],
};
export const QuanLyPhimReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_DANH_SACH_PHIM: {
      state.arrFilm = action.arrFilm;
      state.arrFilmDefault = state.arrFilm;
      return { ...state };
    }
    case SET_FILM_DANG_CHIEU: {
      state.dangChieu = true;
      state.sapChieu = false;
      state.arrFilm = state.arrFilmDefault.filter(
        (film) => film.dangChieu === state.dangChieu
      );
      return { ...state };
    }
    case SET_FILM_SAP_CHIEU: {
      state.dangChieu = false;
      state.sapChieu = true;
      state.arrFilm = state.arrFilmDefault.filter(
        (film) => film.sapChieu === state.sapChieu
      );
      return { ...state };
    }
    default:
      return { ...state };
  }
};
