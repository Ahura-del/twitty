import {MODAL} from './Type'

const initialState = {
    state:false,
    label:"",
    reciveUserId:''
}


const modalReducer = (state = initialState , action) =>{
    switch (action.type) {
        case MODAL:
            return{
                state:action.state,
                label:action.label,
                reciveUserId:action.reciveUserId
            }
            default:return state
    }
}

export default modalReducer