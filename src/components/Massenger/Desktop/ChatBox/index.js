import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatFooter from "./ChatFooter";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {sendReciverUser, updateConversationId, updateState} from "../../../../Redux";
import io  from "socket.io-client";
import { useRef } from "react";


function Index() {
  const dispatch = useDispatch();
  const socketRef = useRef()
  const [messages , setMessages] = useState([])
  const { reciverUserId , conversationId} = useSelector((state) => state.messagesState);
  const stateUpdate = useSelector(state => state.modalState.update)
  const sender = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  // const [currentChat, setCurrentChat] = useState(null);
  // const [currentChatState , setCurrentChatState] = useState('')
  // const [delChatBtn , setDelChatBtn] = useState(false)

  useEffect(()=>{
    socketRef.current = io.connect('/')
    socketRef.current.emit('addUser' , sender);
    socketRef.current.on('getMessage' , (msg)=>{
      setMessages(oldMsg=>[...oldMsg ,msg ])
    })
  
  },[sender,dispatch])


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
  },[token,conversationId,stateUpdate])

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
          console.log('hi')
          const msgData = {
            conversationId: res.data._id,
            sender,
            text: e,
          };
          const resMsg = await axios.post("/messages", msgData, {
            headers: { "authorization": `Bearer ${token}` },
          });
          if (resMsg.status === 200) {
            socketRef.current.emit('sendMessage' , {
              senderId:sender,
              reciverId:reciverUserId,
              text:e
            })
            // console.log(resMsg.data)
            dispatch(updateConversationId({conversationId:res.data._id}))
            setMessages(oldMsg =>[...oldMsg , resMsg.data])
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
          // setUpdate(!update);
          // setCurrentChatState('get')
          // console.log(res.data)
          // dispatch(updateState())
          socketRef.current.emit('sendMessage' , {
            sender,
            reciverId:reciverUserId,
            text:e,
            createdAt:res.data.createdAt,
            conversationId
          })
          setMessages(oldMsg =>[...oldMsg , res.data])
        }
      } catch (error) {
        console.log(error.response)
      }   
    }
  };


  
  
  const delChatHandler =async (id)=>{
    if(id){
      try {
        const res = await axios.delete(`/conversation/${id}` ,{headers:{'authorization': `Bearer ${token}`}} )
        if(res.status === 200){
          dispatch(sendReciverUser({userId:''}))
          socketRef.current.emit('sendState' , {
            reciverId : id,
            state:'delete'
          })
          dispatch(updateState())
          
        }
      } catch (error) {
        console.log(error.response)
        
      }
    }
  }

  
  // useEffect(() => {
  //   if (reciverUserId === "") {
  //     setCurrentChat(null);
  //     setCurrentChatState('fail')
  //   } else {
  //     setCurrentChatState('get')
  //     setCurrentChat(messages);
  //   }
    
  // }, [messages,stateUpdate ,reciverUserId]);
  // console.log(messages)
  // console.log(reciverUserId)

  return (
    <Grid
      container
      direction="column"
      sx={{ height: "100vh", width: "100%", overflow: "hidden" }}
    >
      {reciverUserId !== ""  ? (
        <>
          <Grid item xs={1} sx={{ height: "100%", width: "100%" }}>
            <ChatHeader userId={reciverUserId}  conversationId={conversationId} delChat={(userId) =>delChatHandler(userId)} />
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

export default Index;
