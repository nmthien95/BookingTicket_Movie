import React from "react";
import { Radio, Space, Tabs } from "antd";
import { useState } from "react";

const { TabPane } = Tabs;

export default function HomeMenu(props) {
  const { heThongRapChieu } = props;
  const [state, setSate] = useState({
    tabPosition: "left",
  });

  const changeTabPosition = (e) => {
    setSate({ tabPosition: e.target.value });
  };
  const { tabPosition } = state;
  const renderHeThongRap = () => {
    return (
      heThongRapChieu &&
      heThongRapChieu.map((item, index) => {
        return (
          <TabPane
            tab={
              <img
                src={heThongRapChieu.logo}
                alt="sdsd"
                className="rounded-full "
                width="50"
              />
            }
            key="index"
          >
           {heThongRapChieu.lstCumRap.map()}
          </TabPane>
        );
      })
    );
  };
  return (
    <>
      <Tabs tabPosition={tabPosition}>{renderHeThongRap()}</Tabs>
    </>
  );
}
