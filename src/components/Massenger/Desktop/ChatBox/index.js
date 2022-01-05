import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatFooter from "./ChatFooter";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {getConversation, getMessages, sendReciverUser, updateConversationId, updateState} from "../../../../Redux";
// import io  from "socket.io-client";

// const socket = io.connect('http://localhost:5000')

function Index() {
  const dispatch = useDispatch();

  const [update, setUpdate] = useState(false);
  const { messages, reciverUserId , conversationId} = useSelector((state) => state.messagesState);
  const conversation = useSelector((state) => state.conversationState.conversation);
  const updatestate = useSelector(state => state.modalState.update)

  const sender = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [currentChat, setCurrentChat] = useState(null);
  const [currentChatState , setCurrentChatState] = useState('')
  // const [arrivalMessage, setArivalMessage] = useState(null);

  useEffect(() => {
    dispatch(getConversation({ myUserId:sender, token }));
  }, [update,updatestate , dispatch , token ,sender]);
  // useEffect(()=>{
  //   conversation.forEach(c=>{
  //     console.log(c)
  //   })
  //  },[conversation])




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
// console.log(reciverUserId)

  const sendMessage =async (e) => {
    if(conversation.length === 0){
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
            setUpdate(!update);
            setCurrentChatState('get')
            dispatch(updateState())
          }
        }

      }catch(err){
        console.log(err.response)
      }
    }else{
      conversation?.forEach(c =>{
        const userFilter = c.members.filter(user => user !== sender)
        userFilter.forEach(async(user)=>{
          if(user === reciverUserId ){
            try {
              const msgData = {
                conversationId:c._id,
                sender,
                text: e,
              };
              const resMsg = await axios.post("/messages", msgData, {
                headers: { "authorization": `Bearer ${token}` },
              });
              console.log(resMsg)
              if (resMsg.status === 200) {
                setUpdate(!update); 
                dispatch(updateState())
                setCurrentChatState('get')
                   }
            } catch (error) {
              console.log(error.response);
            }
            }

            else{
              
              try {
              const convData = {
                "senderId":sender,
                "reciverId":reciverUserId
                }
                  const res = await axios.post('/conversation',convData ,{headers: { "authorization": `Bearer ${token}`}});
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
                    setUpdate(!update);
                    setCurrentChatState('get')
                    dispatch(updateState())
                  }
                }
    
              }catch(err){
                console.log(err.response)
              }
                 

            }   

        })

        
    })
    }
        
     
   


    //check conversation
    // conversation.forEach( async (c)=>{
    //   const userFilter = await c.members.filter(user => user !== sender)
    //   userFilter.forEach(async (user) =>{
        // if(user === reciverUserId ){
        // try {
        //   const msgData = {
        //     conversationId:c._id,
        //     sender,
        //     text: e,
        //   };
        //   const resMsg = await axios.post("/messages", msgData, {
        //     headers: { "authorization": `Bearer ${token}` },
        //   });
        //   console.log(resMsg)
        //   if (resMsg.status === 200) {
        //     setUpdate(!update); 
        //     dispatch(updateState())
        //     setCurrentChatState('get')
        //        }
        // } catch (error) {
        //   console.log(error.response);
        // }
        // }
        // else{
        //   try {
        //     const convData = {
        //       "senderId":sender,
        //       "reciverId":reciverUserId
        //     }
        //     const res = await axios.post('/conversation',convData ,{
        //       headers: { "authorization": `Bearer ${token}` },
        //     });
        //     console.log(res)
        //     if(res.status === 200){
        //       const msgData = {
        //         conversationId: res.data._id,
        //         sender,
        //         text: e,
        //       };
        //       const resMsg = await axios.post("/messages", msgData, {
        //         headers: { "authorization": `Bearer ${token}` },
        //       });
        //       if (resMsg.status === 200) {
        //         setUpdate(!update);
        //         setCurrentChatState('get')
        //         dispatch(updateState())
        //       }
        //     }

        //   }catch(err){
        //     console.log(err.response)
        //   }
             
        // }    
        
    //   })
     
    // })


    // try {
    //   const res = await axios.get(`/conversation/${reciverUserId}`, {
    //     headers: { "authorization": `Bearer ${token}` },
    //   });
    //   if(res.status === 200){
    //     if(res.data.length === 0){
    //       const postData = {
    //         senderId: sender,
    //         reciverId: reciverUserId,
    //       };
    //       try {
    //         const res = await axios.post("/conversation", postData, {
    //           headers: { "authorization": `Bearer ${token}` },
    //         });
    //         if (res.status === 200) {
    //           dispatch(updateConversationId(res.data._id))
    //           // dispatch(updateState())
    //           const msgData = {
    //             conversationId: res.data._id,
    //             sender,
    //             text: e,
    //           };
    //           const resMsg = await axios.post("/messages", msgData, {
    //             headers: { "authorization": `Bearer ${token}` },
    //           });
    //           if (resMsg.status === 200) {
    //             setUpdate(!update);
    //             setCurrentChatState('get')
    //             dispatch(updateState())
    //           }
    //         }
    //       } catch (error) {
    //         console.log(error.response);
    //       }
    //     }else{
          // try {
          //   console.log(res)
          //   const msgData = {
          //     conversationId:res.data[0]._id,
          //     sender,
          //     text: e,
          //   };
          //   const resMsg = await axios.post("/messages", msgData, {
          //     headers: { "authorization": `Bearer ${token}` },
          //   });
          //   console.log(resMsg)
          //   if (resMsg.status === 200) {
          //     setUpdate(!update); 
          //     dispatch(updateState())
          //     setCurrentChatState('get')
          //        }
          // } catch (error) {
          //   console.log(error.response);
          // }
    //     }
    //   }
    // } catch (error) {
    //   console.log(error.response)
    // }

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
    const res = async()=>{
      if(reciverUserId){

        try {
          const res = await axios.get(`/conversation/${reciverUserId}`, {
            headers: { "authorization": `Bearer ${token}` },
          });
          if(res.status === 200){
            if(res.data.length ===0){
              dispatch(getMessages({ conversationId:reciverUserId, token }));

            }else{
              dispatch(getMessages({ conversationId:res.data[0]._id, token }));
            }
          }
        } catch (error) {
          console.log(error.response)
        }
     }
    }
    res()
  }, [update,updatestate, dispatch,token ,reciverUserId]);

  useEffect(() => {
    if (reciverUserId === "") {
      setCurrentChat(null);
      setCurrentChatState('fail')
    } else {
      setCurrentChatState('get')
      setCurrentChat(messages);
    }
  
  }, [messages,update,updatestate ,reciverUserId]);
  
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
