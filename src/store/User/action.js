import baseUrl from "../../utilities/Api/baseUrl";
import { USER_PROFILE } from "../Type";


const GetUserProfile = (data) => {
  console.log(data)
  return async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      let res = await baseUrl.get(`api/user-info/${data}`, config);

      dispatch({ type: USER_PROFILE, payload: res });
    } catch (e) {
      dispatch({ type: USER_PROFILE, payload: e.res });
    }
  };
};

export {  GetUserProfile };
