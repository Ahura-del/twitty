import {CONVERSATIONID, GETCONVERSATION, RECIVERUSERID, UPDATECONVERSATION, UPDATEMSG} from './Type'

const initialState = {
    conversation:[],
    update:false,
    conversationId:'',
    reciverUserId:'',
    updateMessage:false
}


const conversationReducer = (state = initialState , action) =>{
    switch(action.type){
        case GETCONVERSATION : 
            return{
                ...state ,
                conversation:action.payload,
            }
            case UPDATECONVERSATION:
                return{
                    ...state,
                    update:!state.update
                }
                case CONVERSATIONID:
                    return{
                        ...state,
                        conversationId:action.payload
                    }
                case RECIVERUSERID:
                    return{
                        ...state,
                    reciverUserId:action.payload
                    }
                    case UPDATEMSG:
                        return{...state , updateMessage:!state.updateMessage}
            default:return state
    }
}

export default conversationReducer