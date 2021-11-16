import {MODAL_STATE} from './Type'

export const modalState = (state)=>{
    return{
        type:MODAL_STATE,
        payload : state
    }
}