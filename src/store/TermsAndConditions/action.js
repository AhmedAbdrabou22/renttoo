import baseUrl from "../../utilities/Api/baseUrl";
import { GET_ABOUT_US, TERMS_AND_CONDITIONS } from "../Type";
import { notification } from "antd";

const TermsAndConditions = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      let res = await baseUrl.get(
        `https://app.renttoo.net/api/setting/show/terms_and_conditions`,
        config
      );

      dispatch({ type: TERMS_AND_CONDITIONS, payload: res });
    } catch (e) {
      dispatch({ type: TERMS_AND_CONDITIONS, payload: e.res });
    }
  };
};
const AboutUs = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      let res = await baseUrl.get(`api/setting/show/about_us`, config);

      dispatch({ type: GET_ABOUT_US, payload: res });
    } catch (e) {
      dispatch({ type: GET_ABOUT_US, payload: e.res });
    }
  };
};

export { TermsAndConditions, AboutUs };
