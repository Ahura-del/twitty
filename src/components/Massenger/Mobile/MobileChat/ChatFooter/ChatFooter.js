import { Telegram } from "@mui/icons-material";
import { Container, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import "./chatFooterMobile.css";

function ChatFooter(props) {


  const [inputText , setInputText] = useState('')
//handleconvId
  const sendMsg = async (e)=>{
    if(e.key === 'Enter' || e.type === "click"){
      if(inputText === ""){
        return
      }else{
        props.sendMessage(inputText)
        setInputText('')
      }
  }
  }

  return (
    <Container sx={{ width: "100%", height: "100%" }}>
      <Grid
        container
        sx={{ width: "100%", height: "100%" }}
        alignItems="center"
      >
        <Grid item sx={{ width: "100%" }} xs={10}>
          <TextField
            id="mobile-chat-input"
            autoComplete="off"
            onFocus={() => props.changeHeight(true)}
            onBlur={() => props.changeHeight(false)}
            onChange={(e)=>setInputText(e.target.value)}
            value={inputText}
            size="small"
            sx={{ width: "100%" }}
            placeholder="Your Message..."
            variant="outlined"
            onKeyDown={sendMsg}
            
          />
        </Grid>
        <Grid item sx={{ width: "100%", ml: 2 }} xs={1}>
          <Telegram sx={{  fontSize: 40 ,cursor:"pointer" }} color={inputText.length > 0 ? "warning" : "disabled"} onClick={sendMsg} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ChatFooter;