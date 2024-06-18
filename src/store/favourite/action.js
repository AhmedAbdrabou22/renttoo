import baseUrl from '../../utilities/Api/baseUrl';
import { GET_MY_FAVOURITE_ITEMS, POST_NEW_FAVOURITE } from '../Type';
import { notification } from 'antd';

const GetMyFavouriteItems = (data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    };
    return async (dispatch) => {
        try {
            let res = await baseUrl.get(`api/auth/my-love-items`, config);
            dispatch({ type: GET_MY_FAVOURITE_ITEMS, payload: res });
        } catch (e) {
            dispatch({ type: GET_MY_FAVOURITE_ITEMS, payload: e.res });
        }
    };
};
const PostNewFavourite = (data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    };

    return async (dispatch) => {
        try {
            let res = await baseUrl.post(
                `api/auth/love-item/${data.id}`,
                data,
                config
            );
            dispatch({ type: POST_NEW_FAVOURITE, payload: res });
        } catch (e) {
            dispatch({ type: POST_NEW_FAVOURITE, payload: e.res });
        }
    };
};

export { GetMyFavouriteItems, PostNewFavourite };
