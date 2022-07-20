import { useFormik } from "formik";
import React from "react";
import { NavLink } from "react-router-dom";
import { GROUPID } from "../../util/settings/config";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { dangKyAction } from "../../redux/action/QuanLyNguoiDungAction";
import { history } from "../../App";

export default function Register() {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: GROUPID,
      hoTen: "",
      matKhauConfirm: "",
    },
    validationSchema: Yup.object().shape({
      matKhau: Yup.string().min(6, "Mật khẩu tối thiểu 6 kí tự").max(32, "tối đa 32 kí tự"),
      email: Yup.string().email("Phải đúng định dạng @email"),

      soDt: Yup.string().matches(phoneRegExp, "Số điện thoại không hợp lệ"),

      matKhauConfirm: Yup.string()
        .min(6, "Mật khẩu tối thiểu 6 kí tự")
        .max(32, "tối đa 32 kí tự")
        .oneOf([Yup.ref("matKhau"), null], "Nhập lại chưa đúng"),
    }),
    onSubmit: (values) => {
      console.log("values: ", values);
      dispatch(dangKyAction(values));
      history("/");
    },
  });
  return (
    <div>
      <from onSubmit={formik.handleSubmit} className="login-1">
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
          <div className="w-full p-6 m-auto bg-white border-t border-lime-600 rounded shadow-lg shadow-lime-800/50 lg:max-w-md">
            <h3 className="flex justify-center items-center px-4 hover:bg-gradient-to-l hover:from-teal-400 hover:to-lime-400 hover:bg-clip-text hover:text-transparent font-extrabold text-transparent text-4xl  bg-clip-text bg-gradient-to-r from-teal-400 to-lime-400 ">
              Movie Start
            </h3>
            <form className="mt-4">
              <div>
                <label htmlFor="text" className="block text-sm text-gray-800">
                  Tài khoản
                </label>
                <input
                  required
                  onChange={formik.handleChange}
                  name="taiKhoan"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-lime-700 bg-white border rounded-md focus:border-lime-400 focus:ring-lime-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <span className="text-red-500">{formik.errors.taiKhoan}</span>
              </div>

              <div className="mt-4">
                <label htmlFor="password" className="block text-sm text-gray-800">
                  Mật khẩu
                </label>
                <input
                  onChange={formik.handleChange}
                  name="matKhau"
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-lime-700 bg-white border rounded-md focus:border-lime-400 focus:ring-lime-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <span className="text-red-500"> {formik.errors.matKhau}</span>
              </div>
              <div className="mt-4">
                <label htmlFor="matKhauConfirm" className="block text-sm text-gray-800">
                  Nhập lại mật khẩu
                </label>
                <input
                  required
                  onChange={formik.handleChange}
                  name="matKhauConfirm"
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-lime-700 bg-white border rounded-md focus:border-lime-400 focus:ring-lime-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <span className="text-red-500"> {formik.errors.matKhauConfirm}</span>
              </div>
              <div className="mt-4">
                <label htmlFor="hoTen" className="block text-sm text-gray-800">
                  Họ tên
                </label>
                <input
                  required
                  onChange={formik.handleChange}
                  name="hoTen"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-lime-700 bg-white border rounded-md focus:border-lime-400 focus:ring-lime-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <span className="text-red-500"> {formik.errors.hoTen}</span>
              </div>
              <div className="mt-4">
                <label htmlFor="soDt" className="block text-sm text-gray-800">
                  Số điện thoại
                </label>
                <input
                  onChange={formik.handleChange}
                  name="soDt"
                  type="number"
                  className="block w-full px-4 py-2 mt-2 text-lime-700 bg-white border rounded-md focus:border-lime-400 focus:ring-lime-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <span className="text-red-500"> {formik.errors.soDt}</span>
              </div>
              <div className="mt-4">
                <label htmlFor="email" className="block text-sm text-gray-800">
                  Email
                </label>
                <input
                  required
                  onChange={formik.handleChange}
                  name="email"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-lime-700 bg-white border rounded-md focus:border-lime-400 focus:ring-lime-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <span className="text-red-500"> {formik.errors.email}</span>
              </div>
              <div className="mt-6 ">
                <button
                  type="submit"
                  className=" px-4 py-2 w-full mb-4 tracking-wide  text-gray-900 transition-colors duration-200 transform  rounded-md bg-gradient-to-r from-teal-200 to-lime-200 ease-in  hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4  focus:ring-lime-200  focus:outline-none "
                >
                  Đăng kí
                </button>
                <div className="text-right">
                  <NavLink className="px-4 text-md text-right py-2 tracking-wide hover:text-lime-500  text-orange-500 transition-colors duration-200 transform  ease-linear  " to="/login">
                    Bạn đã có tài khoản? Đăng nhập
                  </NavLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      </from>
    </div>
  );
}
