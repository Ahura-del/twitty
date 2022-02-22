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
    setMessages(oldMsg => [...oldMsg , message])
},[message])


const urlBase64ToUint8Array =(base64String)=> {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
const configurePushSub = ()=>{
  if(localStorage.getItem('notification')){

    if(!('serviceWorker' in navigator)){
      return
    }
    let reg ;
    navigator.serviceWorker.ready
    .then(swReg =>{
      reg = swReg;
      return swReg.pushManager.getSubscription()
    })
    .then(sub =>{
      if(sub === null){

        const vpidPublicKey = process.env.PUBLIC_VPID_KEY;
        const convertedVpidKey = urlBase64ToUint8Array(vpidPublicKey);
          reg.pushManager.subscribe({
          applicationServerKey : convertedVpidKey ,
          userVisibleOnly : true
        }).then(newSub =>{
           axios.post('/notification' , {
            title:"Twitty App",
            description : "You have new message",
            subscription : JSON.stringify(newSub)
          } , {headers:{
            'Content-Type':"application/json",
            'Accept' : 'application/json'
          }})
          .catch(err=>{
            console.log(err)
            if(Notification.permission !== 'granted'){
              console.log('permossion was not granted')
            }else{
              console.log('Ann error ocurred during the sub')
            }
          })
        })

      }else{
        axios.post('/notification' , {
          title:"Twitty App",
          description : "You have new message",
          subscription : JSON.stringify(sub)
        } , {headers:{
          'Content-Type':"application/json",
          'Accept' : 'application/json'
        }})
      }
    })
    .catch(err =>{
      console.log(err)
    })
  }else{
    return
  }
}
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
            configurePushSub()
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
            configurePushSub()
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
