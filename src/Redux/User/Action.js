import {GETUSER} from './Type'

export const addUser = (user)=>{
    return{
        type:GETUSER,
        payload:user
    }
}