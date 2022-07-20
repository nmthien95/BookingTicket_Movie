import React, { Fragment } from "react";
import { Radio, Space, Tabs } from "antd";

import { NavLink } from "react-router-dom";

import "./HomeMenu.css";
import moment from "moment";
import { useViewport } from "../../../util/settings/config";

const { TabPane } = Tabs;

export default function HomeMenu(props) {
  const { heThongRapChieu } = props;

  const viewPort = useViewport();
  const isMobile = viewPort.width <= 1030;

  const renderHeThongRap = () => {
    return (
      heThongRapChieu &&
      heThongRapChieu.map((heThongRap, index) => {
        return (
          <TabPane tab={<img src={heThongRap.logo} alt="sdsd" className="rounded-full " width="50" />} key={index}>
            {/**Load cụm rap tương ứng */}
            <Tabs tabPosition={isMobile ? "top" : "left"}>
              {heThongRap.lstCumRap &&
                heThongRap.lstCumRap.map((cumRap, index) => {
                  return (
                    <TabPane
                      className="films-schedule "
                      tab={
                        <div className="w-2/5">
                          <div className="text-left ml-2 pt-3">
                            <h4 className="text-lime-600">{cumRap.tenCumRap}</h4>

                            {cumRap.diaChi.length > 50 ? <p className="text-gray-400">{cumRap.diaChi.slice(0, 50)} ...</p> : <p className="text-gray-400">{cumRap.diaChi}</p>}
                            <p className="text-red-400 text-base font-medium	">Chi tiết</p>
                          </div>
                        </div>
                      }
                      key={index}
                    >
                      {/**Load phim tương ứng */}
                      {cumRap.danhSachPhim.map((phim, index) => {
                        return (
                          <div className="d-flex20 line-80 w-full">
                            <div>
                              <img
                                className="img-tap-film"
                                src={phim.hinhAnh}
                                alt={phim.tenPhim}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "https://picsum.photos/75/75";
                                }}
                              />
                            </div>
                            <div className="tab-movie-content grow px-3">
                              <h2 className="text-lg font-medium	">
                                <span className="movie-id bg-orange-600">{phim.maPhim}</span>
                                {phim.tenPhim}
                              </h2>
                              <div className="movie-schedule">
                                <div className="grid grid-cols-2 gap-2">
                                  {phim.lstLichChieuTheoPhim &&
                                    phim.lstLichChieuTheoPhim.slice(0, 4).map((item, index) => {
                                      return (
                                        <NavLink className="btn-movie-schedule text-teal-500 hover:text-lime-500" to={`/checkout/${item.maLichChieu}`} key={index}>
                                          {moment(item.ngayChieuGioChieu).format("hh:mm A")}
                                        </NavLink>
                                      );
                                    })}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </TabPane>
                  );
                })}
            </Tabs>
          </TabPane>
        );
      })
    );
  };
  return (
    <div id="movie-tabs" className="flex flex-col">
      <Space
        style={{
          marginBottom: 24,
        }}
      >
        Tap Responsive:
      </Space>
      <Tabs tabPosition={isMobile ? "top" : "left"} className="w-full">
        {renderHeThongRap()}
      </Tabs>
    </div>
  );
}
