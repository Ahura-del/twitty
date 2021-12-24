import {GETCONVERSATION} from './Type'

const initialState = {
    conversation:[]
}


const conversationReducer = (state = initialState , action) =>{
    switch(action.type){
        case GETCONVERSATION : 
            return{
                ...state,
                conversation:action.payload
            }

            default:return state
    }
}

export default conversationReducer