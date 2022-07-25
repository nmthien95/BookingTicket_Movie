import React from "react";
import "./Film_Flip.css";
import { PlayCircleOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

import { useDispatch } from "react-redux";
import { IS_SHOWING } from "../../redux/types/ModalType";

export default function Film_Flip(props) {
  const dispatch = useDispatch();
  const { item } = props;

  return (
    <div className="flip-card mb-10">
      <div className="flip-card-inner rounded-lg">
        <div className="flip-card-front ">
          <img src={item.hinhAnh} alt={item.tenPhim} style={{ width: "100%", height: "100%" }} />
        </div>
        <div className="flip-card-back" style={{ position: "relative", backgroundColor: "rgba(0,0,0,.9)" }}>
          <div className="w-full h-full" style={{ position: "absolute", top: 0, left: 0 }}>
            <img src={item.hinhAnh} alt={item.tenPhim} style={{ width: "100%", height: "100%" }} />
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
              <button
                className="rounded-full cursor-pointer"
                onClick={() => {
                  dispatch({ type: IS_SHOWING, payload: item.trailer });
                }}
              >
                <PlayCircleOutlined style={{ fontSize: "50px" }} />
              </button>

              <div className="text-xl mt-2 font-bold text-slate-400">{item.tenPhim}</div>
            </div>
          </div>
        </div>
      </div>
      <NavLink to={`/detail/${item.maPhim}`} className="btn-datVe">
        Đặt vé
      </NavLink>
    </div>
  );
}
