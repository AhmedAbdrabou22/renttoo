import { GET_CONTACT_US, POST_INC_ANALATYCS } from '../Type';
const initial = {
    contact: [],
    IncreaseAnalatycis: [],
    loading: true,
};

const reducer = (state = initial, action) => {
    switch (action.type) {
        case GET_CONTACT_US:
            return {
                ...state,
                contact: action.payload,
                loading: false,
            };
        case POST_INC_ANALATYCS:
            return {
                ...state,
                IncreaseAnalatycis: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default reducer;
