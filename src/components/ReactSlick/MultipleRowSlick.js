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
    centerMode: false,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 500,
    rows: 2,

    dots: true,
    variableWidth: true,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          arrows: false,
          autoplay: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
          autoplay: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          autoplay: true,
        },
      },
    ],
  };
  return (
    <div>
      <div className="text-center  mb-7">
        <div className="inline-flex">
          <button
            className=" mr-2 relative inline-flex items-center justify-center  mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-r from-green-400 to-blue-400  "
            onClick={() => {
              dispatch({ type: SET_FILM_DANG_CHIEU });
            }}
          >
            <span
              className={`relative px-5 py-2.5 transition-al inline-block ease-in duration-75  rounded-md group-hover:bg-opacity-0 ${styleSlick[activeClassDC]}`}
            >
              PHIM ĐANG CHIẾU
            </span>
          </button>

          <button className="relative inline-flex items-center justify-center  mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-r from-green-400 to-blue-400    ">
            <span
              className={`relative px-5 py-2.5 transition-all inline-block ease-in duration-75  rounded-md group-hover:bg-opacity-0 ${styleSlick[activeClassSP]}`}
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
