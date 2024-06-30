import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from '../constants/productConstants'
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