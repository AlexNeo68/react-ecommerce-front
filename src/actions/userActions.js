import { USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_DETAILS_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,

} from '../constants/userConstants'
import { GET_MY_ORDERS_RESET } from '../constants/orderConstants'
import axios from 'axios'

export const login = (email, password) => async (dispatch, getState) => {
    try {
        
        dispatch({type: USER_LOGIN_REQUEST})
        
        const config = {
            'Content-type': 'application/json',
        }

        const {data} = await axios.post(`/api/users/login/`, {username: email, password}, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(getState().userLogin.userInfo))

    } catch (error) {
        dispatch(
            {
                type: USER_LOGIN_FAIL,
                payload: error.response && error.response.data.detail ? 
                error.response.data.detail : error.message
            }
        )        
    }
}


export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT
    })

    dispatch({
        type: USER_DETAILS_RESET
    })
    dispatch({
        type: GET_MY_ORDERS_RESET
    })
    dispatch({
        type: USER_LIST_RESET
    })
}



export const register = (name, email, password) => async (dispatch, getState) => {
    try {
        
        dispatch({type: USER_REGISTER_REQUEST})
        
        const config = {
            'Content-type': 'application/json',
        }

        const {data} = await axios.post(`/api/users/register/`, {name, email, password}, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(getState().userRegister.userInfo))

    } catch (error) {
        dispatch(
            {
                type: USER_REGISTER_FAIL,
                payload: error.response && error.response.data.detail ? 
                error.response.data.detail : error.message
            }
        )        
    }
}



export const getUserDetail = (id) => async (dispatch, getState) => {
    try {
        
        dispatch({type: USER_DETAILS_REQUEST})
        const {userInfo} = getState().userLogin

        
        
        const config = {
            'headers': {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
            
        }

        const {data} = await axios.get(`/api/users/${id}/`, config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch(
            {
                type: USER_DETAILS_FAIL,
                payload: error.response && error.response.data.detail ? 
                error.response.data.detail : error.message
            }
        )
        dispatch(logout())       
    }
}



export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        
        dispatch({type: USER_UPDATE_PROFILE_REQUEST})
        const {userInfo} = getState().userLogin

        
        
        const config = {
            'headers': {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
            
        }

        const {data} = await axios.put(`/api/users/profile/update/`, user, config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(getState().userUpdateProfile.userInfo))

    } catch (error) {
        dispatch(
            {
                type: USER_UPDATE_PROFILE_FAIL,
                payload: error.response && error.response.data.detail ? 
                error.response.data.detail : error.message
            }
        )        
    }
}



export const getUsers = () => async (dispatch, getState) => {
    try {
        
        dispatch({type: USER_LIST_REQUEST})
        const {userInfo} = getState().userLogin

        const config = {
            'headers': {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
            
        }

        const {data} = await axios.get(`/api/users/`, config)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch(
            {
                type: USER_LIST_FAIL,
                payload: error.response && error.response.data.detail ? 
                error.response.data.detail : error.message
            }
        )
        dispatch(logout())       
    }
}

