import React from 'react';
import Slider from 'react-slick';
import NextArrow from '../../../components/elements/carousel/NextArrow';
import PrevArrow from '../../../components/elements/carousel/PrevArrow';
import BannerOne from "../../../static/img/slider/shop-default/1.jpg"
import bannerTwo from "../../../static/img/slider/shop-default/2.jpg"
const ShopBanner = () => {
    const carouselSetting = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    return (
        <div className="ps-shop-banner">
            <Slider {...carouselSetting} fade={true} className="ps-carousel">
                <img
                    src={BannerOne}
                    alt="Renttoo"
                />
                <img
                    src={bannerTwo}
                    alt="Renttoo"
                />
            </Slider>
        </div>
    );
};

export default ShopBanner;
