import { applyMiddleware, combineReducers, createStore } from 'redux'
import {composeWithDevTools} from '@redux-devtools/extension'
import { thunk } from 'redux-thunk'
import { producListReducer, productDetailReducer } from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer'
import { userLoginReducer } from './reducers/userReducer'

const reducer = combineReducers({
    'productList': producListReducer,
    'productDetail': productDetailReducer,
    'cart': cartReducer,
    'userLogin': userLoginReducer,
})


const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userLoginFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : []

const initialState = {
    cart: {items: cartItemsFromStorage},
    userLogin: {userInfo: userLoginFromStorage},
}

const middlewares = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middlewares)))


export default store;