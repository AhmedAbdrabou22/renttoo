
import { GET_SINGLE_PRDUCT} from '../Type'
const initial = {
    SingleProduct:[],
    loading: true,
}

const reducer = (state = initial, action) => {
    switch (action.type) {
        case GET_SINGLE_PRDUCT:
            return {
                ...state,
                SingleProduct: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer