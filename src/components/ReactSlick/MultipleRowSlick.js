import React, { Component } from "react";
import Slider from "react-slick";
import Film from "../Film/Film";
import styleSlick from "./MultipleRowSlick.module.css";
import { useDispatch, useSelector } from "react-redux";
import Film_Flip from "../Film/Film_Flip";
import {
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
} from "../../redux/types/QuanLyPhimType";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    ></div>
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block", left: "-50px" }}
      onClick={onClick}
    ></div>
  );
}

const MultipleRowSlick = (props) => {
  const dispatch = useDispatch();
  const { dangChieu, sapChieu } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  let activeClassDC =
    dangChieu === true ? "active-btn-film" : "none-active-btn-film";
  let activeClassSP =
    sapChieu === true ? "active-btn-film" : "none-active-btn-film";
  const renderFilm = () => {
    return props.arrFilm.slice(0, 12).map((item, index) => {
      return (
        // className={`${styleSlick['width-item']}`}
        <div key={index}>
          <Film_Flip item={item} />
        </div>
      );
    });
  };

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div>
      <div className="text-center  mb-7">
        <div className="inline-flex">
          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-4 overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900  dark:focus:ring-lime-800"
            onClick={() => {
              dispatch({ type: SET_FILM_DANG_CHIEU });
            }}
          >
            <span
              className={`relative px-5 py-2.5 transition-all ease-in duration-75 bg-teal-100 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 ${styleSlick[activeClassDC]}`}
            >
              PHIM ĐANG CHIẾU
            </span>
          </button>

          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900  dark:focus:ring-lime-800">
            <span
              className={`relative px-5 py-2.5 transition-all ease-in duration-75 bg-teal-100 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 ${styleSlick[activeClassSP]}`}
              onClick={() => {
                dispatch({ type: SET_FILM_SAP_CHIEU });
              }}
            >
              PHIM SẮP CHIẾU
            </span>
          </button>
        </div>
      </div>
      <Slider {...settings}>{renderFilm()}</Slider>
    </div>
  );
};

export default MultipleRowSlick;
