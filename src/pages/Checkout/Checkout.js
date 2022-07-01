import React from "react";
import { useSelector } from "react-redux";
import style from "./Checkout.module.css";

export default function Checkout(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  return (
    <div className="container min-h-screen mt-2">
      <div className="grid grid-cols-12 ">
        <div className="col-span-9 mt-5">
          <div className="flex flex-col items-center">
            <div
              className="bg-black"
              style={{ width: "80%", height: 15 }}
            ></div>
            <div className={`${style["trapezoid"]} text-center`}>
              {" "}
              <h3 className="text-black font-bold align-middle">Màn hình</h3>
            </div>
          </div>
        </div>
        <div className="col-span-3  ">
          <h3 className="text-green-400 text-center text-2xl">100.000 VND</h3>
          <hr />
          <h3 className="texl-xl">Lật mặt 48h</h3>
          <p>Địa điểm: BHD Star Cineplex - Vincom Lê Văn Việt</p>
          <p>Ngày chiều: 25/4/2022 - 12:05</p>
          <hr />
          <div className="grid grid-cols-2 my-5 ">
            <div>
              <p className="text-orange-500 text-lg m-0">Ghế</p>
            </div>
            <div className="text-right">
              <p className="text-lime-500 text-lg m-0">0 đ</p>{" "}
            </div>
          </div>
          <hr />
          <div className="my-5">
            <i className="text-sm text-slate-400">Email</i> <br />
            {userLogin.email}
          </div>
          <div className="my-5">
            <i className="text-sm text-slate-400">Phone</i> <br />
            {userLogin.soDT ? userLogin.soDT : "Chưa cập nhập"}
          </div>
          <hr />
          <div className="mb-0 h-full flex flex-col justify-center items-center">
            <div className="text-gray-700 hover:text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 ease-in duration-300 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200  font-medium text-md w-full px-5 py-2.5 text-center ">
              ĐẶT VÉ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
