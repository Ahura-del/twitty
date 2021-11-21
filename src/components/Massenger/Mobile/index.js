import { DeleteForever, Logout, Notifications, VpnKey } from '@mui/icons-material';
import {  Avatar, Grid, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, SwipeableDrawer, Switch } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { modalState } from '../../../Redux';
import pic from '../../../assets/img2.png'
import Header from './MobileHeader'
import AccModal from '../Desktop/Modal'
function Index() {

//---------redux-----------------
const dispatch = useDispatch()
//--------notification------------
const [notification, setNotification] = useState(false);


//-----------Drawer---------------
const [position, setPosition] = useState({ left: false });
const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
const toggleDrawer = (anchor, open, modal, modalLabel) => (event) => {
  if (
    event &&
    event.type === 'keydown' &&
    (event.key === "Tab" || event.key === "Shift")
  ) {
    return;
  }
  setPosition({ ...position, [anchor]: open });
  dispatch(modalState(modal , modalLabel));
}
    //------------Drawer List------------------

    const list = (anchor) => (
        <Box
          sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 200 }}
          role="presentation"
          onKeyDown={toggleDrawer(anchor, false)}
          style={{
            background: "#301C27",
            color: "white",
            height: "100%",
            display: "flex",
            flexWrap: "wrap",
            alignContent: "space-between",
            
          }}
        >
          <List style={{ width: "100%" }}>
            <ListItem
              button
              key="Profile"
              style={{ marginBottom: 30, marginTop: 30 }}
              onClick={toggleDrawer(anchor, false, true, "profile")}
            >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={pic} sx={{ width: 40, height: 40 }} />
              </ListItemAvatar>
              <ListItemText primary="Account Profile" className="listItem-text" />
            </ListItem>
    
            <ListItem
              button
              key="ChangePassword"
              style={{ marginBottom: 30 , fontSize:14 }}
              onClick={toggleDrawer(anchor, false, true, "restPass")}
            >
              <ListItemIcon>
                <VpnKey style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Change Password" />
            </ListItem>
    
            <ListItem
              button
              key="DeleteAccount"
              style={{ marginBottom: 30 }}
              onClick={toggleDrawer(anchor, false, true, "delAcc")}
            >
              <ListItemIcon>
                <DeleteForever style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Delete Account" />
            </ListItem>
    
            <ListItem key="Notification" style={{ marginBottom: 30 }}>
              <ListItemIcon>
                <Notifications style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Notification" />
              <Switch
                defaultChecked
                color="warning"
                value={notification}
                onChange={() => setNotification(!notification)}
              />
            </ListItem>
          </List>
          <List>
            <ListItem
              button
              key="Logout"
              style={{ marginBottom: 30 }}
              onClick={toggleDrawer(anchor, false, true, "logout")}
            >
              <ListItemIcon>
                <Logout style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      );

       

    return (
        <>
       <AccModal />
        <SwipeableDrawer
        anchor={"left"}
        open={position["left"]}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer('left' , true)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        {list("left")}
      </SwipeableDrawer>
        <Grid container direction="column" style={{height:"100vh" , overflow:"hidden"}}>
            <Grid item xs={2}  sx={{width:"100%" , background:"#2F3135"}}>
                <Header drawer={toggleDrawer} />
            </Grid>
            <Grid item xs={10} sx={{overflowY:"auto"}}>
                <p>contact list</p>
            </Grid>
      
        </Grid>
        </>
    )
}

export default Index
