import { connection } from "../..";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { DISPLAY_LOADING, HIDE_LOADING } from "../types/LoadingType";
import { CHUYEN_TAB, DAT_GHE, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "../types/QuanLyDatVeType";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";

export const layChiTietPhongVeAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);
      //   console.log("result: ", result);

      if (result.status === 200) {
        dispatch({
          type: SET_CHI_TIET_PHONG_VE,
          chiTietPhongVe: result.data.content,
        });
      }
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};
export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
  return async (dispatch, getState) => {
    try {
      dispatch(displayLoadingAction);
      const result = await quanLyDatVeService.datVe(thongTinDatVe);

      await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
      await dispatch({ type: DAT_VE_HOAN_TAT });
      await dispatch(hideLoadingAction);
      let userLogin = getState().QuanLyNguoiDungReducer.userLogin;
      await connection.invoke("datGheThanhCong", userLogin.taiKhoan, thongTinDatVe.maLichChieu);
      dispatch({ type: CHUYEN_TAB });
    } catch (error) {
      console.log(console.log(error.response.data));
      dispatch(hideLoadingAction);
    }
  };
};
export const datGheAction = (ghe, maLichChieu) => {
  return async (dispatch, getState) => {
    await dispatch({
      type: DAT_VE,
      gheDuocChon: ghe,
    });
    //Call api về backend
    let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
    let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;
    console.log("taiKhoan: ", taiKhoan);
    console.log("danhSachGheDangDat", danhSachGheDangDat);
    console.log("maLichChieu", maLichChieu);
    // chuyển mảng thành chuối
    danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);
    // call api signalR
    connection.invoke("datGhe", taiKhoan, danhSachGheDangDat, maLichChieu);
  };
};

export const datGheRealTimeAction = (arrGheKhachDat) => {
  return {
    type: DAT_GHE,
    arrGheKhachDat,
  };
};
