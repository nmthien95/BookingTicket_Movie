import { quanLyRapService } from "../../services/QuanLyRapService";
import { SET_CHI_TIET_PHIM, SET_HE_THONG_RAP_CHIEU } from "../types/QuanLyRapType";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";

export const layDanhSachHeThongRapAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await quanLyRapService.layDanhSachHeThongRap();
      dispatch(hideLoadingAction);
      if ((result.status = 200)) {
        dispatch({
          type: SET_HE_THONG_RAP_CHIEU,
          heThongRapChieu: result.data.content,
        });
      }
    } catch (errors) {
      dispatch(displayLoadingAction);
      console.log("error", errors.response?.data);
    }
  };
};
export const layThongTinChiTietPhim = (id) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const result = await quanLyRapService.layThongTinLichChieuPhim(id);
      dispatch(hideLoadingAction);

      console.log("result: ", result);
      dispatch({
        type: SET_CHI_TIET_PHIM,
        filmDetail: result.data.content,
      });
    } catch (erros) {
      dispatch(hideLoadingAction);

      console.log("erros".errors.response.data);
    }
  };
};
// export const layThongTinHeThongRap = (id) => {
//   return async (dispatch) => {
//     try {
//       const result = await quanLyRapService.layThongTinHeThongRap();
//       console.log("result: ", result);
//       dispatch({
//         type: SET_CHI_TIET_PHIM,
//         filmDetail: result.data.content,
//       });
//     } catch (erros) {
//       console.log("erros".errors.response.data);
//     }
//   };
// };
