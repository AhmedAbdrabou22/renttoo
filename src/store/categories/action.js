import baseUrl from "../../utilities/Api/baseUrl";
import {
  GET_ALL_CATEGORIES,
  GET_ALL_POPULAR,
  GET_ALL_SLIDERS,
  GET_SUB_CATEGORY,
  GET_SUB_CATEGORY_ITEMS,
} from "../Type";

const GetAllCategories = (lang) => {
  const language = lang === "en" ? "ar" : "en"; // Assign the result back to lang variable
  return async (dispatch) => {
    try {
      let res = await baseUrl.get(`api/app/categories/${language}`);
      dispatch({ type: GET_ALL_CATEGORIES, payload: res });
    } catch (e) {
      dispatch({ type: GET_ALL_CATEGORIES, payload: e.res });
    }
  };
};

const GetAllSlider = (data) => {
  return async (dispatch) => {
    try {
      let res = await baseUrl.get(`api/app/sliders`);
      dispatch({ type: GET_ALL_SLIDERS, payload: res });
    } catch (e) {
      dispatch({ type: GET_ALL_SLIDERS, payload: e.res });
    }
  };
};
const GetMostPopular = (lang) => {
  lang = lang === "en" ? "ar" : "en"; // Assign the result back to lang variable

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return async (dispatch) => {
    try {
      if (localStorage.getItem("token")) {
        let res = await baseUrl.get(`api/app/most-popular/${lang}`, config);

        dispatch({ type: GET_ALL_POPULAR, payload: res });
      } else {
        let res = await baseUrl.get(`api/app/most-popular/${lang}`);
        dispatch({ type: GET_ALL_POPULAR, payload: res });
      }
    } catch (e) {
      dispatch({ type: GET_ALL_POPULAR, payload: e.res });
    }
  };
};

const GetSubCategoryFromCategory = (data, lang) => {
  lang = lang === "en" ? "ar" : "en"; // Assign the result back to lang variable

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return async (dispatch) => {
    try {
      let res = await baseUrl.get(
        `api/app/categories/sub-categories/${data.id}/${lang}`
      );
      dispatch({ type: GET_SUB_CATEGORY, payload: res });
    } catch (e) {
      dispatch({ type: GET_SUB_CATEGORY, payload: e.res });
    }
  };
};
const GetSubCategoryItems = (data) => {
  return async (dispatch) => {
    try {
      let res = await baseUrl.get(`api/app/sub-category-items/${data.id}`, {
        params: {
          item_quality: data.item_quality || null,
          min_price: data.min_price || null,
          max_price: data.max_price || null,
          search_area: data.search_area || null,
          current_latitude: data.current_latitude || null,
          current_longitude: data.current_longitude || null,
          city_id: data.city_id || null,
          free_delivery: data.free_delivery || null,
          has_insurance: data.has_insurance || null,
        },
      });
      dispatch({ type: GET_SUB_CATEGORY_ITEMS, payload: res });
    } catch (e) {
      dispatch({
        type: GET_SUB_CATEGORY_ITEMS,
        payload: e.response.data,
      });
    }
  };
};

export {
  GetAllCategories,
  GetAllSlider,
  GetMostPopular,
  GetSubCategoryFromCategory,
  GetSubCategoryItems,
};
