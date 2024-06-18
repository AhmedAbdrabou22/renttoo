
import {GET_ALL_CATEGORIES, GET_ALL_POPULAR, GET_ALL_SLIDERS, GET_SUB_CATEGORY, GET_SUB_CATEGORY_ITEMS} from '../Type'
const initial = {
    Categories: [],
    Sliders:[],
    Popular:[],
    SubCategory:[],
    SubCategoriesItems:[],
    loading: true,
}

const reducer = (state = initial, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                Categories: action.payload,
                loading: false
            }
        case GET_ALL_SLIDERS:
            return {
                ...state,
                Sliders: action.payload,
                loading: false
            }
        case GET_ALL_POPULAR:
            return {
                ...state,
                Popular: action.payload,
                loading: false
            }
        case GET_SUB_CATEGORY:
            return {
                ...state,
                SubCategory: action.payload,
                loading: false
            }
        case GET_SUB_CATEGORY_ITEMS:
            return {
                ...state,
                SubCategoriesItems: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer