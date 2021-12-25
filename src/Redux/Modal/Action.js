import {MODAL} from './Type'

export const modalHandler = ({state , label , reciveUserId})=>{
    return{
        type:MODAL,
        state,
        label,
        reciveUserId
    }
}