import { GET_USER_ITEMS, GET_RECENT_SEEN } from '../Type';
const initial = {
    UserItems: [],
    Recent: [],
    loading: true,
};

const reducer = (state = initial, action) => {
    switch (action.type) {
        case GET_USER_ITEMS:
            return {
                ...state,
                UserItems: action.payload,
                loading: false,
            };
        case GET_RECENT_SEEN:
            return {
                ...state,
                Recent: action.payload,
                loading: false,
            };

        default:
            return state;
    }
};

export default reducer;
