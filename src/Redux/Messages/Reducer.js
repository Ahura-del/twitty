import {GETMESSAGES , RECIVERUSERID} from './Type'

const initialState = {
    messages:[],
    reciverUserId:'',
    conversationId:''
}

const messagesReducer = (state = initialState , action)=>{
    switch(action.type){
        case GETMESSAGES : 
            return{
                ...state,
                messages:action.payload,
                conversationId:action.conversationId
            };
            case RECIVERUSERID :
                return{
                    ...state,
                    reciverUserId:action.payload
                };
                default:return state
    }
}

export default messagesReducer