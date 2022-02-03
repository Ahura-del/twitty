import {GETCONVERSATION ,GETMESSAGE,GETREADMSG,GETREMOVECONVERSATION,GETRMVMSG} from './Type'

export const getConv = (data)=>{
    return{
        type:GETCONVERSATION,
        payload:data
    }
}
export const getRmvConv = (state)=>{
    return{
        type:GETREMOVECONVERSATION,
        payload:state
    }
}

export const getMessage = (data)=>{
    return{
        type:GETMESSAGE,
        payload:data
    }
}

export const getReadMsg = ()=>{
    return{
        type:GETREADMSG,
    }
}
export const getRmvMsg = ()=>{
    return{
        type:GETRMVMSG,
    }
}

