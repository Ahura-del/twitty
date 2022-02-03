import { Divider, Grid, Skeleton, Stack , Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "react-chat-elements/dist/main.css";
import { ChatItem } from "react-chat-elements";
import pic from '../../../../assets/userAvatar.png'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { format } from 'timeago.js';
import { handleconvId } from '../../../../Redux';
function MobleContactList(props) {
  const history = useHistory()
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.userState.user);
  const token = localStorage.getItem("token");
  const [usersData, setUsersData] = useState({});

  
  useEffect(() => {
    const users = props.data.members?.find((user) => user !== currentUser._id);

    const getUserData = async () => {
      if (users) {
        
        try {
          const res = await axios.get(`/user/allUsers/${users}`, {
            headers: { authorization: `Bearer ${token}` },
          });
          setUsersData(res.data);
        } catch (error) {
          console.log(error.response);
        }
        
      }
    };
    getUserData();
  }, [currentUser, props, token]);
  
  // console.log(usersData)
  // console.log(props)


  



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
          unread={2}
          onClick={()=>{
            history.push({pathname:'/chat' , state:{user:usersData}})
            dispatch(handleconvId({conversationId:props.data._id}))
            
            }}
          onContextMenu={()=>alert('hi')}
          avatarFlexible={true}
          statusText=""
          statusColor="green"
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
