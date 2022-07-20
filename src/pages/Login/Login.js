import React from "react";
import "./login.css";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dangNhapAction } from "../../redux/action/QuanLyNguoiDungAction";

export default function Login(props) {
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log("userLogin: ", userLogin);

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      console.log("values: ", values);
      const action = dangNhapAction(values);
      dispatch(action);
    },
  });

  return (
    <from onSubmit={formik.handleSubmit} className="login-1">
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white border-t border-lime-600 rounded shadow-lg shadow-lime-800/50 lg:max-w-md">
          <h3 className="flex justify-center items-center px-4 hover:bg-gradient-to-l hover:from-teal-400 hover:to-lime-400 hover:bg-clip-text hover:text-transparent font-extrabold text-transparent px-4 text-4xl  bg-clip-text bg-gradient-to-r from-teal-400 to-lime-400 ">
            Movie Start
          </h3>
          <form className="mt-6">
            <div>
              <label htmlFor="text" className="block text-sm text-gray-800">
                Tài khoản
              </label>
              <input
                onChange={formik.handleChange}
                name="taiKhoan"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-lime-700 bg-white border rounded-md focus:border-lime-400 focus:ring-lime-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-4">
              <div>
                <label htmlFor="password" className="block text-sm text-gray-800">
                  Mật khẩu
                </label>
                <input
                  onChange={formik.handleChange}
                  name="matKhau"
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-lime-700 bg-white border rounded-md focus:border-lime-400 focus:ring-lime-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <a href="#" className="text-xs text-gray-600 hover:underline">
                Quên mật khẩu ?
              </a>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 tracking-wide  text-gray-900 transition-colors  transform  rounded-md bg-gradient-to-r from-teal-200 to-lime-200 ease-in duration-300 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 focus:outline-none "
                >
                  Đăng nhập
                </button>
              </div>
              <p className="mt-8 text-xs font-light text-center text-gray-700">
                Bạn chưa có tài khoản ?
                <NavLink to="/register" className="font-medium text-lime-600 hover:underline">
                  Đăng kí
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </from>
  );
}
