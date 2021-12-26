import {MODAL , UPDATESTATE} from './Type'

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