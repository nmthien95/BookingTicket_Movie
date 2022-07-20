import { quanLyRapService } from "../../services/QuanLyRapService";
import { SET_CHI_TIET_PHIM, SET_HE_THONG_RAP_CHIEU } from "../types/QuanLyRapType";

export const layDanhSachHeThongRapAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layDanhSachHeThongRap();

      if ((result.status = 200)) {
        dispatch({
          type: SET_HE_THONG_RAP_CHIEU,
          heThongRapChieu: result.data.content,
        });
      }
    } catch (errors) {
      console.log("error", errors.response?.data);
    }
  };
};
export const layThongTinChiTietPhim = (id) => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layThongTinLichChieuPhim(id);
      console.log("result: ", result);
      dispatch({
        type: SET_CHI_TIET_PHIM,
        filmDetail: result.data.content,
      });
    } catch (erros) {
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
