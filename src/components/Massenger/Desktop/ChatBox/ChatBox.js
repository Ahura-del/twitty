import React, { useEffect, useState } from "react";
import { Alert, Grid, Typography } from "@mui/material";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatMessage from "./ChatMessage/ChatMessage";
import ChatFooter from "./ChatFooter/ChatFooter";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../../socket";
import {
  sendReciverUserId,
  updateConv,
  handleconvId,
  alertHandle,
} from "../../../../Redux";
import API from "../../../config/API";

function ChatBox() {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState();
  const [update, setUpdate] = useState(false);
  const { reciverUserId, conversationId } = useSelector(
    (state) => state.conversationState
  );
  const message = useSelector((state) => state.socketState.message);
  const AlertState = useSelector((state) => state.modalState.alert);
  const allMessages = useSelector((state) => state.conversationState.messages);
  const conv = useSelector((state) => state.socketState.conversation);
  const rmvMsg = useSelector((state) => state.socketState.removeMsg);
  const sender = localStorage.getItem("userId");

  useEffect(() => {
    if (navigator.onLine) {
      if (allMessages.length > 0) {
        setMessages(JSON.parse(allMessages));
      } else {
        setMessages([]);
      }
    } else {
      setMessages("offline");
    }
  }, [update, rmvMsg, allMessages]);

  useEffect(() => {
    if (message.length !== 0) {
      // console.log('hi' , message)
      setMessages((oldMsg) => [...oldMsg, message]);
    }
  }, [message]);
  useEffect(() => {
    if (AlertState) {
      setTimeout(() => {
        dispatch(alertHandle(false));
      }, 3000);
    }
  }, [AlertState,dispatch]);

  
  const sendMessage = async (e) => {
    const checkInternet = navigator.onLine;
    if (e.length < 1) {
      return;
    }

    if (!checkInternet) {
      return dispatch(alertHandle(true));
    }

    if (conversationId.length === 0) {
      // try {
      const convData = {
        senderId: sender,
        reciverId: reciverUserId,
      };

      const res = await API({
        method: "post",
        url: "/conversation",
        data: convData,
      });
      if (res.status === 200) {
        const msgData = {
          conversationId: res.data._id,
          sender,
          text: e,
          isRead: false,
        };
        const resMsg = await API({
          method: "post",
          url: "/messages",
          data: msgData,
        });
        if (resMsg.status === 200) {
          socket.emit("addConversation", {
            senderId: sender,
            reciverId: reciverUserId,
            conversationId: res.data._id,
          });
          socket.emit("sendMessage", {
            senderId: sender,
            reciverId: reciverUserId,
            text: e,
            createdAt: resMsg.data.createdAt,
            conversationId: res.data._id,
            isRead: false,
          });
          // console.log(resMsg)
          dispatch(handleconvId({ conversationId: res.data._id }));
          // dispatch(updateState())
          dispatch(updateConv());

          setMessages([...resMsg.data]);
        }
      }

      // }catch(err){
      //   console.log(err.response)
      // }
    } else {
      try {
        const msgData = {
          conversationId,
          sender,
          text: e,
          isRead: false,
        };

        const res = await API({
          method: "post",
          url: "/messages",
          data: msgData,
        });

        if (res.status === 200) {
          socket.emit("sendMessage", {
            sender,
            reciverId: reciverUserId,
            text: e,
            createdAt: res.data.createdAt,
            conversationId,
            isRead: false,
          });

          setMessages((oldMsg) => [...oldMsg, res.data]);
          // subscribeUser()
          // dispatch(updateState())
        }
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  // console.log(messages)

  const delChatHandler = async (id) => {
    if (!navigator.onLine) {
      return dispatch(alertHandle(true));
    }
    if (id) {
      try {
        const res = await API({ method: "delete", url: `/conversation/${id}` });

        if (res.status === 200) {
          socket.emit("removeConversation", { conversationId });
          dispatch(updateConv());
        }
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 500) {
          dispatch(sendReciverUserId({ userId: "" }));
        }
      }
    }
  };

  const clearHistory = async (convId, userId) => {
    if (!navigator.onLine) {
      return dispatch(alertHandle(true));
    }
    try {
      const res = await API({ method: "delete", url: `/messages/${convId}` });

      if (res.status === 200) {
        // dispatch(updateState())
        setUpdate(!update);
        socket.emit("removeMessage", {
          reciverId: userId,
          status: true,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (conv.length === 0) {
      dispatch(sendReciverUserId({ userId: "" }));
    }
  }, [dispatch, conv]);

  return (
    <>
      {AlertState && (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div style={{ width: "30%", position: "absolute", zIndex: 2 }}>
            <Alert severity="error">Please connect to the internet</Alert>
          </div>
        </div>
      )}
      <Grid
        container
        direction="column"
        sx={{ height: "100vh", width: "100%", overflow: "hidden" }}
      >
        {reciverUserId !== "" ? (
          <>
            <Grid item xs={1} sx={{ height: "100%", width: "100%" }}>
              <ChatHeader
                userId={reciverUserId}
                conversationId={conversationId}
                delChat={(userId) => delChatHandler(userId)}
                clearHistory={(convId, userId) => clearHistory(convId, userId)}
              />
            </Grid>
            <Grid
              item
              xs={9}
              sx={{ pt: 2, height: "100%", width: "100%", overflowY: "auto" }}
            >
              {messages.length > 0 && <ChatMessage messages={messages} />}
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
    </>
  );
}

export default ChatBox;
