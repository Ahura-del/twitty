import {MODAL_STATE} from './Type'

export const modalState = (state , label)=>{
    return{
        type:MODAL_STATE,
        payload : state,
        label
    }
}