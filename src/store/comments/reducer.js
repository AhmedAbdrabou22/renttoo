
import {ADD_NEW_COMMENT} from '../Type'
const initial = {
    comments:[],
    loading: true,
}

const reducer = (state = initial, action) => {
    switch (action.type) {
        case ADD_NEW_COMMENT:
            return {
                ...state,
                comments: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer