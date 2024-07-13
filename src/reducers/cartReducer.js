import { CART_ADD_ITEM, CART_DELETE_ITEM } from '../constants/cartConstants'
export const cartReducer = ( 
    state = {
        items: [],
    }, action) => {

    switch (action.type) {
        case CART_ADD_ITEM:
            const added = action.payload

            const exist = state.items.find(item=>item._id==added._id)

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
        default:
            return state
    }
}
