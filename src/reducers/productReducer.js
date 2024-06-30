import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL } from '../constants/productConstants'
export const producListReducer = ( 
    state = {
        products: [],
        loading: false,
        error: null
    }, action) => {

    switch (action.type) {
        case PRODUCT_LIST_REQUEST:

            return {
                loading: true,
                products: []
            }
        
        case PRODUCT_LIST_SUCCESS:

            return {
                loading: false,
                products: action.payload
            }
    
        case PRODUCT_LIST_FAIL:

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