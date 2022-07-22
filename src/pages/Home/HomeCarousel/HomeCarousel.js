import React from "react";
import { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./HomeCarousel.css";
import { getCarouselAction } from "../../../redux/action/CarouselAction";
const contentStyle = {
  height: "100vh",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "100%",
};

export default function HomeCarousel(props) {
  const { arrImg } = useSelector((state) => state.CarouselReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarouselAction());
  }, []);

  const renderImg = () => {
    return arrImg.map((item, index) => {
      return (
        <div key={index} className="w-full">
          <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}>
            <img src={item.hinhAnh} className="w-full h-full opacity-0" alt="sasa" />
          </div>
        </div>
      );
    });
  };
  return (
    <Carousel className="home-carousel " autoplay>
      {renderImg()}
    </Carousel>
  );
}
