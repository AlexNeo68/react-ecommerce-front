import { applyMiddleware, combineReducers, createStore } from 'redux'
import {composeWithDevTools} from '@redux-devtools/extension'
import { thunk } from 'redux-thunk'
import { producListReducer, productDetailReducer } from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer'
import { userDetailReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducer'

const reducer = combineReducers({
    'productList': producListReducer,
    'productDetail': productDetailReducer,
    'cart': cartReducer,
    'userLogin': userLoginReducer,
    'userRegister': userRegisterReducer,
    'userDetails' : userDetailReducer,
    'userUpdateProfile' : userUpdateProfileReducer,
})


const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : null

const userLoginFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : []

const initialState = {
    cart: {
        items: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: {userInfo: userLoginFromStorage},
    userRegister: {userInfo: userLoginFromStorage},
    userDetails: {user: null},
}

const middlewares = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middlewares)))


export default store;