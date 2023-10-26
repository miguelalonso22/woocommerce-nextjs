import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SliderCard } from "../../containers";
import { Product } from "../../utils/wooCommerceTypes";
import React from "react";
// import "../../styles/sliderStyles.css"

interface Props {
    products: Product[];
  }

export const SimpleSlider = (props: Props) => {
    const { products } = props;

    function SampleNextArrow(props: any) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "black" }}
            onClick={onClick}
          />
        );
      }
      
      function SamplePrevArrow(props: any) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
          />
        );
      }
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "20%",
        slidesToShow: 3,
        speed: 500,
        focusOnSelect: true,
        dots: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
return (
  <Slider {...settings}>
    {products.map((product, index) => {
      return (
          <SliderCard product={product} key={product.id}/>
      );
    })}
  </Slider>
);
};
