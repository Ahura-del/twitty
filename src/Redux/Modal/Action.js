import {MODAL , UPDATESTATE, ALERT} from './Type'

export const modalHandler = ({state , label , reciveUserId})=>{
    return{
        type:MODAL,
        state,
        label,
        reciveUserId
    }
}

export const updateState = ()=>{
    return{
        type:UPDATESTATE
    }
}

export const alertHandle = (state)=>{
    return{
        type:ALERT,
        payload:state
    }
}