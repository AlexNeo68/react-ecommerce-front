import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CREATE_ORDER_CLEAR,
} from '../constants/orderConstants'

export const createOrderReducer = ( 
    state = {
        order: null,
        loading: false,
        success: false,
        error: null
    }, action) => {

    switch (action.type) {
        case CREATE_ORDER_REQUEST:

            return {
                loading: true
            }
        
        case CREATE_ORDER_SUCCESS:

            return {
                loading: false,
                success: true,
                order: action.payload
            }
    
        case CREATE_ORDER_FAIL:

            return {
                loading: false,
                success: false,
                order: null,
                error: action.payload
            }
            
        case CREATE_ORDER_CLEAR:

            return {
                loading: false,
                success: false,
                order: null,
                error: null
            }

        default:
            return state
    }
}
