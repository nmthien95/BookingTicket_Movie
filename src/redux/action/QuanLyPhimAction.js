import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM } from "../types/QuanLyPhimType";
import { history } from "../../App";

export const layDanhPhimAction = (tenPhim = "") => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
      dispatch({ type: SET_DANH_SACH_PHIM, arrFilm: result.data.content });
    } catch (err) {
      console.log("err: ", err);
    }
  };
};
export const themPhimUpLoadHinhAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.themPhimUpLoadHinh(formData);
      alert("Thêm phim thành công");
      console.log("result: ", result);
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};
export const capNhapPhimUploadAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.capNhapPhimUpload(formData);

      alert("Cập nhập phim thành công");
      history.push("/admin/films");
    } catch (error) {
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
