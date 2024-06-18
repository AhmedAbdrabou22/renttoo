import React, { useEffect, useRef, useState } from "react";
import { Spin } from "antd";
import ProductSearchResult from "../../../../components/elements/products/ProductSearchResult";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { GetAllCategories } from "../../../../store/categories/action";
import { Navigate, useNavigate } from "react-router-dom";
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const navigate = useNavigate();
  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const SearchHeader = () => {
  const inputEl = useRef(null);
  const [isSearch, setIsSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [resultItems, setResultItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(keyword, 300);
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation();
  const navigate = useNavigate();

  // Get ALL Categories Data
  const getCategories = async () => {
    try {
      setLoading(true);
      dispatch(GetAllCategories(i18n.language));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, [dispatch]);

  const categories = useSelector((state) => state.categories.Categories);

  function handleClearKeyword() {
    setKeyword("");
    setIsSearch(false);
    setLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search/${keyword}`);
  }

  // Views
  let productItemsView,
    clearTextView,
    selectOptionView,
    loadingView,
    loadMoreView;
  if (!loading) {
    if (resultItems && resultItems.length > 0) {
      if (resultItems.length > 5) {
        loadMoreView = (
          <div className="ps-panel__footer text-center">
            <a href="/search">
              <a>See all results</a>
            </a>
          </div>
        );
      }
      productItemsView = resultItems.map((product) => (
        <ProductSearchResult product={product} key={product.id} />
      ));
    } else {
      productItemsView = <p>No product found.</p>;
    }
    if (keyword !== "") {
      clearTextView = (
        <span className="ps-form__action" onClick={handleClearKeyword}>
          <i className="icon icon-cross2"></i>
        </span>
      );
    }
  } else {
    loadingView = (
      <span className="ps-form__action">
        <Spin size="small" />
      </span>
    );
  }
  let selectOptionFirst = [
    <option value="all" key="all">
      {t("all")}
    </option>,
  ]; // Initialize with the "All" option

  if (categories && categories.data && categories.data.categories) {
    // Map through the categories and create options for each category
    selectOptionView = [
      ...selectOptionFirst, // Include the "All" option
      ...categories.data.categories.map((option) => (
        <option defaultValue="all" value={option.name} key={option.name}>
          {option.name}
        </option>
      )),
    ];
  }
  return (
    <form
      className="ps-form--quick-search"
      method="get"
      action="/"
      onSubmit={handleSubmit}
    >
      <div className="ps-form__categories">
        <select className="form-control">{selectOptionView}</select>
      </div>
      <div className="ps-form__input">
        <input
          ref={inputEl}
          className="form-control"
          type="text"
          value={keyword}
          placeholder={t("seacrh")}
          onChange={(e) => setKeyword(e.target.value)}
        />
        {clearTextView}
        {loadingView}
      </div>
      <button onClick={handleSubmit} className="cairo">
        {t("searchIcon")}
      </button>
      <div className={`ps-panel--search-result${isSearch ? " active " : ""}`}>
        <div className="ps-panel__content">{productItemsView}</div>
        {loadMoreView}
      </div>
    </form>
  );
};

export default SearchHeader;
