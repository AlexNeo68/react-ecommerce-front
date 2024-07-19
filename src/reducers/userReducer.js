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
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_PROFILE_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
} from '../constants/userConstants'

export const userLoginReducer = ( 
    state = {
        userInfo: null,
        loading: false,
        error: null
    }, action) => {

    switch (action.type) {
        case USER_LOGIN_REQUEST:

            return {
                loading: true
            }
        
        case USER_LOGIN_SUCCESS:

            return {
                loading: false,
                userInfo: action.payload
            }
    
        case USER_LOGIN_FAIL:

            return {
                loading: false,
                userInfo: null,
                error: action.payload
            }
            
        case USER_LOGOUT:

            return {
                loading: false,
                userInfo: null,
                error: null
            }

        default:
            return state
    }
}


export const userRegisterReducer = ( 
    state = {
        userInfo: null,
        loading: false,
        error: null
    }, action) => {

    switch (action.type) {
        case USER_REGISTER_REQUEST:

            return {
                loading: true
            }
        
        case USER_REGISTER_SUCCESS:

            return {
                loading: false,
                userInfo: action.payload
            }
    
        case USER_REGISTER_FAIL:

            return {
                loading: false,
                userInfo: null,
                error: action.payload
            }
            
        case USER_LOGOUT:

            return {
                loading: false,
                userInfo: null,
                error: null
            }

        default:
            return state
    }
}

export const userDetailReducer = ( 
    state = {
        user: null,
        loading: false,
        error: null
    }, action) => {

    switch (action.type) {
        case USER_DETAILS_REQUEST:

            return {...state,
                loading: true
            }
        
        case USER_DETAILS_SUCCESS:

            return {
                loading: false,
                user: action.payload
            }
    
        case USER_DETAILS_FAIL:

            return {
                loading: false,
                user: null,
                error: action.payload
            }

        case USER_DETAILS_RESET:

            return {
                loading: false,
                user: null,
                error: null
            }

        default:
            return state
    }
}


export const userUpdateProfileReducer = ( 
    state = {
        userInfo: null,
        success: false,
        loading: false,
        error: null
    }, action) => {

    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:

            return {
                loading: true
            }
        
        case USER_UPDATE_PROFILE_SUCCESS:

            return {
                loading: false,
                userInfo: action.payload,
                success: true
            }
    
        case USER_UPDATE_PROFILE_FAIL:

            return {
                loading: false,
                userInfo: null,
                error: action.payload
            }

        case USER_PROFILE_RESET:

            return {}

        default:
            return state
    }
}


export const userListReducer = ( 
    state = {
        users: [],
        loading: false,
        error: null
    }, action) => {

    switch (action.type) {
        case USER_LIST_REQUEST:

            return {...state,
                loading: true
            }
        
        case USER_LIST_SUCCESS:

            return {
                loading: false,
                users: action.payload
            }
    
        case USER_LIST_FAIL:

            return {
                loading: false,
                users: [],
                error: action.payload
            }

        case USER_LIST_RESET:

            return {
                loading: false,
                users: [],
                error: null
            }

        default:
            return state
    }
}