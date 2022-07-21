import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM } from "../types/QuanLyPhimType";
import { history } from "../../App";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";

export const layDanhPhimAction = (tenPhim = "") => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
      dispatch(hideLoadingAction);
      dispatch({ type: SET_DANH_SACH_PHIM, arrFilm: result.data.content });
    } catch (err) {
      dispatch(hideLoadingAction);
      console.log("err: ", err);
    }
  };
};
export const themPhimUpLoadHinhAction = (formData) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      let result = await quanLyPhimService.themPhimUpLoadHinh(formData);
      dispatch(hideLoadingAction);

      alert("Thêm phim thành công");
    } catch (error) {
      dispatch(hideLoadingAction);

      console.log(error.response?.data);
    }
  };
};
export const capNhapPhimUploadAction = (formData) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      let result = await quanLyPhimService.capNhapPhimUpload(formData);
      dispatch(hideLoadingAction);

      alert("Cập nhập phim thành công");
      history.push("/admin/films");
    } catch (error) {
      dispatch(hideLoadingAction);

      console.log(error.response?.data);
    }
  };
};
export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.xoaPhim(maPhim);
      alert("Xóa phim thành công");
      dispatch(layDanhPhimAction());
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};
