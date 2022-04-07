import {ALERT, MODAL , UPDATESTATE} from './Type'

const initialState = {
    state:false,
    label:"",
    alert:false,
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
            case ALERT:
                return{
                    alert:action.payload
                }
            case UPDATESTATE:
                return{
                    update:!state.update
                }
            default:return state
    }
}

export default modalReducer