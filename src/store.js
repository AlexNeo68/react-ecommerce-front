import { applyMiddleware, combineReducers, createStore } from 'redux'
import {composeWithDevTools} from '@redux-devtools/extension'
import { thunk } from 'redux-thunk'
import { producListReducer, productDetailReducer } from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer'

const reducer = combineReducers({
    'productList': producListReducer,
    'productDetail': productDetailReducer,
    'cart': cartReducer
})


const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cart: {items: cartItemsFromStorage}
}

const middlewares = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middlewares)))


export default store;