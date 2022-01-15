import {ONLINEUSERS} from './Type'


const initialState = {
    onlineUsers : []
}

const onlineReducer = (state = initialState , action)=>{
    switch(action.type){
        case ONLINEUSERS :
            return{
                ...state,
                onlineUsers:action.payload
            }

            default: return state
    }
}

export default onlineReducer