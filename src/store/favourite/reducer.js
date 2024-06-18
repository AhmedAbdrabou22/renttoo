
import { GET_MY_FAVOURITE_ITEMS, POST_NEW_FAVOURITE} from '../Type'
const initial = {
    Facourites:[],
    PostFavourite:[],
    loading: true,
}

const reducer = (state = initial, action) => {
    switch (action.type) {
        case GET_MY_FAVOURITE_ITEMS:
            return {
                ...state,
                Facourites: action.payload,
                loading: false
            }
        case POST_NEW_FAVOURITE:
            return {
                ...state,
                PostFavourite: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer