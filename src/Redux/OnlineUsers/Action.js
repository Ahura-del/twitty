import {ONLINEUSERS} from './Type'

export const addUsers = (data)=>{
    return{
        type:ONLINEUSERS,
        payload:data
    }
}