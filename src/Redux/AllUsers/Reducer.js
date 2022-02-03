import {GETALLUSERS} from './Type';

const initialState = {
    users:[]
}

const allUsersReducer = (state = initialState , action)=>{
    switch (action.type) {
        case GETALLUSERS:
            return{
                users:action.payload
            }
            
    
        default:
            return state;
    }
}


export default allUsersReducer