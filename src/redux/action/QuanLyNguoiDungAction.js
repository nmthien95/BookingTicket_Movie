import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung";
import { DANG_NHAP } from "../types/QuanLyNguoiDungType";
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
      console.log("error", error.response);
    }
  };
};
