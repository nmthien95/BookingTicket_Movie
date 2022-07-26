import React, { useEffect } from "react";
import "./Detail.css";
import "../../assetss/styles/circle.css";
import { Tabs } from "antd";
import { Rate } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { useViewport } from "../../Hook/useViewport";
import { layThongTinChiTietPhim } from "../../redux/action/QuanLyRapAction";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { PlayCircleOutlined } from "@ant-design/icons";
import { IS_SHOWING } from "../../redux/types/ModalType";

const { TabPane } = Tabs;

export default function Detail(props) {
  const filmDetal = useSelector((state) => state.QuanLyPhimReducer.filmDetail);
  console.log("filmDetal: ", filmDetal);

  const viewPort = useViewport();
  const isMobile = viewPort.width <= 640;

  const dispatch = useDispatch();
  useEffect(() => {
    let { id } = props.match.params;
    dispatch(layThongTinChiTietPhim(id));
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
      <div className="box1 container mx-auto">
        <div className="flex  flex-col lg:flex-row">
          <div className=" mb-4 lg:w-3/4 pr-6">
            <div className="flex ">
              <div className="w-1/2 sm:w-2/5 lg:w-1/3 relative " style={{ maxWidth: "320px" }}>
                <img src={`${filmDetal.hinhAnh}`} alt="123" style={{ width: "100%", height: "100%" }} />
                <div className="detail-2">
                  <button
                    className="detail-3"
                    onClick={() => {
                      dispatch({
                        type: IS_SHOWING,
                        payload: filmDetal.trailer,
                      });
                    }}
                  >
                    <PlayCircleOutlined className="detail-4" />
                  </button>
                </div>
              </div>
              <div className="w-1/2 sm:w-3/5 lg:w-2/3 pl-4">
                <div className=" flex flex-col text-left ">
                  <p className="text-base text-orange-600 sm:mb-4">
                    Ngày chiếu:
                    {moment(filmDetal.ngayKhoiChieu).format("dddd.MMMM.yyyy")}
                  </p>
                  <p className="font-bold text-base sm:text-3xl text-theme mb-3 ">{filmDetal.tenPhim}</p>
                  {filmDetal.moTa && isMobile ? (
                    <p className="text-xs sm:text-base text-gray-800">{filmDetal.moTa.length > 250 ? filmDetal.moTa.slice(0, 250) + "..." : filmDetal.moTa}</p>
                  ) : (
                    <p className="text-xs sm:text-base text-gray-800">{filmDetal.moTa}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className=" flex lg:flex-col lg:items-center lg:w-1/4 justify-between sm:justify-center">
            <div className="flex flex-col justify-around items-center  ">
              <h3 className="  text-orange-600 text-3xl font-bold  text-left m-0">Đánh giá</h3>
              <Rate allowHalf className="text-yellow-400 text-xl sm:text-3xl text-left  " value={filmDetal.danhGia / 2} />
            </div>
            <div className="flex justify-center">
              <div className={`c100 p${filmDetal.danhGia * 10} ${isMobile ? "" : "big"}`}>
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
          className="mt-20 mb-10 mx-auto container  px-5 py-5"
          style={{
            minHeight: 300,
            backgroundColor: "rgba(246, 246, 246, 0.897)",
          }}
        >
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Lịch chiếu" key="1">
              <Tabs tabPosition={isMobile ? "top" : "left"}>
                {filmDetal.heThongRapChieu &&
                  filmDetal.heThongRapChieu.map((heThongRap, index) => {
                    return (
                      <TabPane
                        tab={
                          <div className="text-slate-800">
                            <img src={heThongRap.logo} alt="sdsd" className="rounded-full " width="50" />
                            {heThongRap.tenHeThongRap}
                          </div>
                        }
                        key={index}
                      >
                        {heThongRap.cumRapChieu &&
                          heThongRap.cumRapChieu.map((cumRap, index) => {
                            return (
                              <div key={index} className="mb-2">
                                <div className="flex flex-row">
                                  <img style={{ width: 60, height: 60 }} src={cumRap.hinhAnh} alt="sdfsd" />
                                  <div className="ml-2 ">
                                    <p className="text-sm leading-3 font-bold">{cumRap.tenCumRap}</p>
                                    <p className="text-gray-400">{cumRap.diaChi}</p>
                                  </div>
                                </div>
                                <div className="thong-tin-lich-chieu flex flex-wrap">
                                  {cumRap.lichChieuPhim &&
                                    cumRap.lichChieuPhim.slice(0, 4).map((lichChieu, index) => {
                                      return (
                                        <div className="w-1/2 md:w-1/4 my-2" key={index}>
                                          <NavLink to={`/checkout/${lichChieu.maLichChieu}`} className="block btn-movie-schedule text-teal-600 hover:text-lime-500">
                                            {moment(lichChieu.ngayChieuGioChieu).format("hh:mm A")}
                                          </NavLink>
                                        </div>
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
