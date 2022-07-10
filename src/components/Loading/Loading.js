import React from "react";

export default function Loading() {
  return (
    <div
      className="flex justify-center items-center z-50"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="text-4xl text-white">Loading ...</div>
    </div>
  );
}
