import {GETUSER} from './Type'

const initialState = {
    user:[]
}

const userReducer = (state = initialState , action)=>{
    switch(action.type){
        case GETUSER : 
            return{
                user:action.payload
            }

            default:return state
    }
}

export default userReducer