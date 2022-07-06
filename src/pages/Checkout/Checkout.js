import React, { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  datVeAction,
  layChiTietPhongVeAction,
} from "../../redux/action/QuanLyDatVeAction";
import style from "./Checkout.module.css";
import "./Checkout.css";
import { DAT_VE } from "../../redux/types/QuanLyDatVeType";
import _ from "lodash";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { UserOutlined } from "@ant-design/icons";

export default function Checkout(props) {
  const { chiTietPhongVe, danhSachGheDangDat } = useSelector(
    (state) => state.QuanLyDatVeReducer
  );
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log("chiTietPhongVe: ", chiTietPhongVe);
  console.log("danhSachgheDangDat: ", danhSachGheDangDat);

  const dispatch = useDispatch();
  useEffect(() => {
    // gọi hàm tạo ra 1 async function
    const action = layChiTietPhongVeAction(props.match.params.id);
    dispatch(action);
  }, []);
  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

  const renderSeats = () => {
    return danhSachGhe?.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "ghe-2" : "";
      let classGheDaDat = ghe.daDat === true ? "ghe-5" : "";
      let classGheDaDuocDat = "";
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = "ghe-7";
      }
      let classGheDangDat = "";
      let indexGheDD = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );
      if (indexGheDD !== -1) {
        classGheDangDat = "ghe-6";
      }

      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              dispatch({
                type: DAT_VE,
                gheDuocChon: ghe,
              });
            }}
            className={`ghe-1 ${classGheVip} ${classGheDaDat} ${classGheDaDuocDat} ${classGheDangDat}`}
          >
            <span className="ghe-3">
              {ghe.daDat ? (
                classGheDaDuocDat != "" ? (
                  <UserOutlined />
                ) : (
                  "X"
                )
              ) : (
                ghe.stt
              )}
            </span>
            <span className="ghe-4"> </span>
          </button>

          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };
  return (
    <div className="container mx-auto min-h-screen mt-2">
      <div className="grid grid-cols-12 ">
        <div className="col-span-8 mt-5 mr-20">
          <div className="flex flex-col items-center">
            <div
              className="bg-black"
              style={{ width: "80%", height: 15 }}
            ></div>
            <div className={`${style["trapezoid"]} text-center relative`}>
              <h3 className="text-black font-bold align-middle">Màn hình</h3>
              <div className={`${style["trapezoid-shadow"]}`}></div>
            </div>
            <div className="mt-10">{renderSeats()}</div>
            <div className="mt-5">
              <table className="w-full text-sm text-center text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Ghế chưa đặt
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ghế đang đặt
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ghế đã đặt
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ghế vip
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ghế đã được đăt
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4   p">
                      <button
                        className="ghe-1"
                        style={{ cursor: "no-drop", pointerEvents: "none" }}
                      >
                        00
                      </button>
                    </th>
                    <td class="px-6 py-4">
                      <button
                        className="ghe-1 ghe-6"
                        style={{ cursor: "no-drop", pointerEvents: "none" }}
                      >
                        00
                      </button>
                    </td>
                    <td class="px-6 py-4">
                      <button className="ghe-1 ghe-5">X</button>
                    </td>
                    <td class="px-6 py-4">
                      <button
                        className="ghe-1 ghe-2 "
                        style={{ cursor: "no-drop", pointerEvents: "none" }}
                      >
                        00
                      </button>
                    </td>
                    <td class="px-6 py-4">
                      <button
                        className="ghe-1 ghe-7"
                        style={{ cursor: "no-drop", pointerEvents: "none" }}
                      >
                        <UserOutlined />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
          className="col-span-4 relative "
          style={{ boxShadow: "0 0 5px grey", height: "550px" }}
        >
          <h3 className="text-theme text-center font-bold text-3xl mt-4">
            {danhSachGheDangDat
              .reduce((tongTien = 0, ghe, index) => {
                console.log("ghe: ", ghe);

                return (tongTien += ghe.giaVe);
              }, 0)
              .toLocaleString()}{" "}
            VND
          </h3>
          <hr />
          <div className="flex justify-between px-2 py-4">
            <h3 className="texl-xl font-bold">Tên phim:</h3>
            <h3 className="texl-xl font-bold text-orange-500 text-left">
              {thongTinPhim.tenPhim}
            </h3>
          </div>
          <hr />
          <div className="flex justify-between  px-2 py-4">
            <h3 className="texl-xl font-bold">Cụm rạp:</h3>
            <h3 className="texl-xl font-bold text-left text-orange-500">
              {thongTinPhim.tenCumRap}
            </h3>
          </div>
          <hr />
          <div className="flex justify-between  px-2 py-4">
            <h3 className="texl-xl font-bold">Địa chỉ:</h3>
            <h3 className="texl-xl font-bold text-right text-orange-500">
              {thongTinPhim.diaChi}
            </h3>
          </div>
          <hr />

          <div className="flex justify-between px-2 py-4">
            <h3 className="texl-xl font-bold">Rạp:</h3>
            <h3 className="texl-xl font-bold text-left text-orange-500">
              {thongTinPhim.tenRap}
            </h3>
          </div>
          <hr />
          <div className="flex justify-between  px-2 py-4">
            <h3 className="texl-xl font-bold">Ngày giờ chiếu:</h3>
            <h3 className="texl-xl font-bold text-left text-orange-500">
              {thongTinPhim.ngayChieu}-{" "}
              <span className="text-lime-500">{thongTinPhim.gioChieu}</span>
            </h3>
          </div>
          <hr />
          <div className="flex justify-between  px-2 py-4">
            <h3 className="texl-xl font-bold">Ghế:</h3>
            <h3 className="texl-xl font-bold text-left text-orange-500">
              {_.sortBy(danhSachGheDangDat, "stt").map((gheDD, index) => {
                return (
                  <span className="mr-2" key={index}>
                    {gheDD.stt}
                  </span>
                );
              })}
            </h3>
          </div>

          <div className="flex items-end">
            <div
              onClick={() => {
                const thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = props.match.params.id;
                thongTinDatVe.danhSachVe = danhSachGheDangDat;
                console.log("thongTinDatVe: ", thongTinDatVe);
                dispatch(datVeAction(thongTinDatVe));
              }}
              style={{ borderRadius: "0" }}
              className=" btn-datVe font-medium text-md w-full px-5 py-2.5 text-center absolute bottom-0 left-0"
            >
              ĐẶT VÉ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
