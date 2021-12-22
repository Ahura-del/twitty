import { Clear, DeleteForever, MoreHoriz, Person } from "@mui/icons-material";
import { Avatar, Badge, Container, Grid, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Pic from "../../../../../assets/img2.png";
<<<<<<< HEAD
import { modalState } from "../../../../../Redux/modalSlice";
=======
import { modalState } from "../../../../../Redux";
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
function Index() {

  //-------redux---------------
  const dispatch = useDispatch()

  //------------modal----------------
  const avatarModal = ()=>{
<<<<<<< HEAD
    dispatch(modalState({state:true ,label:"avatar"}))
=======
    dispatch(modalState(true , "avatar"))
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
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
                  src={Pic}
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
                    Ahura
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
