import {configureStore} from '@reduxjs/toolkit'
import modalReducer from './modalSlice'
import userReducer from './userSlice'
const Store = configureStore({
    reducer:{
        modalState : modalReducer, 
        userState : userReducer
    }
})
export default Store