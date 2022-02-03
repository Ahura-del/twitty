import {GETCONVERSATION ,GETMESSAGE,GETREADMSG,GETRMVMSG} from './Type'

export const getConv = (data)=>{
    return{
        type:GETCONVERSATION,
        payload:data
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