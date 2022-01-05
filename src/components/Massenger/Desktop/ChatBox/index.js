import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatFooter from "./ChatFooter";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {sendReciverUser, updateConversationId, updateState} from "../../../../Redux";
// import io  from "socket.io-client";

// const socket = io.connect('http://localhost:5000')

function Index() {
  const dispatch = useDispatch();

  const [update, setUpdate] = useState(false);
  const [messages , setMessages] = useState([])
  const { reciverUserId , conversationId} = useSelector((state) => state.messagesState);
  const stateUpdate = useSelector(state => state.modalState.update)
  const sender = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [currentChat, setCurrentChat] = useState(null);
  const [currentChatState , setCurrentChatState] = useState('')

  useEffect(()=>{
    if(conversationId.length > 0){
      const fetchMsg = async ()=>{
        try {
          const res = await axios.get(`messages/${conversationId}` , {
            headers: { "authorization": `Bearer ${token}` }
          })
          if(res.status === 200){
            setMessages(res.data)
          }
        } catch (error) {
          console.log(error.response)
        }
      }
      fetchMsg()
    }else{
      setMessages([])
    }
  },[token,conversationId,update,stateUpdate])

  const sendMessage =async (e) => {
    if(conversationId.length === 0){
      try {
        const convData = {
          "senderId":sender,
          "reciverId":reciverUserId
        }
        const res = await axios.post('/conversation',convData ,{
          headers: { "authorization": `Bearer ${token}` },
        });
        if(res.status === 200){
          const msgData = {
            conversationId: res.data._id,
            sender,
            text: e,
          };
          const resMsg = await axios.post("/messages", msgData, {
            headers: { "authorization": `Bearer ${token}` },
          });
          if (resMsg.status === 200) {
            dispatch(updateConversationId({conversationId:res.data._id}))
            setUpdate(!update);
            setCurrentChatState('get')
            dispatch(updateState())
          }
        }

      }catch(err){
        console.log(err.response)
      }
    }else{
      try {
        const msgData = {
          conversationId,
          sender,
          text: e,
        };
        const res = await axios.post("/messages", msgData, {
          headers: { "authorization": `Bearer ${token}` },
        });
        if(res.status===200){
          setUpdate(!update);
          setCurrentChatState('get')
          dispatch(updateState())
        }
      } catch (error) {
        console.log(error.response)
      }   
    }
  };

  const delChatHandler =async ()=>{
    if(reciverUserId){
      try {
        const res = await axios.delete(`/conversation/${reciverUserId}` ,{headers:{'authorization': `Bearer ${token}`}} )
        if(res.status === 200){
          dispatch(sendReciverUser({userId:''}))
          dispatch(updateState())
        }
      } catch (error) {
        console.log(error.response)

      }
    }
  }
 

  useEffect(() => {
    if (reciverUserId === "") {
      setCurrentChat(null);
      setCurrentChatState('fail')
    } else {
      setCurrentChatState('get')
      setCurrentChat(messages);
    }
  
  }, [messages,update,stateUpdate ,reciverUserId]);
  
  return (
    <Grid
      container
      direction="column"
      sx={{ height: "100vh", width: "100%", overflow: "hidden" }}
    >
      {currentChatState === 'get'  ? (
        <>
          <Grid item xs={1} sx={{ height: "100%", width: "100%" }}>
            <ChatHeader userId={reciverUserId} conversationId={conversationId} delChat={delChatHandler} />
          </Grid>
          <Grid
            item
            xs={9}
            sx={{ pt: 2, height: "100%", width: "100%", overflowY: "auto" }}
          >
            <ChatMessage messages={currentChat} />
          </Grid>
          <Grid item xs={2} sx={{ height: "100%", width: "100%" }}>
            <ChatFooter sendHandler={sendMessage} />
          </Grid>
        </>

      ) : (
       
        <Grid
          item
          style={{ display: "flex", height: "100%", width: "100%" }}
          justifyContent="center"
          textAlign="center"
          alignItems="center"
        >
          <Typography component="p" sx={{ color: "gray" }}>
            Open a conversation to start a chat.
          </Typography>
        </Grid>

      )}
    </Grid>
  );
}

export default Index;
