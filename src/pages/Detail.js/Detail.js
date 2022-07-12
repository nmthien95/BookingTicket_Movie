import React, { useEffect } from "react";
import "./Detail.css";
import "../../assetss/styles/circle.css";
import { Radio, Space, Tabs } from "antd";
import { Rate } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { SET_CHI_TIET_PHIM } from "../../redux/types/QuanLyRapType";
import { layThongTinChiTietPhim } from "../../redux/action/QuanLyRapAction";
import moment from "moment";
import { NavLink } from "react-router-dom";
const { TabPane } = Tabs;

export default function Detail(props) {
  const filmDetal = useSelector((state) => state.QuanLyPhimReducer.filmDetail);
  console.log("filmDetal: ", filmDetal);

  const dispatch = useDispatch();
  useEffect(() => {
    let { id } = props.match.params;
    dispatch(layThongTinChiTietPhim(id));
    console.log(id);
  }, []);
  return (
    <div
      className="detail-1"
      style={{
        backgroundImage: `url(${filmDetal.hinhAnh})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="box1">
        <div className="grid grid-cols-12">
          <div className="col-span-5 col-start-3">
            <div className="grid grid-cols-3">
              <img
                className="col-span-1"
                src={`${filmDetal.hinhAnh}`}
                alt="123"
                style={{ width: "100%", height: 300 }}
              />
              <div className="col-span-2 flex flex-col justify-around text-left ml-5">
                <p className="text-sm">
                  Ngày chiếu:
                  {moment(filmDetal.ngayKhoiChieu).format("dd.mm.yyyy")}
                </p>
                <p className="text-3xl text-white">{filmDetal.tenPhim}</p>
                <p>{filmDetal.moTa}</p>
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="ml-10 ">
              <h3 className="  text-orange-600 text-lg font-bold pl-20 text-left m-0">
                Đánh giá
              </h3>
              <Rate
                allowHalf
                className="text-yellow-400  text-left"
                style={{ paddingLeft: "3.2rem", display: "block" }}
                value={filmDetal.danhGia / 2}
              />
              <div className={`c100 p${filmDetal.danhGia * 10} big  `}>
                <span>{filmDetal.danhGia * 10}%</span>
                <div className="slice">
                  <div className="bar" />
                  <div className="fill" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="mt-20 mb-10 w-2/3 mx-auto container  px-5 py-5"
          style={{
            minHeight: 300,
            backgroundColor: "rgba(246, 246, 246, 0.897)",
          }}
        >
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Lịch chiếu" key="1">
              <Tabs tabPosition={"left"}>
                {filmDetal.heThongRapChieu &&
                  filmDetal.heThongRapChieu.map((heThongRap, index) => {
                    return (
                      <TabPane
                        tab={
                          <div className="text-slate-800">
                            <img
                              src={heThongRap.logo}
                              alt="sdsd"
                              className="rounded-full "
                              width="50"
                            />
                            {heThongRap.tenHeThongRap}
                          </div>
                        }
                        key={index}
                      >
                        {heThongRap.cumRapChieu &&
                          heThongRap.cumRapChieu.map((cumRap, index) => {
                            return (
                              <div key={index}>
                                <div className="flex flex-row">
                                  <img
                                    style={{ width: 60, height: 60 }}
                                    src={cumRap.hinhAnh}
                                    alt="sdfsd"
                                  />
                                  <div className="ml-2 ">
                                    <p className="text-xl leading-3 font-bold">
                                      {cumRap.tenCumRap}
                                    </p>
                                    <p className="text-gray-400">
                                      {cumRap.diaChi}
                                    </p>
                                  </div>
                                </div>
                                <div className="thong-tin-lich-chieu grid grid-cols-4">
                                  {cumRap.lichChieuPhim &&
                                    cumRap.lichChieuPhim
                                      .slice(0, 4)
                                      .map((lichChieu, index) => {
                                        return (
                                          <NavLink
                                            to={`/checkout/${lichChieu.maLichChieu}`}
                                            key={index}
                                            className="col-span-1 mr-2 btn-movie-schedule text-teal-500 hover:text-lime-500"
                                          >
                                            {moment(
                                              lichChieu.ngayChieuGioChieu
                                            ).format("hh:mm A")}
                                          </NavLink>
                                        );
                                      })}
                                </div>
                              </div>
                            );
                          })}
                      </TabPane>
                    );
                  })}
              </Tabs>
            </TabPane>
            <TabPane tab="Thông tin" key="2">
              Thông tin
            </TabPane>
            <TabPane tab="Đánh giá" key="3">
              Đánh giá
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
