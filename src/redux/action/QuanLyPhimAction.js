import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM } from "../types/QuanLyPhimType";

export const layDanhPhimAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachPhim();
      dispatch({ type: SET_DANH_SACH_PHIM, arrFilm: result.data.content });
    } catch (err) {
      console.log("err: ", err);
    }
  };
};
