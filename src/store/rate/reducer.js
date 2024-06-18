import { ADD_NEW_RATE } from '../Type';
const initial = {
    rate: [],
    loading: true,
};

const reducer = (state = initial, action) => {
    switch (action.type) {
        case ADD_NEW_RATE:
            return {
                ...state,
                rate: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default reducer;
