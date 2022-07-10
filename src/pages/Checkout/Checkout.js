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
import { Tabs } from "antd";
import { layThongTinNGuoiDungAction } from "../../redux/action/QuanLyNguoiDungAction";
import moment from "moment";

function Checkout(props) {
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

const { TabPane } = Tabs;
const onChange = (key) => {
  console.log(key);
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (props) {
  return (
    <div className="p-5">
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1">
          <Checkout {...props} />
        </TabPane>
        <TabPane tab="02 Kết quả đặt vé" key="2">
          <KetQuaDatVe {...props} />
        </TabPane>
      </Tabs>
    </div>
  );
}
function KetQuaDatVe(props) {
  const dispatch = useDispatch();
  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  console.log("thongTinNguoiDung: ", thongTinNguoiDung);

  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  useEffect(() => {
    dispatch(layThongTinNGuoiDungAction());
  }, []);
  const renderTicketItem = () => {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
      const seats = _.first(ticket.danhSachGhe);
      return (
        <div className="py-8 px-4 lg:w-1/3 ">
          <div
            className="h-full flex items-start  p-2 "
            style={{ boxShadow: "0 0 5px grey" }}
          >
            <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
              <span className="text-orange-400 pb-2 mb-2 border-b-2 border-gray-200">
                {moment(ticket.ngayDat).format("MMMM")}
              </span>
              <span className="font-medium text-lg text-orange-700 title-font leading-none">
                {moment(ticket.ngayDat).format("DD")}
              </span>
            </div>
            <div className="flex-grow pl-6">
              <div className="flex items-center">
                <img
                  className="h-16 w-16 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src={ticket.hinhAnh}
                  alt=""
                />
                <div>
                  <div className="flex-grow">
                    <h1 className="title-font text-xl font-medium text-lime-500 mb-3">
                      {ticket.tenPhim}
                    </h1>
                    <p className="text-gray-500 mt-2">
                      <span className="text-gray-700 font-bold">
                        Ngày, giờ chiếu:{" "}
                      </span>
                      {moment(ticket.ngayDat).format("DD-MM-YY")} -{" "}
                      {moment(ticket.ngayDat).format("hh:mm A ")}
                    </p>
                    <p>
                      <span className="text-gray-700 font-bold">
                        Địa điểm:{" "}
                      </span>
                      {seats.tenHeThongRap}
                    </p>
                    <p>
                      <span className="text-gray-700 font-bold">Tên rạp: </span>
                      {seats.tenCumRap} -{" "}
                      <span className="text-gray-700 font-bold">Gế: </span>{" "}
                      {ticket.danhSachGhe.map((ghe, index) => {
                        return <span key={index}>{ghe.tenGhe} </span>;
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="p-5">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-theme">
              Lịch sử đặt vé khách hàng
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Hãy xem thông tin địa điểm và thời gian để xem phim vui vẻ bạn nhé
            </p>
          </div>
          <div className="flex flex-wrap -mx-4 -my-8">{renderTicketItem()}</div>
        </div>
      </section>
    </div>
  );
}
