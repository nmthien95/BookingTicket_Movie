import React from "react";
import HomeMenu from "./HomeMenu/HomeMenu";

import { useSelector, useDispatch } from "react-redux";
import MultipleRowSlick from "../../components/ReactSlick/MultipleRowSlick";
import { useEffect } from "react";
import { layDanhPhimAction } from "../../redux/action/QuanLyPhimAction";
import { layDanhSachHeThongRapAction } from "../../redux/action/QuanLyRapAction";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";

export default function Home(props) {
  const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhPhimAction());
    dispatch(layDanhSachHeThongRapAction());
  }, []);
  return (
    <div>
      <HomeCarousel />
      <section className="text-gray-600 body-font  	">
        <div className="container px-5 py-24 mx-auto">
          <MultipleRowSlick arrFilm={arrFilm} />
        </div>
      </section>
      <div id="cumRap" className="container mx-auto">
        <HomeMenu heThongRapChieu={heThongRapChieu} />
      </div>
    </div>
  );
}
