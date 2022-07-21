import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinChiTietPhim } from "../../../redux/action/QuanLyRapAction";
import "./SearchMovie.css";

export default function SearchMoive() {
  const dispatch = useDispatch();

  const { arrFilm, filmDetail } = useSelector((state) => state.QuanLyPhimReducer);
  console.log("filmDetail: ", filmDetail);
  console.log(arrFilm);
  const renderOptionRap = () => {
    let i = 0;
    return filmDetail.heThongRapChieu?.map((htr, index) => {
      i++;
      return htr.cumRapChieu.map((cumRap, index) => {
        i++;
        return (
          <option value="" key={i} disabled="">
            {cumRap.tenCumRap}
          </option>
        );
      });
    });
  };
  const renderOptionFilm = () => {
    return arrFilm.map((film, index) => {
      return <option value={film.maPhim}>{film.tenPhim}</option>;
    });
  };
  const handleChangeFlims = (e) => {
    const maPhim = e.target.value;
    dispatch(layThongTinChiTietPhim(maPhim));
  };
  return (
    <div className="container search-moive">
      <div className="seacrh-container bg-slate-200 flex py-2">
        <div className="search-item basis-1/3 border-r-2 border-gray-300">
          <select name="film" className="font-bold bg-slate-200 text-base px-4 cursor-pointer" onChange={handleChangeFlims}>
            <option selected disabled>
              Phim
            </option>
            {renderOptionFilm()}
          </select>
        </div>
        <div className="search-item basis-1/4 border-gray-300	border-r-2">
          <select name="rap" className="font-bold text-base px-4 cursor-pointer bg-slate-200">
            <option selected disabled>
              Rap
            </option>
            {renderOptionRap()}
          </select>
        </div>
        <div className="search-item basis-1/4	border-r-2 border-gray-300">
          <select name="ngayGioChieu" className="font-bold text-base  px-4 cursor-pointer bg-slate-200">
            <option selected disabled>
              Ngày giờ chiếu
            </option>
            <option value="ádsa">Phiádsadm</option>
          </select>
        </div>
        <div className="search-item basis-2/12 ">
          <div className="w-full h-full flex justify-center items-center">
            <button className="btn-theme px-2 py-3  font-bold w-11/12">MUA VÉ NGAY</button>
          </div>
        </div>
      </div>
    </div>
  );
}
