import { Divider, Grid, Skeleton, Stack , Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "react-chat-elements/dist/main.css";
import { ChatItem } from "react-chat-elements";
import pic from '../../../../assets/userAvatar.png'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'timeago.js';
import { handleconvId } from '../../../../Redux';
import socket from '../../../socket';
import API from '../../../config/API';
function MobleContactList(props) {
  const history = useHistory()
  const dispatch = useDispatch()
  const getIsRead = useSelector(state => state.socketState.message)
  const currentUser = useSelector((state) => state.userState.user);
  const [usersData, setUsersData] = useState({});
  const [countMsg , setCountMsg] = useState(0)
  const [onlineUser , setOnlineUser] = useState(false)
  
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
    const users = props.data.members?.find((user) => user !== currentUser._id);

    const getUserData = async () => {
      if (users) {

        try {
          const res = await API({method:'get' , url:`/user/allUsers/${users}`})

          setUsersData(res.data);
        } catch (error) {
          console.log(error.response);
        }
        
      }
    };
    getUserData();
  }, [currentUser, props]);
  
  // console.log(usersData)
  // console.log(props)
  useEffect(()=>{
    const getReadMessage = async ()=>{

      await API({method:'get' , url:`/messages/${props.data._id}`})
        .then(res=>{
          let count = 0;
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
        })
        .catch(err=>{
            console.log(err)
        })
    }
    getReadMessage()
},[usersData,getIsRead,props])

const updateMessages = async ()=>{

  await API({method:'put' , url:`/messages/${props.data._id}` , data:{isRead:true}})
  .then(res=>{
    if(res.status === 200){
      setCountMsg(0)
    }
  })
  .catch(err=>{
    console.log(err)
  })
}

  



    return (
        <Grid container >
        <Container>

            {props.active ? (
        <ChatItem
          avatar={usersData.pic === "" ? pic : usersData.pic}
          alt={"conversation users"}
          title={usersData.name}
          subtitle="Hi , I'm ready to chat!"
          dateString={format(props.data.createdAt)}
          unread={countMsg}
          onClick={()=>{
            updateMessages()
            history.push({pathname:'/chat' , state:{user:usersData}})
            dispatch(handleconvId({conversationId:props.data._id}))
            
            }}
          onContextMenu={()=>alert('hi')}
          avatarFlexible={true}
          statusText=""
          statusColor={onlineUser ? "green" : 'red'}
        />
      ) : (
        <Stack spacing={1}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item >
            <Grid container alignItems="center">
                <Grid item sx={{ mr: 2 }}>
                <Skeleton
                variant="circular"
                width={40}
                height={40}
                sx={{ bgcolor: "grey.500" }}
              />
                </Grid>
                <Grid item>
                <Skeleton
                variant="text"
                sx={{ bgcolor: "grey.500" }}
              />
              <Skeleton
                variant="text"
                width={200}
                height={40}
                sx={{ bgcolor: "grey.500" }}
              />
                </Grid>
            </Grid>
              
            </Grid>
            <Grid item >
              <Skeleton
                variant="text"
                width={40}
                height={20}
                sx={{ bgcolor: "grey.500" , mb:5}}
              />
            
            </Grid>
          </Grid>
        </Stack>
      )}
      <Divider
        sx={{ background: "gray", marginTop: 2, marginBottom: 2 }}

      />
        </Container>
        </Grid>
    )
}

export default MobleContactList
