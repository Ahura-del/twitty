import {CONVERSATIONID, GETCONVERSATION, RECIVERUSERID, UPDATECONVERSATION, UPDATEMSG} from './Type'

export const getConversation =(conversation)=>{
    return {
        type:GETCONVERSATION,
        payload:conversation
    }
}

export const updateConv = ()=>{
    return{
        type:UPDATECONVERSATION
    }
}

export const updateMsg = ()=>{
    return{
        type:UPDATEMSG
    }
}
export const handleconvId = ({conversationId})=>{
    return{
        type:CONVERSATIONID,
        payload:conversationId
    }
}

export const sendReciverUserId = ({userId})=>{
    return{
        type:RECIVERUSERID,
        payload:userId
    }
}