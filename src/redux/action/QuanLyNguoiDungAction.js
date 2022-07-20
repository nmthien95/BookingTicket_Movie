import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung";
import { DANG_NHAP, SET_THONG_TIN_NGUOI_DUNG } from "../types/QuanLyNguoiDungType";
import { history } from "../../App";

export const dangNhapAction = (thongtinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(thongtinDangNhap);
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
      console.log("error", error.response?.data);
    }
  };
};
export const layThongTinNGuoiDungAction = (thongtinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinNguoiDung();
      if (result.data.statusCode === 200) {
        console.log(result);
        dispatch({
          type: SET_THONG_TIN_NGUOI_DUNG,
          thongTinNguoiDung: result.data.content,
        });
      }

      console.log("result", result);
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};
export const dangKyAction = (thongTinDangKy) => {
  return async (dispatch) => {
    console.log(history);
    try {
      const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);

      history.push("/");
      alert("Đăng kí thành công");
    } catch (error) {
      console.log("error: ", error);
      alert(error.response?.data.content);
    }
  };
};
