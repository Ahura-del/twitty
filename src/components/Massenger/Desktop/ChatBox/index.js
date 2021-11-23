import React from "react";
import {  Grid } from "@mui/material";
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'
import ChatFooter from './ChatFooter'
function Index() {
  return (
    <Grid container spacing={1} direction="column" sx={{ height:"100vh" ,width:"100%", overflow:"hidden"}}> 
      <Grid item xs={1} sx={{height:"100%" , width:"100%" }}>
        <ChatHeader  />
      </Grid>
      <Grid item xs={10} sx={{pt:2 ,height:"100%" , width:"100%" , overflowY:"auto"}}>
        <ChatMessage />
      </Grid>
      <Grid item xs={1} sx={{height:"100%" , width:"100%"}}>

        <ChatFooter />
      </Grid>
    </Grid>
  );
}

export default Index;
