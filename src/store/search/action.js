import baseUrl from "../../utilities/Api/baseUrl";
import {GET_ABOUT_US, GET_SEARCH, TERMS_AND_CONDITIONS} from '../Type'
import { notification } from "antd";


const Search = (data) => {
   
    return async (dispatch) => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        try {
            let res = await baseUrl.post(`api/app/search?page=${data.page}` ,data, config)

            dispatch({ type: GET_SEARCH, payload: res })
        } catch (e) {
            dispatch({ type: GET_SEARCH, payload: e.res })
        }
    }
}

export  {Search}