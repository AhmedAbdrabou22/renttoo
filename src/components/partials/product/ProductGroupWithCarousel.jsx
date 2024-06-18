import React from "react";
import Slider from "react-slick";
import { carouselStandard } from "../../../utilities/carousel-helpers";
import Product from "../../../components/elements/products/Product";

export const ProductGroupWithCarousel = ({ products, type = "normal" }) => {
  return (
    <div>
       <div className="ps-product-list " style={{ paddingBottom: "30px" }}>
      <div className="ps-container">
    <Slider
      {...carouselStandard}
      slidesToShow={6}
      
      responsive={[
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
          },
        },
      ]}
      infinite={products.length > 5 ? true : false}
      className="ps-carousel outside slider-item px-5"
      style={{ paddingLeft: "30px", paddingRight: "30px" }}
    >
      {products.map((item) => (
        <div className="ps-carousel-item mx-30" key={item.id}>
          <Product product={item} />
        </div>
      ))}
    </Slider>
    </div>
    </div>
  </div>)
};
