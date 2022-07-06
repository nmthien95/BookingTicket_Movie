import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";

export default function Header() {
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
              <NavLink
                to="/home"
                rel="noopener noreferrer"
                className="  text-theme-hover text-header"
                activeClassName="text-header-classActive"
              >
                Lịch chiếu
                <div className="text-header-active btn-theme"></div>
              </NavLink>
            </li>
            <li className="flex">
              <NavLink
                to="/contact"
                rel="noopener noreferrer"
                className="text-theme-hover text-header"
                activeClassName="text-header-classActive"
              >
                Cụm Rạp
                <div className="text-header-active btn-theme"></div>
              </NavLink>
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
          </ul>
          <div className="items-center flex-shrink-0 hidden lg:flex">
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
                to="/"
                rel="noopener noreferrer"
                className="flex items-center px-4 font-bold text-md text-slate-500      hover:text-slate-900"
              >
                <UserAddOutlined className="mr-1" />
                Đăng kí
              </NavLink>
            </button>
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
