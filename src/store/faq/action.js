import baseUrl from '../../utilities/Api/baseUrl';
import { GET_FAQ } from '../Type';
import { notification } from 'antd';

const GetFaq = (lang) => {
    lang = lang === 'en' ? 'ar' : 'en'; // Assign the result back to lang variable

    return async (dispatch) => {
        try {
            let res = await baseUrl.get(`api/common-questions/${lang}`);
            dispatch({ type: GET_FAQ, payload: res });
        } catch (e) {
            dispatch({ type: GET_FAQ, payload: e.res });
        }
    };
};

export { GetFaq };
