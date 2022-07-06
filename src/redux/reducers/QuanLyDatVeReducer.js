import { ThongTinLichChieu, Ghe } from "../../_core/models/ThongTinPhongVe";
import { DAT_VE, SET_CHI_TIET_PHONG_VE } from "../types/QuanLyDatVeType";

const stateDefault = {
  chiTietPhongVe: new ThongTinLichChieu(),
  danhSachGheDangDat: [],
};
export const QuanLyDatVeReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_CHI_TIET_PHONG_VE: {
      state.chiTietPhongVe = action.chiTietPhongVe;
      return { ...state };
    }
    case DAT_VE: {
      console.log("gheDuocChon", action.gheDuocChon);
      let danhSachGheCapNhap = [...state.danhSachGheDangDat];
      let index = danhSachGheCapNhap.findIndex(
        (gheDD) => gheDD.maGhe === action.gheDuocChon.maGhe
      );
      if (index !== -1) {
        danhSachGheCapNhap.splice(index, 1);
      } else {
        danhSachGheCapNhap.push(action.gheDuocChon);
      }

      return { ...state, danhSachGheDangDat: danhSachGheCapNhap };
    }

    default: {
      return { ...state };
    }
  }
};
