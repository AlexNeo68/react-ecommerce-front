import { USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_LOGOUT } from '../constants/userLoginConstants'
export const userLoginReducer = ( 
    state = {
        userInfo: null,
        loading: false,
        error: null
    }, action) => {

    switch (action.type) {
        case USER_LOGIN_REQUEST:

            return {
                loading: true,
                products: []
            }
        
        case USER_LOGIN_SUCCESS:

            return {
                loading: false,
                products: action.payload
            }
    
        case USER_LOGIN_FAIL:

            return {
                loading: false,
                products: [],
                error: action.payload
            }
            
        case USER_LOGIN_LOGOUT:

            return {
                loading: false,
                products: [],
                error: action.payload
            }

        default:
            return state
    }
}

export const productDetailReducer = ( 
    state = {
        product: {},
        loading: false,
        error: null
    }, action) => {

    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:

            return {
                loading: true,
                product: {},
                error: null
            }
        
        case PRODUCT_DETAIL_SUCCESS:

            return {
                loading: false,
                product: action.payload,
                error: null
            }
    
        case PRODUCT_DETAIL_FAIL:

            return {
                loading: false,
                products: {},
                error: action.payload
            }

        default:
            return state
    }
}