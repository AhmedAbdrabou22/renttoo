
import {GET_ABOUT_US, GET_SEARCH, TERMS_AND_CONDITIONS} from '../Type'
const initial = {
    getSearch:[],
    loading: true,
}

const reducer = (state = initial, action) => {
    switch (action.type) {
        case GET_SEARCH:
            return {
                ...state,
                getSearch: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer