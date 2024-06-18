import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { GetAllCategories } from "../../../../store/categories/action";
import HeaderTopTitle from "../../../../components/shared/headers/HeaderTopTitle";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ProductGroupWithCarousel } from "../../product/ProductGroupWithCarousel";
import Slider from "react-slick";
import { carouselStandard } from "../../../../utilities/carousel-helpers";
import Product from "../../../elements/products/Product";
import NextArrow from "../../../elements/carousel/NextArrow";
import PrevArrow from "../../../elements/carousel/PrevArrow";

const HomeDefaultTopCategories = () => {
  const [t, i18n] = useTranslation();
  const lang = i18n.language;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Get ALL Categories Data
  const getCategories = async (lang) => {
    try {
      setLoading(true);
      await dispatch(GetAllCategories(i18n.language));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getCategories(lang);
  }, [dispatch, lang]);
  const carouselSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const categories = useSelector((state) => state.categories.Categories);
  return (
    <div>
      <div className="ps-top-categories" style={{textAlign:i18n.language=='ar' ?'left':'right'}}>
        <HeaderTopTitle title={t("categoriesPart")} />
        <div
          className="ps-container"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Slider
            {...carouselSettings}
            infinite={categories?.data?.categories.length > 5 ? true : false}
            slidesToShow={5}
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
                  slidesToShow: 1,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                },
              },
              {
                breakpoint: 576,
                settings: {
                  slidesToShow: 1,
                },
              },
            ]}
            className="ps-carousel outside slider-item "
            style={{
              minWidth: "450px",
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
            {categories?.data?.categories.map((item) => (
              <div
                className="ps-carousel-item "
                style={{
                  width: "100%",
                  display: "grid",
                  justifyContent: "center",
                }}
                key={item.id}
              >
                <Link
                  style={{
                    width: "100%",
                    display: "grid",
                    justifyContent: "center",
                  }}
                  to={`/category/${item.name.replace(/\s+/g, "_")}/${item.id}`}
                >
                  <Product features={true} product={item} />
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HomeDefaultTopCategories;
