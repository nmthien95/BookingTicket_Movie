import React from "react";
import HomeMenu from "./HomeMenu/HomeMenu";

import { useSelector, useDispatch } from "react-redux";
import MultipleRowSlick from "../../components/ReactSlick/MultipleRowSlick";
import { useEffect } from "react";
import { layDanhPhimAction } from "../../redux/action/QuanLyPhimAction";

export default function Home(props) {
  const { arrFilm, heThognRapChieu } = useSelector(
    (state) => state.QuanLyPhimReducer
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhPhimAction());
  }, []);
  return (
    <div>
      <section className="text-gray-600 body-font  	">
        <div className="container px-5 py-24 mx-auto">
          <MultipleRowSlick arrFilm={arrFilm} />
        </div>
      </section>
      <div className="mx-36">
        <HomeMenu heThongRapChieu={heThognRapChieu} />
      </div>
    </div>
  );
}
