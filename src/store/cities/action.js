import baseUrl from '../../utilities/Api/baseUrl';
import { GET_ALL_CITIES } from '../Type';
import { notification } from 'antd';

const GetCities = (data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    };
    return async (dispatch) => {
        try {
            let res = await baseUrl.get(`api/app/cities/ar`, config);
            dispatch({ type: GET_ALL_CITIES, payload: res });
        } catch (e) {
            dispatch({ type: GET_ALL_CITIES, payload: e.res });
        }
    };
};

export { GetCities };
