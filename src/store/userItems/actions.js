import baseUrl from '../../utilities/Api/baseUrl';
import { GET_USER_ITEMS, GET_RECENT_SEEN } from '../Type';
import { notification } from 'antd';

const GetUserItems = (data) => {
    return async (dispatch) => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        try {
            let res = await baseUrl.get(`api/app/user-items/${data}`, config);
            dispatch({ type: GET_USER_ITEMS, payload: res });
        } catch (e) {
            dispatch({ type: GET_USER_ITEMS, payload: e.res });
        }
    };
};
const GetRecent = (data) => {
    return async (dispatch) => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        try {
            let res = await baseUrl.get(`api/auth/items-recently-seen`, config);
            dispatch({ type: GET_RECENT_SEEN, payload: res });
        } catch (e) {
            dispatch({ type: GET_RECENT_SEEN, payload: e.res });
        }
    };
};

export { GetUserItems, GetRecent };
