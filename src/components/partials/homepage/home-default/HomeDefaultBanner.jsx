import React, { useEffect, useState } from "react";
import NextArrow from "../../../../components/elements/carousel/NextArrow";
import PrevArrow from "../../../../components/elements/carousel/PrevArrow";
import { useDispatch, useSelector } from "react-redux";
import { GetAllSlider } from "../../../../store/categories/action";
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick";
import { Autoplay } from "swiper/modules";
const HomeDefaultBanner = () => {

  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const getSliders = async () => {
    setLoading(true);
    try {
      await dispatch(GetAllSlider());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSliders();
  }, [dispatch, i18n.language]);

  const sliders = useSelector((state) => state.categories.Sliders);

    
 
  const carouselSetting = {
    dots: false,
    infinite: true,
    speed: 750,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  
  let mainCarouselView;
  if (sliders && sliders.data) {
    if (sliders.data.sliders && sliders.data.sliders.length > 0) {
      mainCarouselView = (
        <Slider
          {...carouselSetting}
          className="ps-carousel"
        >
          <>
            {sliders.data.sliders.map((slider) => (
              <>
                <div className="slide-item" key={slider.id}>
                    <img
                      width="100%"
                      src={slider.image}
                      alt={slider.title}
                    />
                </div>
              </>
            ))}
          </>
        </Slider>
      );
    } else {
      mainCarouselView = <div>No sliders available</div>;
    }
  } else {
    mainCarouselView = <div>Loading...</div>;
  }

  const settings = {
    dots:true,
    centerMode: true,
    centerPadding: "20px",
    slidesToShow: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 1000,
        responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    // <div className="ps-home-banner p-4">
    //   <div className="ps-container justify-content-center">
    //     <div className="ps-section__left" >{mainCarouselView}</div>
    //   </div>
    // </div>

    <div >
    <Slider {...settings} 
>
    {sliders?.data?.sliders?.map((slider) => (
              <>
                <div className="slide-item" style={{ padding: '20px',justifyContent: "center" ,display:'grid'  }} key={slider.id}>
                    <img
                      height="600px"
                      src={slider.image}
                      alt={slider.title}
                    />
                </div>
              </>
            ))}
    {/* Add more slides here */}
  </Slider>
  </div>
  );};

  export default HomeDefaultBanner;
  