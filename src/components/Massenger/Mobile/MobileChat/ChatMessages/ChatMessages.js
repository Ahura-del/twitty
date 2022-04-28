import { Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRmvConv } from '../../../../../Redux'
import API from '../../../../config/API'
import ChatText from './ChatText/ChatText'
function ChatMessages({conversationId , msg}) {
    const endPage = useRef()
    const dispatch = useDispatch()
    const {message ,removeMsg } = useSelector(state => state.socketState)
    const {updateMessage} = useSelector(state => state.conversationState)

    const [messages , setMessages] = useState([])

    useEffect(()=>{
      // if(navigator.onLine){

        if(conversationId !== ""){
          const fetchMsg = async ()=>{
          try {
            
            const res = await API({method:'get' , url:`${window.api}/messages/${conversationId}`})

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
    // }else{
      // if('caches' in window){
        // caches.match('http://localhost:3000/messages')
        // .then()
      // }
    // }
   
    },[removeMsg,updateMessage,conversationId])
    
    // console.log(messages)
    // console.log(message)

    // console.log(msg)
    useEffect(()=>{
   if(messages.length !== 0){
     setMessages(oldMsg => [...oldMsg , message])
    }
    },[message])


useEffect(()=>{
  if(msg.text?.length > 0){
    setMessages(prev=>[...prev , msg])
  }
},[msg])

useEffect(()=>{
  if(conversationId.length === 0 && messages.length === 0){
    dispatch(getRmvConv(false))
  }
},[conversationId,dispatch,messages])

    useEffect(()=>{
        if (endPage.current) {
            endPage.current.scrollIntoView(
              {
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest'
              })
            }
    },[])
    return (
       <Container  sx={{height:"100%"}}>
       {msg === 'offline' ? (
            <Grid container sx={{ width: "100%", height: "100%" }}>
              <Grid
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  textAlign: "center",
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  sx={{ flexBasis: "100%", color: "#FA6D38", fontSize: "24px" }}
                >
                  You're Offline!
                </Typography>
                <Typography
                  sx={{ flexBasis: "100%", color: "#FA6D38", fontSize: "24px" }}
                >
                  Please connect to the network
                </Typography>
              </Grid>
            </Grid>
          )  :    messages.length > 0 ? (<>

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
