import React, { Component } from "react";
import Slider from "react-slick";

import styleSlick from "./MultipleRowSlick.module.css";
import { useDispatch, useSelector } from "react-redux";
import Film_Flip from "../Film/Film_Flip";
import {
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
} from "../../redux/types/QuanLyPhimType";

const MultipleRowSlick = (props) => {
  const dispatch = useDispatch();
  const { dangChieu, sapChieu } = useSelector(
    (state) => state.QuanLyPhimReducer
  );

  let activeClass = () => {
    if (dangChieu === true && sapChieu === false) {
      return "active-btn-filmDC";
    }
    return "active-btn-filmSC";
  };
  const renderFilm = () => {
    return props.arrFilm.slice(0, 12).map((item, index) => {
      return (
        <div key={index}>
          <Film_Flip item={item} />
        </div>
      );
    });
  };

  const settings = {
    className: "center variable-width ",
    centerMode: false,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 500,
    rows: 2,
    arrows: false,
    dots: true,
    variableWidth: true,
    autoplay: true,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <div className="text-center  mb-7">
        <div className="inline-flex w-max my-1  flex-shrink-0  p-1 btn-theme  rounded-xl ">
          <div className="flex w-max   flex-shrink-0  bg-transparent rounded-xl relative">
            <button
              onClick={() => {
                dispatch({ type: SET_FILM_DANG_CHIEU });
              }}
              className="px-2 py-1 w-30 lg:w-32 rounded-xl font-medium  hover:text-slate-800 z-10 relative duration-500 text-slate-700"
            >
              Phim đang chiếu
            </button>
            <button
              onClick={() => {
                dispatch({ type: SET_FILM_SAP_CHIEU });
              }}
              className="px-2 py-1 w-30 lg:w-32 rounded-xl font-medium hover:text-slate-800  z-10 relative duration-500 text-slate-700"
            >
              Phim sắp chiếu
            </button>
            <span
              className={`absolute left-0 top-0 w-24 lg:w-32 h-full  bg-white rounded-xl  transition ease-out duration-500 ${
                styleSlick[activeClass()]
              }`}
            />
          </div>
        </div>
      </div>
      <Slider {...settings}>{renderFilm()}</Slider>
    </div>
  );
};

export default MultipleRowSlick;
