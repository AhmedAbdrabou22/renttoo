import {  USER_PROFILE } from '../Type';
const initial = {
    userProfile: [],
    loading: true,
};

const reducer = (state = initial, action) => {
    switch (action.type) {
        case USER_PROFILE:
            return {
                ...state,
                userProfile: action.payload,
                loading: false,
            };
       
        default:
            return state;
    }
};

export default reducer;
