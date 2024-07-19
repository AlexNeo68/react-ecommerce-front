import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CREATE_ORDER_CLEAR,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    GET_MY_ORDERS_REQUEST,
    GET_MY_ORDERS_SUCCESS,
    GET_MY_ORDERS_FAIL,
    GET_MY_ORDERS_RESET,
    
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

export const getOrderReducer = ( 
    state = {
        order: null,
        loading: true,
        error: null
    }, action) => {

    switch (action.type) {
        case ORDER_DETAILS_REQUEST:

            return {
                loading: true
            }
        
        case ORDER_DETAILS_SUCCESS:

            return {
                loading: false,
                order: action.payload
            }
    
        case ORDER_DETAILS_FAIL:

            return {
                loading: false,
                order: null,
                error: action.payload
            }
            
        default:
            return state
    }
}


export const orderPayReducer = ( 
    state = {
        succell: false,
        loading: false,
        error: null
    }, action) => {

    switch (action.type) {
        case ORDER_PAY_REQUEST:

            return {
                loading: true
            }
        
        case ORDER_PAY_SUCCESS:

            return {
                loading: false,
                success: true
            }
    
        case ORDER_PAY_FAIL:

            return {
                loading: false,
                success: false,
                error: action.payload
            }

        case ORDER_PAY_RESET:

            return {
                loading: false,
                success: false,
                error: null
            }
            
        default:
            return state
    }
}


export const getMyOrdersReducer = ( 
    state = {
        orders: [],
        loading: true,
        error: null
    }, action) => {

    switch (action.type) {
        case GET_MY_ORDERS_REQUEST:

            return {
                loading: true
            }
        
        case GET_MY_ORDERS_SUCCESS:

            return {
                loading: false,
                orders: action.payload
            }
    
        case GET_MY_ORDERS_FAIL:

            return {
                loading: false,
                orders: [],
                error: action.payload
            }

        case GET_MY_ORDERS_RESET:

            return {
                loading: false,
                orders: [],
                error: null
            }
            
        default:
            return state
    }
}