import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatFooter from "./ChatFooter";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {getConversation, getMessages} from "../../../../Redux";
// import io  from "socket.io-client";

// const socket = io.connect('http://localhost:5000')

function Index() {
  const dispatch = useDispatch();

  const [update, setUpdate] = useState(false);

  const { messages, reciverUserId , conversationId} = useSelector((state) => state.messagesState);
  const conversation = useSelector((state) => state.conversationState.conversation);

  const sender = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [currentChat, setCurrentChat] = useState(null);
  // const [arrivalMessage, setArivalMessage] = useState(null);

  useEffect(() => {
    dispatch(getConversation({ myUserId:sender, token }));
  }, [update , dispatch , token ,sender]);
  useEffect(() => {
    if(conversationId){
      dispatch(getMessages({ conversationId, token }));
    }
  }, [update , dispatch , token ,conversationId]);
  // useEffect(() => {
  //   socket.emit("addUser", sender);
  // }, [sender]);

  // useEffect(() => {
  //   socket.on("getUsers", (e) => {
  //     console.log(e);
  //   });
  //   socket.on('getMessage' , data =>{
  //     console.log(data)
  //   })
  // }, []);

  useEffect(() => {
    if (reciverUserId === "") {
      setCurrentChat(null);
    } else {
      setCurrentChat(messages);
    }
  }, [messages,update, reciverUserId]);


  const sendMessage = async (e) => {

    const postData = {
      senderId: sender,
      reciverId: reciverUserId,
    };
    if (conversation.length === 0) {
      try {
        const res = await axios.post("/conversation", postData, {
          headers: { "authorization": `Bearer ${token}` },
        });
        if (res.status === 200) {
          setUpdate(!update);
          const msgData = {
            conversationId: res.data._id,
            sender,
            text: e,
          };
          const resMsg = await axios.post("/messages", msgData, {
            headers: { "authorization": `Bearer ${token}` },
          });
          if (resMsg.status === 200) {
            console.log(resMsg);
          }
        }
      } catch (error) {
        console.log(error.response);
      }
    } else {
      try {
        const msgData = {
          conversationId,
          sender,
          text: e,
        };
        const resMsg = await axios.post("/messages", msgData, {
          headers: { "authorization": `Bearer ${token}` },
        });
        if (resMsg.status === 200) {
          setUpdate(!update);
        }
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  // useEffect(() => {
  //   socket.on("getMessage", (data) => {
  //     console.log(data)
  //     // setArivalMessage({
  //     //   sender: data.senderId,
  //     //   text: data.text,
  //     //   createdAt: Date.now(),
  //     // });
  //   });
  // }, []);

  // useEffect(() => {
  //   arrivalMessage &&
  //     currentChat?.members.includes(arrivalMessage.sender) &&
  //     setCurrentChat((preve) => [...preve, arrivalMessage]);
  // }, [arrivalMessage, currentChat]);
  // console.log(arrivalMessage)
  return (
    <Grid
      container
      direction="column"
      sx={{ height: "100vh", width: "100%", overflow: "hidden" }}
    >
      {currentChat ? (
        <>
          <Grid item xs={1} sx={{ height: "100%", width: "100%" }}>
            <ChatHeader userId={reciverUserId} />
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
