import baseUrl from '../../utilities/Api/baseUrl';
import { GET_SOCIAL_LINK } from '../Type';
import { notification } from 'antd';

const getSocialLink = (data) => {
    return async (dispatch) => {
        try {
            let res = await baseUrl.get(`api/social-media`);
            dispatch({ type: GET_SOCIAL_LINK, payload: res.data });
        } catch (e) {
            dispatch({ type: GET_SOCIAL_LINK, payload: e.res });
        }
    };
};

export { getSocialLink };
