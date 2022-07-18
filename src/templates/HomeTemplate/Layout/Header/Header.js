import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import {
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { DANG_XUAT } from "../../../../redux/types/QuanLyNguoiDungType";

export default function Header() {
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log("userLogin: ", userLogin);

  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <Fragment>
          <button className="self-center p-1  border-r-2  border-slate-400 text-center">
            <NavLink
              to="/login"
              rel="noopener noreferrer"
              className="flex items-center px-4 font-bold  text-md  text-slate-500 hover:text-slate-900 "
            >
              <LoginOutlined className="mr-1" />
              Đăng nhập
            </NavLink>
          </button>
          <button className="self-center p-1  ml-2 text-center bg-transparent">
            <NavLink
              to="/register"
              rel="noopener noreferrer"
              className="flex items-center px-4 font-bold text-md text-slate-500      hover:text-slate-900"
            >
              <UserAddOutlined className="mr-1" />
              Đăng kí
            </NavLink>
          </button>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <button className="self-center p-1  border-r-2  border-slate-400 text-center">
            <NavLink
              to="/profile"
              rel="noopener noreferrer"
              className="flex items-center px-4 font-bold  text-md  text-slate-500 hover:text-slate-900 "
            >
              <div
                style={{ width: 45, height: 45 }}
                className="rounded-full border-2 bg-orange-300 flex justify-center items-center text-lg"
              >
                {userLogin.taiKhoan.substr(0, 1)}
              </div>
              Hello {userLogin.taiKhoan} !
            </NavLink>
          </button>
          <button
            className="self-center p-1  ml-2 text-center bg-transparent"
            onClick={() => {
              dispatch({
                type: DANG_XUAT,
              });
            }}
          >
            <div className="flex items-center px-4 font-bold text-md text-slate-500      hover:text-slate-900">
              <LogoutOutlined className="mr-1" /> Đăng xuất
            </div>
          </button>
        </Fragment>
      );
    }
  };
  return (
    <div>
      <header
        className="px-4 fixed w-full z-50 text-white"
        style={{
          backgroundColor: "rgba(255,255,255,.9)",
          boxShadow:
            "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
        }}
      >
        <div className="container flex justify-between h-16 py-1 mx-auto">
          <NavLink
            to="/home"
            rel="noopener noreferrer"
            className="flex items-center hover:bg-gradient-to-r hover:from-teal-400 hover:to-lime-400 hover:bg-clip-text hover:text-transparent font-extrabold text-transparent px-4 text-4xl  bg-clip-text bg-gradient-to-r from-teal-400 to-lime-400 "
          >
            Movie Start
          </NavLink>
          <ul className="items-stretch hidden space-x-3 lg:flex mb-0">
            <li className="flex ">
              <a
                href="#lichChieu"
                className="  text-theme-hover text-header"
                activeClassName="text-header-classActive"
              >
                Lịch chiếu
                <div className="text-header-active btn-theme"></div>
              </a>
            </li>
            <li className="flex">
              <a
                href="#cumRap"
                className="text-theme-hover text-header"
                activeClassName="text-header-classActive"
              >
                Cụm Rạp
                <div className="text-header-active btn-theme"></div>
              </a>
            </li>
            <li className="flex">
              <NavLink
                to="/news"
                rel="noopener noreferrer"
                className="text-theme-hover text-header"
                activeClassName="text-header-classActive	"
              >
                Tin Tức
                <div className="text-header-active btn-theme"></div>
              </NavLink>
            </li>
            {userLogin.maLoaiNguoiDung === "QuanTri" ? (
              <li className="flex">
                <NavLink
                  to="/admin"
                  rel="noopener noreferrer"
                  className="text-theme-hover text-header"
                  activeClassName="text-header-classActive	"
                >
                  Quản trị
                  <div className="text-header-active btn-theme"></div>
                </NavLink>
              </li>
            ) : (
              ""
            )}
          </ul>
          <div className="items-center flex-shrink-0 hidden lg:flex">
            {renderLogin()}
          </div>
          <button className="p-3  text-gray-800   hover:text-gray-900 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
}
