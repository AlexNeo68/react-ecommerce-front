import { CART_CLEAR } from '../constants/cartConstants'
import { CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
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
export const getOrder = (id) => async (dispatch, getState) => {
    try {
        
        dispatch({type: ORDER_DETAILS_REQUEST})
        
        const {userInfo} = getState().userLogin

        const config = {
            'headers': {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
            
        }

        const {data} = await axios.get(`/api/orders/${id}/`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
        

    } catch (error) {
        dispatch(
            {
                type: ORDER_DETAILS_FAIL,
                payload: error.response && error.response.data.detail ? 
                error.response.data.detail : error.message
            }
        )        
    }
}


export const payOrder = (id, resultPayments) => async (dispatch, getState) => {
    try {
        
        dispatch({type: ORDER_PAY_REQUEST})
        
        const {userInfo} = getState().userLogin

        const config = {
            'headers': {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
            
        }

        const {data} = await axios.put(`/api/orders/${id}/pay/`, resultPayments, config)

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
        

    } catch (error) {
        dispatch(
            {
                type: ORDER_PAY_FAIL,
                payload: error.response && error.response.data.detail ? 
                error.response.data.detail : error.message
            }
        )        
    }
}