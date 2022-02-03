import {GETRMVMSG,GETREADMSG,GETMESSAGE,GETCONVERSATION} from './Type'


const initialState = {
    message : [],
    conversation:[],
    readMsg:false,
    removeMsg:false
}

const socketReducer = (state = initialState , action)=>{
    switch(action.type){
        case GETMESSAGE :
            return{
                ...state,
                message:action.payload
            };
            case GETCONVERSATION :
                return{
                    ...state,
                    conversation:action.payload
                }
            case GETREADMSG:{
                return{
                    ...state,
                    readMsg: !state.readMsg
                }
            }
            case GETRMVMSG:
                return{
                    ...state,
                    removeMsg:!state.removeMsg
                }

            default: return state
    }
}

export default socketReducer