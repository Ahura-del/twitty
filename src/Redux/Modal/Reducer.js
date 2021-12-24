import {MODAL} from './Type'

const initialState = {
    state:false,
    label:""
}


const modalReducer = (state = initialState , action) =>{
    switch (action.type) {
        case MODAL:
            return{
                state:action.state,
                label:action.label
            }
            default:return state
    }
}

export default modalReducer