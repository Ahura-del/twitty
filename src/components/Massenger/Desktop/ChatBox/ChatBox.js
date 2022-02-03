import React, { useEffect, useState  } from "react";
import { Grid, Typography } from "@mui/material";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatMessage from "./ChatMessage/ChatMessage";
import ChatFooter from "./ChatFooter/ChatFooter";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import socket from '../../../socket';
import {sendReciverUserId, updateConv, handleconvId} from "../../../../Redux";


function ChatBox() {
  const dispatch = useDispatch();
  const [messages , setMessages] = useState([])
  const [update , setUpdate] = useState(false)
  const { reciverUserId , conversationId} = useSelector((state) => state.conversationState);
  const message = useSelector(state => state.socketState.message)
  const conv =  useSelector(state => state.socketState.conversation)
  const rmvMsg = useSelector(state=> state.socketState.removeMsg)
  const sender = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

 

useEffect(()=>{
    if(conversationId?.length > 0){
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
 
  },[update,rmvMsg,token,conversationId])
  
useEffect(()=>{
  // if(message){
    setMessages(oldMsg => [...oldMsg , message])
  // }
},[message])

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
            socket.emit('addConversation' , {
              senderId:sender,
              reciverId:reciverUserId,
            conversationId:res.data._id
            })
            socket.emit('sendMessage' , {
              senderId:sender,
              reciverId:reciverUserId,
              text:e,
              createdAt:resMsg.data.createdAt,
            conversationId:res.data._id
            })
       
            dispatch(handleconvId({conversationId:res.data._id}))
            // dispatch(updateState())
            dispatch(updateConv())
            setMessages([...resMsg.data])
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
          socket.emit('sendMessage' , {
            sender,
            reciverId:reciverUserId,
            text:e,
            createdAt:res.data.createdAt,
            conversationId,
          })
         
            setMessages(oldMsg =>[...oldMsg , res.data])
        
          // dispatch(updateState())
        }
      } catch (error) {
        console.log(error.response)
      }   
    }
  };


// console.log(messages)  
  
  const delChatHandler =async (id)=>{
    if(id){
      try {
        const res = await axios.delete(`/conversation/${id}` ,{headers:{'authorization': `Bearer ${token}`}} )

        if(res.status === 200){
          socket.emit('removeConversation' , {conversationId}) 
          dispatch(updateConv())   
        }        
      } catch (error) {
        console.log(error.response)
        if(error.response.status === 500){
          dispatch(sendReciverUserId({userId:""}))

        }
        
      }
    }
  }

  const clearHistory = async (convId , userId)=>{
    try {
      const res = await axios.delete(`/messages/${convId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        // dispatch(updateState())
        setUpdate(!update)
       socket.emit('removeMessage' , {
         reciverId:userId,
         status:true
       })
      }
    } catch (error) {
      console.log(error.response);
    }
  }
  
  useEffect(() => {
    if (conv.length === 0) {
     dispatch(sendReciverUserId({userId:""}))
    } 
  }, [dispatch,conv]);

// console.log(messages)
  return (
    <Grid
      container
      direction="column"
      sx={{ height: "100vh", width: "100%", overflow: "hidden" }}
    >
      {reciverUserId !== "" ? (
        <>
          <Grid item xs={1} sx={{ height: "100%", width: "100%" }}>
            <ChatHeader userId={reciverUserId}  conversationId={conversationId} delChat={(userId) =>delChatHandler(userId)} clearHistory={(convId , userId)=>clearHistory(convId , userId)} />
          </Grid>
          <Grid
            item
            xs={9}
            sx={{ pt: 2, height: "100%", width: "100%", overflowY: "auto" }}
          >
            <ChatMessage messages={messages} />
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

export default ChatBox;
