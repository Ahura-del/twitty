import {CONVERSATIONID, GETCONVERSATION, RECIVERUSERID, UPDATECONVERSATION} from './Type'

const initialState = {
    conversation:[],
    update:false,
    conversationId:'',
    reciverUserId:''
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
            default:return state
    }
}

export default conversationReducer