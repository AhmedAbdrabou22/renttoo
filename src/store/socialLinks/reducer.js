import { GET_SOCIAL_LINK } from '../Type';
const initial = {
    socialLinks: [],
    loading: true,
};

const reducer = (state = initial, action) => {
    switch (action.type) {
        case GET_SOCIAL_LINK:
            return {
                ...state,
                socialLinks: action.payload,
                loading: false,
            };

        default:
            return state;
    }
};

export default reducer;
