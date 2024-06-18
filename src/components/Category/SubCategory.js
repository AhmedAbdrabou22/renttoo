import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../components/elements/BreadCrumb";
import Product from "../../components/elements/products/Product";
import PageContainer from "../../components/layouts/PageContainer";
import Newletters from "../../components/partials/commons/Newletters";
import { GetSubCategoryItems } from "../../store/categories/action";
import { Slider } from "antd";
import { GetCities } from "../../store/cities/action";
import { useParams } from "react-router-dom";

const SubCategory = () => {
  const [t, i18n] = useTranslation();
  const [quality, setQuality] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [searchArea, setSearchArea] = useState(null);
  const [freeDelivery, setFreeDelivery] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const [lat, setLat] = useState(null);
  const [lang, setLang] = useState(null);
  const [city, setCity] = useState(null);

  const marks = {
    1: "",
    2: t("acceptable"),
    3: t("good"),
    4: t("verygood"),
    5: t("new"),
  };

  const handleFilterChange = (filterSetter) => (value) => {
    filterSetter(value);
    // getItemsSubCategory(sub);
  };

  const fetchCities = async () => {
    try {
      await dispatch(GetCities());
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      fetchCities();
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [fetchCities]);

  const cities = useSelector((state) => state.cities.cities);

  const handleInsurance = (e) => {
    setInsurance(e.target.checked);
  };

  const handleDelivery = (e) => {
    setFreeDelivery(e.target.checked);
  };

  const resetFilters = () => {
    setQuality("");
    setMinPrice("");
    setMaxPrice("");
    setSearchArea("");
    setFreeDelivery("");
    setInsurance("");
    setCity("");
  };

  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLat(latitude);
    setLang(longitude);
  }
  
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    async function fetchData() {
      if (params) {
        await dispatch(
          GetSubCategoryItems({
            id: params.id,
            item_quality: quality,
            min_price: minPrice,
            max_price: maxPrice,
            search_area: searchArea,
            current_latitude: lat,
            current_longitude: lang,
            city_id: city,
            free_delivery: null,
            has_insurance: null,
          })
        );
      }
    }
    fetchData();
  }, [
    params,
    minPrice,
    maxPrice,
    searchArea,
    quality,
    insurance,
    freeDelivery,
    city,
    dispatch,
    lat,
    lang,
  ]);

  const subCategoiesItems = useSelector(
    (state) => state.categories.SubCategoriesItems
  );

  let view;
  if (
    subCategoiesItems &&
    subCategoiesItems.data &&
    subCategoiesItems.data.items &&
    subCategoiesItems.data.items.items_data.data
  ) {
    view = subCategoiesItems.data.items.items_data.data;

  }

  const textAlign = i18n.language === "ar" ? "left" : "right";
  const breadCrumb = [
    {
      text: t("home"),
      url: "/",
    },
    {
      text: `${params.name}`,
    },
  ];
  return (
    <div>
      <PageContainer title="Sub Category Items">
        <div className="ps-page--shop">
          <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
          <div className="p-5" style={{ textAlign }}>
            <div className="row">
              <div className="col-lg-3 col-sm-12 col-md-6">
                <div className="mb-5">
                  <div className="filter-sidebar w-75">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4>{t("Filters")}</h4>
                    </div>
                    <div className="filter-group">
                      <div className="mt-5">
                        <h5>{t("ProductStatus")}</h5>
                        <Slider
                          min={1}
                          max={5}
                          marks={marks}
                          step={1}
                          defaultValue={0}
                          onChange={handleFilterChange(setQuality)}
                          value={quality}
                        />
                      </div>
                      <div className="" style={{ marginTop: "50px" }}>
                        <h5>
                          {t("min-rental")} ({minPrice} EGP)
                        </h5>
                        <input
                          type="number"
                          className="form-control"
                          value={minPrice}
                          onChange={(e) =>
                            handleFilterChange(setMinPrice)(e.target.value)
                          }
                        />
                      </div>
                      <div className="mt-5">
                        <h5>
                          {t("max-rental")} ({maxPrice} EGP)
                        </h5>
                        <input
                          type="number"
                          className="form-control"
                          value={maxPrice}
                          onChange={(e) =>
                            handleFilterChange(setMaxPrice)(e.target.value)
                          }
                        />
                      </div>
                      <div className="mt-5">
                        <h5>{t("chooseCity")}</h5>
                        <select
                          className="form-control"
                          onChange={(e) => setCity(e.target.value)}
                          value={city}
                        >
                          <option hidden>{t("chooseCity")}</option>
                          {cities && cities.data && cities.data.data
                            ? cities.data.data.map((city) => {
                                return (
                                  <option value={city.id}>{city.name}</option>
                                );
                              })
                            : null}
                        </select>
                      </div>
                      <div className="mt-5">
                        <h5>
                          {t("search-area")} ({searchArea} KM)
                        </h5>
                        <input
                          className="form-control"
                          type="range"
                          min="0"
                          max="150"
                          value={searchArea}
                          onChange={(e) =>
                            handleFilterChange(setSearchArea)(e.target.value)
                          }
                        />
                      </div>
                      <div className="mt-5">
                        <input
                          className="mx-2"
                          type="checkbox"
                          onChange={handleInsurance}
                        />
                        <label>{t("Insurance")}</label>
                      </div>
                      <div className="mt-5">
                        <input
                          className="mx-2"
                          type="checkbox"
                          onChange={handleDelivery}
                        />
                        <label>{t("freeDelivery")}</label>
                      </div>
                    </div>
                    <div className="form-group">
                      <button
                        className="ps-btn cairo mt-5"
                        onClick={resetFilters}
                      >
                        {t("resetFilters")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-sm-12 col-md-6">
                <div className="row mt-5 mb-5">
                  {view
                    ? view.map((viewItem) => {
                        return (
                          <div className="col-md-3 col-sm-6 col-6 mb-5">
                            <Product product={viewItem} />
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Newletters />
      </PageContainer>
    </div>
  );
};

export default SubCategory;
