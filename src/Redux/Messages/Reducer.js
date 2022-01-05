import {GETMESSAGES , RECIVERUSERID,CONVERSATIONID} from './Type'

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
                    
                    reciverUserId:action.payload
                };
                case CONVERSATIONID:
                    return{
                        
                        conversationId:action.payload
                    }
                default:return state
    }
}

export default messagesReducer