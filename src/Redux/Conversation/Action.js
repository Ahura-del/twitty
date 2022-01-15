import {GETCONVERSATION} from './Type'
import axios from 'axios'

export const getConversation =({myUserId , token})=>{
    return (dispatch)=>{
        axios.get(`/conversation/${myUserId}` , {headers:{'authorization': `Bearer ${token}`}})
            .then(res =>{
                dispatch({
                    type:GETCONVERSATION,
                    payload:res.data
                })
            })
    }
}