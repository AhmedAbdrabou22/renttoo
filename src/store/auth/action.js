import baseUrl from '../../utilities/Api/baseUrl';
import {
    GET_USER_INFORMATION,
    LOGIN_USER,
    REGISTER_NEW_USER,
    UPDATE_USER_INFORMATION,
} from '../Type';
import { notification } from 'antd';

const RegisterNewUser = (data) => {
    return async (dispatch) => {
        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem("token")}`
        //     }
        // }
        try {
            let res = await baseUrl.post('api/register', data);

            dispatch({ type: REGISTER_NEW_USER, payload: res });
            if (res.data.status === false) {
                notification.error({
                    message: 'Error',
                    description: res.data.msg,
                });
            } else {
                notification.success({
                    message: 'Success',
                    description: res.data.msg,
                });
            }
        } catch (e) {
            dispatch({ type: REGISTER_NEW_USER, payload: e.res });
        }
    };
};

const LoginUser = (data) => {
    return async (dispatch) => {
        try {
            let res = await baseUrl.post(`api/login`, data);

            dispatch({ type: LOGIN_USER, payload: res });

            if (res.data.status === false) {
                notification.error({
                    message: 'Error',
                    description: res.data.msg,
                });
            } else {
                notification.success({
                    message: 'Success',
                    description: res.data.msg,
                });
            }
        } catch (e) {
            dispatch({ type: LOGIN_USER, payload: e.res });
        }
    };
};

const GetUserInformation = (data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    };
    return async (dispatch) => {
        try {
            let res = await baseUrl.get(`api/auth/me`, config);

            dispatch({ type: GET_USER_INFORMATION, payload: res });
        } catch (e) {
            dispatch({ type: GET_USER_INFORMATION, payload: e.res });
        }
    };
};
const UpdateUserInformation = (data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    };
    return async (dispatch) => {
        try {
            let res = await baseUrl.post(`api/auth/update-user`, data, config);

            dispatch({ type: UPDATE_USER_INFORMATION, payload: res });

            if (res.data.status === false) {
                notification.error({
                    message: 'Error',
                    description: res.data.msg,
                });
            } else {
                notification.success({
                    message: 'Success',
                    description: res.data.msg,
                });
            }
        } catch (e) {
            dispatch({ type: UPDATE_USER_INFORMATION, payload: e.res });
        }
    };
};

export {
    RegisterNewUser,
    LoginUser,
    GetUserInformation,
    UpdateUserInformation,
};
