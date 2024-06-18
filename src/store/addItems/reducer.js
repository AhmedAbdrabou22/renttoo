import {
    POST_NEW_ITEM,
    EDIT_NEW_ITEM,
    DELETE_NEW_ITEM,
    GET_BY_ID_ITEM,
} from '../Type';
const initial = {
    items: [],
    Deleteitems: [],
    Edititems: [],
    getById: [],
    loading: true,
};

const reducer = (state = initial, action) => {
    switch (action.type) {
        case POST_NEW_ITEM:
            return {
                ...state,
                items: action.payload,
                loading: false,
            };
        case EDIT_NEW_ITEM:
            return {
                ...state,
                Edititems: action.payload,
                loading: false,
            };
        case DELETE_NEW_ITEM:
            return {
                ...state,
                Deleteitems: action.payload,
                loading: false,
            };
        case GET_BY_ID_ITEM:
            return {
                ...state,
                getById: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default reducer;
