import { Divider, Grid, Skeleton, Stack , Menu, MenuItem, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import pic from "../../../../../assets/userAvatar.png";
import "react-chat-elements/dist/main.css";
import { ChatItem } from "react-chat-elements";
import { format } from "timeago.js";
import useWidthDimensions from "../../../../../Hook/useWidthDimensions";
import "./contactList.css";
import { useSelector, useDispatch } from "react-redux";
import {  sendReciverUserId, handleconvId, getMessages, updateConv, alertHandle } from "../../../../../Redux";
import socket from '../../../../socket';
import API from "../../../../config/API";
import axios from "axios";

function ContactItem(props) {
  const dispatch = useDispatch();
  const { width } = useWidthDimensions();
  const [xs, setXs] = useState({ small: 3, big: 9 });
  const [onlineUser , setOnlineUser] = useState(false)
  const currentUser = useSelector((state) => state.userState.user);
  const getIsRead = useSelector(state => state.socketState.message)
  const token = localStorage.getItem('token')
  const [usersData, setUsersData] = useState({});
const [countMsg , setCountMsg] = useState(0)


  
  useEffect(()=>{
    const users = props.data.members?.find((user) => user !== currentUser._id);
    socket.on('getUsers' , u=>{
      u.forEach(user =>{
       if(user.userId === users){
          setOnlineUser(true)
        }
      })
    })
  },[currentUser,props])

  useEffect(() => {
    const users = props.data?.members?.find((user) => user !== currentUser._id);
    const getUserData = async () => {
      if (users) {
       
        try {

          const res = await API({method:'get' , url:`/user/allUsers/${users}` })

          setUsersData(res.data);
          // console.log(res.data)
        } catch (error) {
          console.log(error.response);
        }

      }
    };
    getUserData();
  }, [currentUser, props]);

  useEffect(() => {
    if (width <= 1300 && width > 700) {
      setXs({ small: 1, big: 11 });
    } else {
      setXs({ small: 3, big: 9 });
    }
  }, [width]);

  

  const subtitleHandler = () => {
    if (xs.small === 1) {
      return "";
    } else {
      if (usersData.bio === "") {
        return "Hi , I'm ready to chat!";
      } else {
        return usersData.bio;
      }
    }
  };
  const onlineHandler = ()=>{
    if(xs.small ===1){
      return null
    }else{
      if(onlineUser){
        return 'green'
      }else{
        return 'red'
      }
    }
  }
// console.log(props.online)
// const id = localStorage.getItem('userId')
useEffect(()=>{
    const getReadMessage = async ()=>{

      await API({method:'get' , url:`/messages/${props.data._id}`})
        .then(res=>{
          let count = 0;
          if(res.data.length > 0){

            res.data.forEach(msg=>{
              if(msg.sender === usersData._id){
                if(!msg.isRead){
                  count++
                }else{
                  count = 0                
                }
              }else{
                count = 0
              }
            })
            setCountMsg(count)
          }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    getReadMessage()
},[usersData,getIsRead,props])

const updateMessages = async ()=>{
  await API({method:'put' , url:`/messages/${props.data._id}` , data: {isRead:true}})
  .then(res=>{
    if(res.status === 200){
      setCountMsg(0)
    }
  })
  .catch(err=>{
    console.log(err)
  })
}
const fetchMessages = async (convId)=>{
  
   await axios.get(`messages/${convId}` , {headers:{'authorization': `Bearer ${token}`}} )
    // API({method:'get' , url:`messages/${convId}`})
    .then(res => {
      // console.log(JSON.stringify(res.data))
      if(res.status === 200){
        dispatch(getMessages(JSON.stringify(res.data)))
       
      }else{
        dispatch(getMessages([]))
      }
      
    })
    .catch(err=>{
      console.log(err)
    })

}
const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick =  (event) => {
    event.preventDefault()
    setAnchorEl(event.currentTarget);
 setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
const deleteContact = (convId)=>{
  if(!navigator.onLine){
    return dispatch(alertHandle(true))
  }
  API({method:'delete' , url:`/conversation/${convId}`})
  .then(res =>{
    if(res.status === 200){
      setAnchorEl(null)
      dispatch(updateConv())
    }
  })
  .catch(err=>{
    console.log(err)
  })
}

  return (
    <>
    
      {props.active ? (
        <ChatItem
          avatar={usersData.pic === "" ? pic : usersData.pic}
          alt={"conversation users"}
          title={xs.small === 1 ? "" : usersData.name}
          subtitle={subtitleHandler()}
          dateString={format(props.data.createdAt)}
          unread={xs.small ===1 ? 0 : countMsg}
          avatarFlexible={true}
          statusColor={onlineHandler()}
          statusText=""
          onContextMenu={(e)=>handleClick(e)}
          onClick={() => {
            updateMessages()
            fetchMessages(props.data._id)
            dispatch(handleconvId({ conversationId: props.data._id }));
            dispatch(sendReciverUserId({ userId: usersData._id }));

          }}
        />
      ) : (
        <Stack spacing={1}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Grid container alignItems="center">
                <Grid
                  item
                  sx={xs.small === 1 ? { mr: 0, mb: 3 } : { mr: 2, mb: 0 }}
                >
                  <Skeleton
                    variant="circular"
                    width={40}
                    height={40}
                    sx={{ bgcolor: "grey.500" }}
                  />
                </Grid>
                <Grid item>
                  <Skeleton
                    className="skeleton-text"
                    variant="text"
                    sx={{ bgcolor: "grey.500" }}
                  />
                  <Skeleton
                    className="skeleton-text"
                    variant="text"
                    width={200}
                    height={40}
                    sx={{ bgcolor: "grey.500" }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Skeleton
                className="skeleton-text"
                variant="text"
                width={40}
                height={20}
                sx={{ bgcolor: "grey.500", mb: 5 }}
              />
            </Grid>
          </Grid>
        </Stack>
      )}

      <Divider
        style={{ background: "gray", marginTop: 15, marginBottom: 15 }}
        className="divider"
      />
     
     <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
         
          >
            <MenuItem onClick={()=> deleteContact(usersData._id)}>

              <Typography>
                Delete
              </Typography>
            </MenuItem>
          </Menu>
    </>
  );
}

export default ContactItem;
