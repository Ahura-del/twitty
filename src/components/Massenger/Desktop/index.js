import {
  Avatar,
  Container,
  Drawer,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./desktop.css";
import pic from "../../../assets/img2.png";
import ChatBox from './ChatBox'
import {
  Menu,
  Search,
  VpnKey,
  DeleteForever,
  Notifications,
  Logout,
  Add,
} from "@mui/icons-material";
import CustomListItem from "./ContactItem";

import useWidthDimensions from "../../../Hook/useWidthDimensions";
import { Box } from "@mui/system";
import AccModal from "./Modal";
import { useDispatch} from "react-redux";
import { modalState } from "../../../Redux";
function Index() {

  //-----------redux---------------
  
  const dispatch = useDispatch();

  //--------check notification-------------
  const [notification, setNotification] = useState(false);

  //---------fab style and setting-----------

  const fabStyle = {
    large: {
      right: 50,
      position: "absolute",
      bottom: 50,
      background: "#FF6B00",
      zIndex: 10,
    },
    small: {
      right: "50%",
      transform: `translateX(50%) `,
      position: "absolute",
      bottom: 50,
      background: "#FF6B00",
    },
  };

  const fabModal = () => {    
    dispatch(modalState(true , "fab"));
  };
  
  //-------------WidthDimensions------------

  const { width } = useWidthDimensions();
  const [xs, setXs] = useState({ small: 3, big: 9 });
  useEffect(() => {
    if (width <= 1300 && width >= 700) {
      setXs({ small: 1, big: 11 });
    } else {
      setXs({ small: 3, big: 9 });
    }
  }, [width]);


 //---------search input visible------------
 const [searchVisible , setSearchVisible] = useState(false)
 const searchInputStyle = {
   show:{
     visibility:"visible",
     width: "100%"
   },
   hide:{
     visibility:"hidden",
     width:0
   }
 }


  //-------------Drawer---------------

  const [position, setPosition] = useState({ left: false });

  const toggleDrawer = (anchor, open, modal, modalLabel) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setPosition({ ...position, [anchor]: open });
    dispatch(modalState(modal , modalLabel));
  };

  //----------------list drawer-------------

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 330 }}
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
          <ListItemText primary="Account Profile" />
        </ListItem>

        <ListItem
          button
          key="ChangePassword"
          style={{ marginBottom: 30 }}
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
      <Drawer
        anchor={"left"}
        open={position["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
      <Grid
        container
        spacing={0}
        style={{ height: "100vh" }}
        justifyContent="center"
      >
        <Grid
          item
          xs={xs.small}
          style={{
            background: "#301C27",
            paddingTop: 30,
            position: "relative",
          }}
        >
          {xs.small === 3 ? (
            <Container
              maxWidth="sm"
              className="container-list"
              style={{ overflow: "hidden" }}
            >
              <Grid
                container
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
                className="trigger-area"
              >
                <Grid item>
                  <Menu
                    style={{ color: "white", cursor: "pointer" }}
                    fontSize="large"
                    onClick={toggleDrawer("left", true)}
                  />
                </Grid>
                <Grid item xs={6} >
                  <input type="text" name="searchInput" autoComplete="off" id="searchInput" style={searchVisible ? searchInputStyle.show : searchInputStyle.hide} placeholder="Search..." />
                </Grid>
                <Grid item className="search-area">
                  <Search
                    style={{ color: "white", cursor: "pointer" }}
                    fontSize="large"
                    onClick={()=>setSearchVisible(!searchVisible)}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Typography
                  className="recent-text"
                  component="p"
                  style={{
                    color: "white",
                    marginTop: 20,
                    marginBottom: 20,
                    fontWeight: "bold",
                    fontSize: 30,
                  }}
                >
                  Recent
                </Typography>
              </Grid>
              <Grid item>
                <List className="list-container" sx={{ width: "100%" }}>
                  {/* <Typography style={{color:"#ccc"}} fontSize={30} textAlign="center" >
                Empty Chat!
              </Typography> */}
                  <CustomListItem active={true} />
                  <CustomListItem active={true} />
                  <CustomListItem  active={false}/>
                  <CustomListItem  active={false}/>
                  
                </List>
              </Grid>
            </Container>
          ) : (
            <>
              <Grid
                container
                columnSpacing={{ xs: 10 }}
                justifyContent="center"
                alignItems="center"
                className="triger-area"
              >
                <Grid item>
                  <Menu
                    style={{
                      color: "white",
                      cursor: "pointer",
                      marginBottom: 20,
                    }}
                    fontSize="large"
                    onClick={toggleDrawer("left", true)}
                  />
                </Grid>

                <Grid item>
                  <List
                    // sx={{ width: "100%" }}

                    style={{ background: "transparent" }}
                  >
                    <CustomListItem active={false} />

                  </List>
                </Grid>
              </Grid>
            </>
          )}
          <Fab
            className="fab-btn"
            style={xs.small === 3 ? fabStyle.large : fabStyle.small}
            onClick={fabModal}
          >
            <Add style={{ color: "white" }} fontSize="large" />
          </Fab>
        </Grid>

        <Grid item xs={xs.big} style={{ background: "#392E34" }}>

                    <ChatBox />

        </Grid>
      </Grid>
    </>
  );
}

export default Index;
