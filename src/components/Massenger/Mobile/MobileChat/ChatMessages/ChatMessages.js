import { Container, Grid, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import ChatText from './ChatText/ChatText'
function ChatMessages({conversationId , msg}) {
    const endPage = useRef()
    const token = localStorage.getItem("token");
    const {message ,removeMsg } = useSelector(state => state.socketState)
    const {updateMessage} = useSelector(state => state.conversationState)

    const [messages , setMessages] = useState([])

    useEffect(()=>{
      if(conversationId !== ""){
        const fetchMsg = async ()=>{
          try {
            const res = await axios.get(`messages/${conversationId}` , {
              headers: { "authorization": `Bearer ${token}` }
            })
            if(res.status === 200){
              setMessages(res?.data)
            }
          } catch (error) {
            console.log(error.response)
          }
        }
        fetchMsg()
      }else{
        setMessages([])
      }
   
    },[removeMsg,updateMessage,token,conversationId])
    
    useEffect(()=>{
   if(messages.length !== 0){
     setMessages(oldMsg => [...oldMsg , message])
    }
    },[message])
    // console.log(message)

useEffect(()=>{
  if(msg.text?.length > 0){
    setMessages(prev=>[...prev , msg])
  }
},[msg])

    useEffect(()=>{
        if (endPage.current) {
            endPage.current.scrollIntoView(
              {
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest'
              })
            }
    })
    return (
       <Container  sx={{height:"100%"}}>
       {messages.length > 0 ? (<>

       {messages.map((data,index)=>(
           <ChatText data={data} key={index} />
       ))}        
       </>):(
         <Grid item sx={{ width:"100%" , height:"100%" , display:"flex" , justifyContent:"center" , alignItems:"center"}}>
           <Typography sx={{color:"#999" , fontSize:20}} >
             No message !
           </Typography>
         </Grid>
       )}
        <div ref={endPage} />
        </Container>
      
    )
}

export default ChatMessages
