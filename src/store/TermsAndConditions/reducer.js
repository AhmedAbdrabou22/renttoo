import { GET_ABOUT_US, TERMS_AND_CONDITIONS } from '../Type';
const initial = {
    termsAndConditions: [],
    aboutUs: [],
    loading: true,
};

const reducer = (state = initial, action) => {
    switch (action.type) {
        case TERMS_AND_CONDITIONS:
            return {
                ...state,
                termsAndConditions: action.payload,
                loading: false,
            };
        case GET_ABOUT_US:
            return {
                ...state,
                aboutUs: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default reducer;
