import {CONVERSATIONID, GETCONVERSATION, RECIVERUSERID, UPDATECONVERSATION} from './Type'

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