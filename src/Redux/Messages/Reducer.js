import { RECIVERUSERID,CONVERSATIONID} from './Type'

const initialState = {
    reciverUserId:'',
    conversationId:''
}

const messagesReducer = (state = initialState , action)=>{
    switch(action.type){
            case RECIVERUSERID :
                return{
                    ...state,
                    reciverUserId:action.payload
                };
                case CONVERSATIONID:
                    return{
                        ...state,
                        conversationId:action.payload
                    }
                default:return state
    }
}

export default messagesReducer