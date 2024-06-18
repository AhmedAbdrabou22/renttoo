import baseUrl from '../../utilities/Api/baseUrl';
import { GET_CONTACT_US, POST_INC_ANALATYCS } from '../Type';
import { notification } from 'antd';

const getContactUs = (data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    };
    return async (dispatch) => {
        try {
            let res = await baseUrl.get(`api/app/contact-us`, config);
            dispatch({ type: GET_CONTACT_US, payload: res.data });
        } catch (e) {
            dispatch({ type: GET_CONTACT_US, payload: e.res });
        }
    };
};
const IncreaseAnalatycis = (data) => {
    return async (dispatch) => {
        try {
            let res = await baseUrl.post(`api/increase-analytics/0`);
            dispatch({ type: POST_INC_ANALATYCS, payload: res.data });
        } catch (e) {
            dispatch({ type: POST_INC_ANALATYCS, payload: e.res });
        }
    };
};

export { getContactUs, IncreaseAnalatycis };
