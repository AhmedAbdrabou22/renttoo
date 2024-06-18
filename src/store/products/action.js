import baseUrl from '../../utilities/Api/baseUrl';
import { GET_SINGLE_PRDUCT } from '../Type';
import { notification } from 'antd';

const GetSingleProduct = (data, lang) => {
    return async (dispatch) => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        lang = lang === 'en' ? 'ar' : 'en'; // Assign the result back to lang variable

        try {
            let res = await baseUrl.get(
                `api/app/item/${data.id}/${lang}`,
                config
            );
            dispatch({ type: GET_SINGLE_PRDUCT, payload: res });
        } catch (e) {
            dispatch({ type: GET_SINGLE_PRDUCT, payload: e.res });
        }
    };
};

export { GetSingleProduct };
