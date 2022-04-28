import { ArrowBack, Clear, DeleteForever, MoreVert, Person } from '@mui/icons-material'
import { Avatar, Container, Grid, Menu, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { alertHandle, modalHandler, sendReciverUserId, updateConv, updateMsg} from '../../../../../Redux'
import socket from '../../../../socket';
import API from '../../../../config/API'
function ChatHeader({data}) {
    //-------history-----------------
    const history = useHistory()
  //------------modal----------------
  const dispatch = useDispatch()
  const {conversationId} = useSelector((state) => state.conversationState);
    //-----------menu----------------

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
   //------------modal----------------
   const avatarModal = () => {
    dispatch(
      modalHandler({ state: true, label: "avatar", reciveUserId: data._id })
    );
    setAnchorEl(null);
  };

  //----------delete chat -------------
  const delChatHandler =async ()=>{
    if(!navigator.onLine){
      return dispatch(alertHandle(true))
    }
    if(data){

      try {
        const res = await API({method:'delete' , url:`${window.api}/conversation/${data._id}`})


        if(res.status === 200){
          socket.emit('removeConversation' , {conversationId}) 
          dispatch(updateConv())   
          history.goBack()
        }        
      } catch (error) {
        console.log(error.response)
        if(error.response.status === 500){
          dispatch(sendReciverUserId({userId:""}))

        }
        
      }
    }
  }


  //-----------clear history--------------
  const clearHistory = async ()=>{
    if(!navigator.onLine){
      return dispatch(alertHandle(true))
    }
    try {

      const res = await API({method:'delete' , url:`${window.api}/messages/${conversationId}`})

      if (res.status === 200) {
        setAnchorEl(null);
        dispatch(updateMsg())
       socket.emit('removeMessage' , {
         reciverId:data._id,
         status:true
       })
      }
    } catch (error) {
      console.log(error.response);
    }
  }


    return (
       <Container style={{height:"100%"}}>
           <Grid container justifyContent="space-between" alignItems="center" style={{height:"100%"}}>
            <Grid item >
            <Grid container alignItems="center" >
                <Grid item>
                <ArrowBack sx={{color:"#fdfdfd" , mr:2}} onClick={()=> history.goBack()} />
                </Grid>
                <Grid item>
                <Grid container onClick={avatarModal}>
                    <Grid item sx={{mr:2}}>
                        <Avatar src={data?.pic === "" ? '' : data.pic} alt="user avatar" sx={{width:50 , height:50 , cursor:"pointer"}} onClick={avatarModal} />
                    </Grid>
                    <Grid item>
                        <Grid container direction="column" sx={{height:"100%"}} justifyContent="space-between">
                            <Grid item>
                                <Typography sx={{color:"#fdfdfd"}}>
                                    {data.name}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography sx={{color:"#999" , fontSize:14}}>
                                Available
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                </Grid>
            </Grid>
                
            </Grid>
            <Grid item>
                <MoreVert sx={{color:"#fdfdfd"}} onClick={handleClick} />
            </Grid>
            <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
         
          >
            <MenuItem onClick={avatarModal}>
            <Person sx={{mr:2}} />
            Profile
            </MenuItem>
            <MenuItem onClick={delChatHandler}>
            <DeleteForever sx={{mr:2}} />
            Delete chat
            </MenuItem>
            <MenuItem onClick={clearHistory}>
            <Clear sx={{mr:2}} />
            Clear history
            </MenuItem>
          </Menu>
           </Grid>
       </Container>
    )
}

export default ChatHeader
