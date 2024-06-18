import baseUrl from "../../utilities/Api/baseUrl";
import {
  POST_NEW_ITEM,
  DELETE_NEW_ITEM,
  GET_BY_ID_ITEM,
  EDIT_NEW_ITEM,
} from "../Type";
import { notification } from "antd";

const AddNewItem = (data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return async (dispatch) => {
    try {
      let res = await baseUrl.post(`api/auth/add-item`, data, config);
      dispatch({ type: POST_NEW_ITEM, payload: res });
      if (res.data.status === false) {
        notification.error({
          message: "Error",
          description: res.data.msg,
        });
      } else {
        notification.success({
          message: "Success",
          description: res.data.msg,
        });
      }
    } catch (e) {
      dispatch({ type: POST_NEW_ITEM, payload: e.res });
    }
  };
};
const DeleteItem = (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return async (dispatch) => {
    try {
      let res = await baseUrl.delete(`api/auth/delete-item/${id}`, config);
      dispatch({ type: DELETE_NEW_ITEM, payload: res });
      if (res.data.status === false) {
        notification.error({
          message: "Error",
          description: res.data.msg,
        });
      } else {
        notification.success({
          message: "Success",
          description: res.data.msg,
        });
      }
    } catch (e) {
      dispatch({ type: DELETE_NEW_ITEM, payload: e.res });
    }
  };
};
const EditItem = (id, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  console.log(data);
  return async (dispatch) => {
    try {
      let res = await baseUrl.post(`api/auth/update-item/${id}`, data, config);
      dispatch({ type: EDIT_NEW_ITEM, payload: res });
      if (res.data.status === false) {
        notification.error({
          message: "Error",
          description: res.data.msg,
        });
      } else {
        notification.success({
          message: "Success",
          description: res.data.msg,
        });
      }
    } catch (e) {
      dispatch({ type: EDIT_NEW_ITEM, payload: e.res });
    }
  };
};

// Add a request interceptor to log request details
baseUrl.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2));
  return request;
});
const GetByidItem = (id, lang, latitude, longitude) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  lang = lang === "en" ? "ar" : "en"; // Assign the result back to lang variable

  return async (dispatch) => {
    try {
    let res = await baseUrl.get(
        `api/app/item/${id.id}/${id.lang}`,
        {
          params: {
            current_latitude: id.latitude,
            current_longitude: id.longitude,
          },
          ...config,
        }
      );

      dispatch({ type: GET_BY_ID_ITEM, payload: res });
      console.log(res.data)
      if (res.data.status === false) {
        notification.error({
          message: "Error",
          description: res.data.msg,
        });
      } else {
        notification.success({
          message: "Success",
          description: res.data.msg,
        });
      }
    } catch (e) {
      dispatch({ type: GET_BY_ID_ITEM, payload: e.res });
    }
  };
};

export { AddNewItem, DeleteItem, EditItem, GetByidItem };
