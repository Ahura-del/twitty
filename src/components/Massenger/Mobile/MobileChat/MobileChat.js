import { Grid } from '@mui/material'
import React, { useState } from 'react'
import ChatHeader from './ChatHeader/ChatHeader'
import ChatMessage from './ChatMessages/ChatMessages'
import ChatFooter from './ChatFooter/ChatFooter'
import AccModal from '../../Desktop/Modal/ModalComponent'
import socket from '../../../socket';

import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { handleconvId } from '../../../../Redux'
function MobileChat() {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const sender = localStorage.getItem("userId");
    const [messages , setMessages] = useState({})
    const {conversationId , reciverUserId} = useSelector((state) => state.conversationState);

    const [height , setHeight] = useState(false)
    const changeHeight =(e)=>{
        setHeight(e)
    }
    const location = useLocation()
console.log(reciverUserId)
    const sendMsg = async(text)=>{
    
         //if we haven't conversation
         if(conversationId.length === 0){
            try {
              const convData = {
                "senderId":sender,
                "reciverId":location.state.user._id
              }
              const res = await axios.post('/conversation',convData ,{
                headers: { "authorization": `Bearer ${token}` },
              });
                if(res.status === 200){
                  const msgData ={
                    conversationId : res.data._id,
                    sender,
                    text:text
                  }
                  const resMsg = await axios.post("/messages", msgData, {
                    headers: { "authorization": `Bearer ${token}` },
                  })
                  if(resMsg.status === 200){
                    // dispatch(handleconvId({conversationId:res.data._id}))
                    socket.emit('sendMessage' , {
                      senderId:sender,
                      reciverId:location.state.user._id,
                      text:text,
                      createdAt:resMsg.data.createdAt,
                    conversationId:res.data._id
                    })
                    socket.emit('addConversation' , {
                      senderId:sender,
                      reciverId:location.state.user._id,
                    conversationId:res.data._id
                    })

                    setMessages(resMsg.data)

  
                  }
                }
            } catch (error) {
              console.log(error.response)
            }
           
  
          }else{
            
            try {
              const msgData ={
                conversationId : conversationId,
            sender,
            text: text,
          }
          const res = await axios.post("/messages", msgData, {
            headers: { "authorization": `Bearer ${token}` },
          })
          if(res.status === 200){
            socket.emit('sendMessage' , {
              sender,
              reciverId:location.state.user._id,
              text:text,
              createdAt:res.data.createdAt,
              conversationId : conversationId,
            })
            setMessages(res.data)
          }
          
        } catch (error) {
          console.log(error.response)
        }

      }
    }
    return (
        <>
        <AccModal />
        <Grid container direction="column" style={{overflow:"hidden" , width:"100%" }} sx={height ? {height:"unset"} : {height:"100vh"}}>
            <Grid item xs={1} sx={{bgcolor:"#2F3135" , width:"100%" , height:"100%" }}>
                <ChatHeader data={location.state.user}  /> 
            </Grid>
            <Grid item xs={10} sx={{ bgcolor:"#363A3F" , overflowY:"auto" , height:"100%"  , width:"100%"}}>
               <ChatMessage conversationId={conversationId} msg={messages} />
            </Grid>
            <Grid item xs={1} sx={{bgcolor:"#363A3F", overflow:"hidden"  , width:"100%"}}>
                <ChatFooter changeHeight={changeHeight} sendMessage={sendMsg}  />
            </Grid>
        </Grid>
</>
    )
}

export default MobileChat
