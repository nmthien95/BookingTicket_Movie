import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung";
import { DANG_NHAP, SET_THONG_TIN_NGUOI_DUNG } from "../types/QuanLyNguoiDungType";
import { history } from "../../App";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";

export const dangNhapAction = (thongtinDangNhap) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await quanLyNguoiDungService.dangNhap(thongtinDangNhap);
      dispatch(hideLoadingAction);
      if (result.data.statusCode === 200) {
        console.log(result);
        dispatch({
          type: DANG_NHAP,
          thongTinDangNhap: result.data.content,
        });
        //Chuyển hướng về trang trước đó
        history.goBack();
      }

      console.log("result", result);
    } catch (error) {
      dispatch(hideLoadingAction);
      console.log("error", error.response?.data);
    }
  };
};
export const layThongTinNGuoiDungAction = (thongtinDangNhap) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await quanLyNguoiDungService.layThongTinNguoiDung();
      dispatch(hideLoadingAction);
      if (result.data.statusCode === 200) {
        console.log(result);
        dispatch({
          type: SET_THONG_TIN_NGUOI_DUNG,
          thongTinNguoiDung: result.data.content,
        });
      }
    } catch (error) {
      dispatch(hideLoadingAction);
      console.log("error", error.response?.data);
    }
  };
};
export const dangKyAction = (thongTinDangKy) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);
      dispatch(hideLoadingAction);
      alert("Đăng kí thành công");
      history.push("/");
    } catch (error) {
      dispatch(hideLoadingAction);

      alert(error.response?.data.content);
    }
  };
};
