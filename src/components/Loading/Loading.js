import React from "react";
import { useSelector } from "react-redux";
import "./loading.css";
export default function Loading() {
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  return isLoading ? (
    <div
      className="flex justify-center items-center z-50"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)",
      }}
    >
      <div className="loader">
        <div className="inner one" />
        <div className="inner two" />
        <div className="inner three" />
      </div>
    </div>
  ) : (
    ""
  );
}
