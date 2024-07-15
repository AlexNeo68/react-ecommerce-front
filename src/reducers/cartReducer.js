import { CART_ADD_ITEM, CART_DELETE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants'
export const cartReducer = ( 
    state = {
        items: [],
        shippingAddress: null
    }, action) => {

    switch (action.type) {
        case CART_ADD_ITEM:
            const added = action.payload

            const exist = state.items.find(item=>item._id===added._id)

            if(exist) {
                return {
                    ...state,
                    items: state.items.map(item => {
                        if(item._id === added._id) {
                            return {
                                ...item,
                                qty: Number(added.qty)
                            }
                        } else {
                            return { ...item }
                        }
                    })
                }
            } else {
                return {
                    ...state,
                    items: [...state.items, added]
                }
            }
        case CART_DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item=>item._id!==action.payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        default:
            return state
    }
}
