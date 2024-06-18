import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/elements/BreadCrumb";
import ShopBanner from "../../components/partials/shop/ShopBanner";
import ShopBrands from "../../components/partials/shop/ShopBrands";
import PageContainer from "../../components/layouts/PageContainer";
import Newletters from "../../components/partials/commons/Newletters";
import { useDispatch, useSelector } from "react-redux";
import { GetSubCategoryFromCategory } from "../../store/categories/action";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

const ShopDefaultPage = () => {
  const [t, i18n] = useTranslation();

  const index = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Shop Default",
    },
  ];

  const getSubCategory = async (index) => {
    try {
      setLoading(true);
      await dispatch(
        GetSubCategoryFromCategory({
          id: index.id,
          lang: i18n.language,
        })
      );
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (index) {
      getSubCategory(index);
    }
  }, [index]);

  const subCategoties = useSelector((state) => state.categories.SubCategory);

  return (
    <PageContainer title="Shop">
      <div className="ps-page--shop">
        <div className="ps-container">
          <ShopBanner />
          {/* <ShopBrands /> */}
          <div className="ps-top-categories">
            <div className="ps-container">
              <Swiper
                modules={[Navigation, Pagination, A11y, Autoplay]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                loop={true}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  "@0.00": {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  "@0.75": {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  "@1.00": {
                    slidesPerView: 3,
                    spaceBetween: 40,
                  },
                  "@1.50": {
                    slidesPerView: 6,
                    spaceBetween: 50,
                  },
                }}
                className="mySwiper mt-5"
              >
                {subCategoties &&
                subCategoties.data &&
                subCategoties.data.sub_categories
                  ? subCategoties.data.sub_categories.map((category) => (
                      <SwiperSlide
                        style={{ height: "190.5px" }}
                        key={category.id}
                      >
                        <Link
                          to={`/category/${index.name}/${index.id}/${category.description.replace(/\s+/g, "_")}/${category.id}`}
                        >
                          <div className="ps-block--category">
                            <div className="w-50 h-50 text-center mx-auto">
                              <img
                                src={category.image}
                                style={{
                                  width: "120px",
                                  height: "120px",
                                }}
                                alt="Renttoo"
                              />
                            </div>
                            <p className="category-name">{category.name}</p>
                          </div>
                        </Link>
                      </SwiperSlide>
                    ))
                  : null}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      <Newletters />
    </PageContainer>
  );
};

export default ShopDefaultPage;
