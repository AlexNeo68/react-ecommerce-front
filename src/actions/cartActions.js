import { 
    CART_ADD_ITEM, CART_DELETE_ITEM
} from '../constants/cartConstants'
import axios from 'axios'


export const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        const {data} = await axios.get(`/api/products/${id}`)
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                _id: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        })

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.items))
    } catch (error) {
        // dispatch(
        //     {
        //         type: PRODUCT_LIST_FAIL,
        //         payload: error.response && error.response.data.message ? 
        //         error.response.data.message : error.message
        //     }
        // )        
    }
}
