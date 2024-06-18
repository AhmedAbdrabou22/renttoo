import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/elements/BreadCrumb";
import Product from "../../components/elements/products/Product";
import PageContainer from "../../components/layouts/PageContainer";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "../../store/search/action";
import Pagination from "../../utilities/Pagination";
import { useTranslation } from "react-i18next";
import { Slider } from "antd";
import { GetCities } from "../../store/cities/action";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const [t, i18n] = useTranslation();
  const [currentpage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const params = useParams();
  const dispatch = useDispatch();

  const [quality, setQuality] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [searchArea, setSearchArea] = useState(null);
  const [freeDelivery, setFreeDelivery] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const [lat, setLat] = useState(null);
  const [lang, setLang] = useState(null);
  const [city, setCity] = useState(null);

  function handleSetKeyword() {
    if (params && params.keyword !== "") {
      setKeyword(params.keyword);
      setCurrentPage(1);
    } else {
      setKeyword("");
    }
  }

  useEffect(() => {
    handleSetKeyword();
  }, [params]);

  // reset Filters

  const resetFilters = () => {
    setQuality("");
    setMinPrice("");
    setMaxPrice("");
    setSearchArea("");
    setFreeDelivery("");
    setInsurance("");
    setCity("");
  };

  // Filters Data
  useEffect(() => {
    async function fetchData() {
      if (keyword !== "") {
        await dispatch(
          Search({
            search: keyword,
            item_quality: quality,
            min_price: minPrice,
            max_price: maxPrice,
            search_area: searchArea,
            current_latitude: lat,
            current_longitude: lang,
            free_delivery: freeDelivery,
            has_insurance: insurance,
            city_id: city,
            page: currentpage,
          })
        );
      }
    }
    fetchData();
  }, [
    keyword,
    currentpage,
    minPrice,
    maxPrice,
    searchArea,
    quality,
    insurance,
    freeDelivery,
    city,
  ]);

  const searchResult = useSelector((state) => state.search.getSearch);

  const getPage = (page) => {
    setCurrentPage(page);
    scrollToHeader();
  };

  const scrollToHeader = () => {
    const headerElement = document.getElementById("search-header");
    if (headerElement) {
      headerElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleFilterChange = (filterSetter) => (value) => {
    setCurrentPage(1);
    filterSetter(value);
  };

  const breadcrumb = [
    {
      text: t("home"),
      url: "/",
    },
    {
      text: t("SearchResult"),
    },
  ];

  let shopItemsView;
  if (searchResult && searchResult.data && searchResult.data.items) {
    if (
      searchResult.data.items.items_data.data &&
      searchResult.data.items.items_data.data.length > 0
    ) {
      shopItemsView = (
        <div className="ps-product-items row">
          {searchResult.data.items.items_data.data.map((item) => (
            <div className="col-md-3 col-sm-6 col-6" key={item.id}>
              <Product product={item} />
            </div>
          ))}
        </div>
      );
    } else {
      shopItemsView = (
        <div
          className="w-100 text-center d-flex justify-content-center align-items-center"
          style={{ height: "70vh" }}
        >
          <img src="/static/img/users/Animation - 1716196066837.gif" />
        </div>
      );
    }
  } else {
    shopItemsView = <p>Searching...</p>;
  }

  const marks = {
    1: "",
    2: t("acceptable"),
    3: t("good"),
    4: t("verygood"),
    5: t("new"),
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      fetchCities();
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLat(latitude);
    setLang(longitude);
  }

  const handleInsurance = (e) => {
    setInsurance(e.target.checked);
  };

  const handleDelivery = (e) => {
    setFreeDelivery(e.target.checked);
  };

  // Get Cities
  const fetchCities = async () => {
    try {
      await dispatch(GetCities());
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const cities = useSelector((state) => state.cities.cities);

  const textAlign = i18n.language === "ar" ? "left" : "right";

  return (
    <PageContainer title={`Search results for: "${keyword}" `}>
      <div className="ps-page">
        <BreadCrumb breacrumb={breadcrumb} />
      </div>
      <div className="px-5" id="search-header" style={{ textAlign }}>
        <div className="row justify-content-between align-items-start">
          <div className="col-md-6 col-lg-3 col-sm-12 mb-5">
            <div className="filter-sidebar">
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
                    {t("max-rental")} ( {maxPrice} EGP)
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
                          return <option value={city.id}>{city.name}</option>;
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
                <button className="ps-btn cairo mt-5" onClick={resetFilters}>
                  {t("resetFilters")}
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 col-lg-9 ">
            <div className="">
              <div className="ps-shop__content">{shopItemsView}</div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              {searchResult && searchResult.data && searchResult.data.items ? (
                <Pagination
                  onPress={getPage}
                  countsPage={Math.ceil(
                    searchResult.data.items.items_data.total /
                      searchResult.data.items.items_data.per_page
                  )}
                  currentPage={currentpage}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default SearchPage;
