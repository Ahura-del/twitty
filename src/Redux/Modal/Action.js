import {MODAL} from './Type'

export const modalHandler = ({state , label})=>{
    return{
        type:MODAL,
        state,
        label
    }
}