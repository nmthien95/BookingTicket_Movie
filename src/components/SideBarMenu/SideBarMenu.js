import { AppstoreOutlined, CalendarOutlined, ContainerOutlined, InsertRowAboveOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined } from "@ant-design/icons";
import _ from "lodash";
import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { DANG_XUAT } from "../../redux/types/QuanLyNguoiDungType";
import { useDispatch, useSelector } from "react-redux";

export default function SideBarMenu() {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const dispatch = useDispatch();

  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <Fragment>
          <li className="mb-4">
            <a href="/login" className="flex items-center rounded-lg px-4 py-2 transition duration-75 hover:bg-gray-200 font-bold text-base text-md  text-slate-500 hover:text-slate-900 ">
              <LoginOutlined className="mr-1 text-xl" />
              <span className=" ml-3 whitespace-nowrap">Đăng nhập</span>
            </a>
          </li>
          <li className="mb-4">
            <a href="/register" className="flex items-center rounded-lg px-4 py-2 transition duration-75 hover:bg-gray-200 font-bold text-base text-md  text-slate-500 hover:text-slate-900 ">
              <UserAddOutlined className="mr-1 text-xl" />
              <span className="ml-3 whitespace-nowrap">Đăng kí</span>
            </a>
          </li>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <li className="mb-4">
            <a href="/profile" className="flex items-center font-bold text-base text-md  text-slate-500 hover:text-slate-900 ">
              <div style={{ width: 45, height: 45 }} className="rounded-full border-2  bg-orange-300 flex justify-center items-center text-lg">
                {userLogin.taiKhoan.substr(0, 1)}
              </div>
              <span className="ml-3 whitespace-nowrap"> Hello {userLogin.taiKhoan} !</span>
            </a>
          </li>
          <li
            className="mb-4"
            onClick={() => {
              dispatch({
                type: DANG_XUAT,
              });
            }}
          >
            <div className="flex items-center rounded-lg px-4 py-2 transition duration-75 hover:bg-gray-200 font-bold text-base text-md  text-slate-500 hover:text-slate-900 ">
              <LogoutOutlined className="mr-1 text-xl" /> <span className="ml-3 whitespace-nowrap">Đăng xuất</span>
            </div>
          </li>
        </Fragment>
      );
    }
  };
  return (
    <Fragment>
      <ul className="space-y-2">
        {renderLogin()}
        <hr />
        <li className="mb-4">
          <a href="/#lichChieu" className="flex items-center rounded-lg px-4 py-2 transition duration-75 hover:bg-gray-200 font-bold text-base text-md  text-slate-500 hover:text-slate-900 ">
            <CalendarOutlined className="mr-1 text-xl" />
            <span className=" ml-3 whitespace-nowrap">Lịch Chiếu</span>
          </a>
        </li>
        <li className="mb-4">
          <a href="/#cumRap" className="flex items-center rounded-lg px-4 py-2 transition duration-75 hover:bg-gray-200 font-bold text-base text-md  text-slate-500 hover:text-slate-900 ">
            <InsertRowAboveOutlined className="mr-1 text-xl" />
            <span className=" ml-3 whitespace-nowrap">Cụm Rạp</span>
          </a>
        </li>
        <li className="mb-4">
          <a href="/#ungDung" className="flex items-center rounded-lg px-4 py-2 transition duration-75 hover:bg-gray-200 font-bold text-base text-md  text-slate-500 hover:text-slate-900 ">
            <AppstoreOutlined className="mr-1 text-xl" />
            <span className=" ml-3 whitespace-nowrap">Ứng Dụng</span>
          </a>
        </li>
        <li className="mb-4">
          <a href="/admin" className="flex items-center rounded-lg px-4 py-2 transition duration-75 hover:bg-gray-200 font-bold text-base text-md  text-slate-500 hover:text-slate-900 ">
            <ContainerOutlined className="mr-1 text-xl" />
            <span className=" ml-3 whitespace-nowrap">Quản lý</span>
          </a>
        </li>
      </ul>
    </Fragment>
  );
}
