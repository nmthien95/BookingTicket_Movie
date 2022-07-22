import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinChiTietPhim } from "../../../redux/action/QuanLyRapAction";
import "./SearchMovie.css";
import moment from "moment";

import { NavLink } from "react-router-dom";

export default function SearchMoive() {
  const dispatch = useDispatch();
  const { arrFilm, filmDetail } = useSelector((state) => state.QuanLyPhimReducer);
  let [lstLichChieu, setArrLichChieu] = useState([]);
  let [maLichChieu, setMaLichChieu] = useState("");
  console.log("filmDetail: ", filmDetail);
  console.log(arrFilm);

  const renderOptionCinema = () => {
    let i = 0;

    return filmDetail.heThongRapChieu?.map((htr, index) => {
      i++;
      return htr.cumRapChieu.map((cumRap, index) => {
        return (
          <option value={cumRap.maCumRap} key={i} disabled="">
            {cumRap.tenCumRap}
          </option>
        );
      });
    });
  };

  const handleChangeCinema = (e) => {
    let arrLichChieu = [];
    const maCumRap = e.target.value;
    filmDetail.heThongRapChieu?.forEach((htr) => {
      htr.cumRapChieu.forEach((cumRap) => {
        if (cumRap.maCumRap == maCumRap) {
          arrLichChieu = cumRap.lichChieuPhim?.map((lichChieu, index) => {
            return lichChieu;
          });
          setArrLichChieu([...lstLichChieu, ...arrLichChieu]);
          console.log(arrLichChieu);
          return;
        }
      });
    });
  };
  const renderOptionFilm = () => {
    return arrFilm?.map((film, index) => {
      return <option value={film.maPhim}>{film.tenPhim}</option>;
    });
  };

  const handleChangeFlims = (e) => {
    const maPhim = e.target.value;
    setArrLichChieu([]);
    dispatch(layThongTinChiTietPhim(maPhim));
  };
  const renderOptionShowTime = () => {
    return lstLichChieu?.map((lichChieu, index) => {
      return <option value={lichChieu.maLichChieu}>{moment(lichChieu.ngayChieuGioChieu).format("DD/MM/YYYY ~ hh:mm")}</option>;
    });
  };
  const handleShowTime = (e) => {
    setMaLichChieu(e.target.value);
  };
  return (
    <div className="container mx-auto search-moive">
      <div className="seacrh-container bg-slate-200 flex py-2">
        <div className="search-item basis-1/3 border-r-2 border-gray-300">
          <select name="film" className="select-text" onChange={handleChangeFlims}>
            <option selected>Phim</option>
            {renderOptionFilm()}
          </select>
        </div>
        <div className="search-item basis-1/4 border-gray-300	border-r-2">
          <select name="rap" className="select-text" onChange={handleChangeCinema}>
            <option selected>Rap</option>
            {renderOptionCinema()}
          </select>
        </div>
        <div className="search-item basis-1/4	border-r-2 border-gray-300">
          <select name="ngayGioChieu" className="select-text" onChange={handleShowTime}>
            <option selected>Ngày giờ chiếu</option>
            {renderOptionShowTime()}
          </select>
        </div>
        <div className="search-item basis-2/12 ">
          <div className="w-full h-full flex justify-center items-center">
            <NavLink to={`/checkout/${maLichChieu}`} className="btn-theme flex items-center justify-center px-2 py-1 h-full md:text-sm font-bold text-xs w-11/12">
              MUA VÉ NGAY
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
