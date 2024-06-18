import baseUrl from "../../utilities/Api/baseUrl";
import {ADD_NEW_COMMENT, ADD_NEW_RATE, GET_USER_INFORMATION, LOGIN_USER, REGISTER_NEW_USER, UPDATE_USER_INFORMATION} from '../Type'
import { notification } from "antd";


const AddNewRate = (data) => {
   
    return async (dispatch) => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        try {
            let res = await baseUrl.post(`api/auth/rate-item`, data , config)

            dispatch({ type: ADD_NEW_RATE, payload: res })
        } catch (e) {
            dispatch({ type: ADD_NEW_RATE, payload: e.res })
        }
    }
}


export  {AddNewRate}