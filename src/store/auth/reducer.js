
import {GET_USER_INFORMATION, LOGIN_USER, REGISTER_NEW_USER , UPDATE_USER_INFORMATION} from '../Type'
const initial = {
    RegisterUser: [],
    LoginUser:[],
    InformationUser:[],
    UpdateInformationUser:[],
    loading: true,
}

const reducer = (state = initial, action) => {
    switch (action.type) {
        case REGISTER_NEW_USER:
            return {
                ...state,
                RegisterUser: action.payload,
                loading: false
            }
        case LOGIN_USER:
            return {
                ...state,
                LoginUser: action.payload,
                loading: false
            }
        case GET_USER_INFORMATION:
            return {
                ...state,
                InformationUser: action.payload,
                loading: false
            }
        case UPDATE_USER_INFORMATION:
            return {
                ...state,
                UpdateInformationUser: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer