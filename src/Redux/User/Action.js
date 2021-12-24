import axios from 'axios'
import {GETUSER} from './Type'

export const getUser = ({id , token})=>{
    return (dispatch)=>{
        axios.get(`/user/${id}` , {headers:{'authorization': `Bearer ${token}`}})
        .then(res =>{
            dispatch({
                type:GETUSER,
                payload:res.data
            })
        })
    }
}