import { CART_CLEAR } from '../constants/cartConstants'
import { CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CREATE_ORDER_CLEAR,
} from '../constants/orderConstants'
import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        
        dispatch({type: CREATE_ORDER_REQUEST})
        
        const {userInfo} = getState().userLogin

        const config = {
            'headers': {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
            
        }

        const {data} = await axios.post(`/api/orders/place-order/`, order, config)

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })

        dispatch({
            type: CART_CLEAR,
        })

        localStorage.removeItem('cartItems')

        

    } catch (error) {
        dispatch(
            {
                type: CREATE_ORDER_FAIL,
                payload: error.response && error.response.data.detail ? 
                error.response.data.detail : error.message
            }
        )        
    }
}

