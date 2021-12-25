import axios from 'axios'
import {GETMESSAGES , RECIVERUSERID} from './Type'


export const getMessages = ({conversationId , token})=>{
    return (dispatch)=>{
          axios.get(`/messages/${conversationId}`, {
            headers: { "authorization": `Bearer ${token}` },
          })  
          .then(res =>{
              dispatch({
                  type:GETMESSAGES,
                  payload:res.data,
                  conversationId
              })
          })
    }
}

export const sendReciverUser = ({userId})=>{
    return{
        type:RECIVERUSERID,
        payload:userId
    }
}