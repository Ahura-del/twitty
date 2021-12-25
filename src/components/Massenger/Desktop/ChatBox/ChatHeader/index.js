import { Clear, DeleteForever, MoreHoriz, Person } from "@mui/icons-material";
import { Avatar, Badge, Container, Grid, Menu, MenuItem, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Pic from "../../../../../assets/userAvatar.png";
import { modalHandler } from "../../../../../Redux";
function Index({userId}) {

  //-------redux---------------
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  //---------get userdata------------
  const [userData , setUserData] = useState([])
  useEffect(()=>{
    const getUserData = async ()=>{
      try {
        const res = await axios.get(`/user/allUsers/${userId}` , {
          headers: { "authorization": `Bearer ${token}` },
        })
        if(res.status === 200){
          setUserData(res.data)
        }
      } catch (error) {
        
      }
     
    }
    getUserData()
  },[userId , token])
  //------------modal----------------
  const avatarModal = ()=>{
    dispatch(modalHandler({state:true ,label:"avatar", reciveUserId:userData._id}))
    setAnchorEl(null);
  }

//-----------menu----------------

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Container sx={{height:"100%" }}  maxWidth="lg" >

    
      <Grid
        container
        direction="row"
        sx={{height:"100%"}}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Grid container>
            <Grid item>
              <Badge
                color="success"
                badgeContent=" "
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <Avatar
                  src={userData?.pic ? userData.pic : Pic}
                  alt="user"
                  sx={{ width:50, height:50 }}
                  style={{ cursor: "pointer" }} 
                  onClick={avatarModal}
                />
              </Badge>
            </Grid>
            <Grid item style={{ marginLeft: 20 }}>
              <Grid
                container
                direction="column"
                style={{ height: "100%" }}
                justifyContent="space-around"
              >
                <Grid item>
                  <Typography style={{ color: "white" , fontSize:18 }} >
                    {userData.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography style={{ color: "gray", fontSize:14 }}>Online</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 100,
              background: "#000",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={handleClick}
          >
            <MoreHoriz style={{ color: "#fff" }} fontSize="medium" />
          </div>
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
            <MenuItem onClick={handleClose}>
            <DeleteForever sx={{mr:2}} />
            Delete chat
            </MenuItem>
            <MenuItem onClick={handleClose}>
            <Clear sx={{mr:2}} />
            Clear history
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    
              </Container>
  );
}

export default Index;
