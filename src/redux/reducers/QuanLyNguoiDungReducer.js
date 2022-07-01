import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { DANG_NHAP } from "../types/QuanLyNguoiDungType";
let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const stateDefault = {
  userLogin: user,
};
export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DANG_NHAP: {
      console.log(action);

      const { thongTinDangNhap } = action;
      console.log("thongTinDangNhap: ", thongTinDangNhap);

      localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
      localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);

      return { ...state, userLogin: thongTinDangNhap };
    }
    default: {
      return { ...state };
    }
  }
};
