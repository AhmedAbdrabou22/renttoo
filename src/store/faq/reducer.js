import { GET_FAQ } from '../Type';
const initial = {
    FAQ: [],
    loading: true,
};

const reducer = (state = initial, action) => {
    switch (action.type) {
        case GET_FAQ:
            return {
                ...state,
                FAQ: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default reducer;
