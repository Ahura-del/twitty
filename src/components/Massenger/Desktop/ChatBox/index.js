import React, { useEffect, useState } from "react";
import {  Grid, Typography } from "@mui/material";
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'
import ChatFooter from './ChatFooter'
import { useSelector } from "react-redux";
function Index() {
  const {messages , user} = useSelector(state => state.messagesState) 
  const [currentChat , setCurrentChat] = useState(null)
  useEffect(()=>{
    if(messages.length < 1){
      setCurrentChat(null)
    }else{
      setCurrentChat(messages)
    }
  },[messages])
  return (
    <Grid container  direction="column" sx={{ height:"100vh" ,width:"100%", overflow:"hidden"}} > 
      {currentChat ? (
        <>
      <Grid item xs={1} sx={{height:"100%" , width:"100%" }}>
        <ChatHeader userId={user}  />
      </Grid>
      <Grid item xs={9} sx={{pt:2 ,height:"100%" , width:"100%" , overflowY:"auto"}}>
        <ChatMessage messages={currentChat} />
      </Grid>
      <Grid item xs={2} sx={{height:"100%" , width:"100%"}}>
        <ChatFooter />
      </Grid>
        </>
      ):(
        <Grid item style={{display:'flex' ,height:"100%" , width:"100%"}} justifyContent="center" textAlign='center' alignItems='center'>
           
            <Typography component='p' sx={{color:"gray"}}  >
              Open a conversation to start a chat.
            </Typography>
            
        </Grid>
      )}
    </Grid>
  );
}

export default Index;
