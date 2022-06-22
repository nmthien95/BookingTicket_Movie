import React from "react";
import "./Film_Flip.css";
import { PlayCircleOutlined } from "@ant-design/icons";

export default function Film_Flip(props) {
  const { item } = props;
  return (
    <div className="flip-card mb-10">
      <div className="flip-card-inner rounded-lg">
        <div className="flip-card-front ">
          <img
            src={item.hinhAnh}
            alt={item.tenPhim}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div
          className="flip-card-back"
          style={{ position: "relative", backgroundColor: "rgba(0,0,0,.9)" }}
        >
          <div
            className="w-full h-full"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <img
              src={item.hinhAnh}
              alt={item.tenPhim}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div
            className="w-full h-full"
            style={{
              position: "absolute",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <div className="rounded-full cursor-pointer">
                <PlayCircleOutlined style={{ fontSize: "50px" }} />
              </div>
              <div className="text-2xl mt-2 font-bold ">{item.tenPhim}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="btn-datVe">Đặt vé</div>
    </div>
  );
}
