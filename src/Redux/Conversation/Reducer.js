import {GETCONVERSATION} from './Type'

const initialState = {
    conversation:[],
    update:false
}


const conversationReducer = (state = initialState , action) =>{
    switch(action.type){
        case GETCONVERSATION : 
            return{
                ...state,
                conversation:action.payload,
                update:!state.update
            }

            default:return state
    }
}

export default conversationReducer