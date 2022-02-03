import {GETALLUSERS} from './Type';

export const getAllUsers = (users)=>{
    return{
        type:GETALLUSERS,
        payload:users
    }
}