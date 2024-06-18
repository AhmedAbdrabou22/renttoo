
import baseUrl from "../../utilities/Api/baseUrl";
import {ADD_NEW_COMMENT, GET_USER_INFORMATION, LOGIN_USER, REGISTER_NEW_USER, UPDATE_USER_INFORMATION} from '../Type'
import { notification } from "antd";


const AddComment = (data) => {
   
    return async (dispatch) => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        try {
            let res = await baseUrl.post(`api/auth/add-comment/${data.id}`, data , config)

            dispatch({ type: ADD_NEW_COMMENT, payload: res })
            if(res.data.status === false){
                
                notification.error({
                    message: 'Error',
                    description: res.data.msg,
                });
            }else{
                
                notification.success({
                    message: 'Success',
                    description: res.data.msg,
                })
            }
        } catch (e) {
            dispatch({ type: ADD_NEW_COMMENT, payload: e.res })
        }
    }
}


export  {AddComment}