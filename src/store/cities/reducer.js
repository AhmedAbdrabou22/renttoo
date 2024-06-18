import {  GET_ALL_CITIES } from '../Type';
const initial = {
    cities:[],
    loading: true,
};

const reducer = (state = initial, action) => {
    switch (action.type) {
        case GET_ALL_CITIES:
            return {
                ...state,
                cities: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default reducer;
