import {MODAL , UPDATESTATE} from './Type'

const initialState = {
    state:false,
    label:"",
    reciveUserId:'',
    update:false
}


const modalReducer = (state = initialState , action) =>{
    switch (action.type) {
        case MODAL:
            return{
                state:action.state,
                label:action.label,
                reciveUserId:action.reciveUserId
            };
            case UPDATESTATE:
                return{
                    update:!state.update
                }
            default:return state
    }
}

export default modalReducer