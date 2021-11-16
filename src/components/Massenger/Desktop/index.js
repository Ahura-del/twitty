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

function Index() {

  //check notification 
  const [notification , setNotification] = useState(false)

  //fab style and setting
  const fabStyle = {
    large: {
      right: 50,
      position: "absolute",
      bottom: 50,
      background: "#FF6B00",
      zIndex:10
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
      setOpen(true)
      setModalLabel("fab")
      if(open){
        setOpen(false)
      }
  }

  //modal

  const [open, setOpen] = useState(false);
  const [modalLabel, setModalLabel] = useState("");

  //WidthDimensions

  const { width } = useWidthDimensions();
  const [xs, setXs] = useState({ small: 3, big: 9 });
  useEffect(() => {
    if (width < 1300 && width > 600) {
      setXs({ small: 1, big: 11 });
    } else {
      setXs({ small: 3, big: 9 });
    }
  }, [width]);

  //Drawer

  const [position, setPosition] = useState({ left: false });

  const toggleDrawer = (anchor, open, modal, modalLabel) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setPosition({ ...position, [anchor]: open });
    setOpen(modal);
    setModalLabel(modalLabel);
  };

  //list drawer
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

        <ListItem
          key="Notification"
          style={{ marginBottom: 30 }}
        >
          <ListItemIcon>
            <Notifications style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Notification" />
          <Switch defaultChecked color="warning"  value={notification} onChange={()=> setNotification(!notification)}  />
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
      <AccModal label={modalLabel} state={open} />
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
            <Container maxWidth="sm" className="container-list" style={{overflow:"hidden"}}>
              <Grid
                container
                columnSpacing={{ xs: 10 }}
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
                <Grid item className="search-area">
                  <Search
                    style={{ color: "white", cursor: "pointer" }}
                    fontSize="large"
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
                  <Grid item >

              <List
                className="list-container"
                sx={{ width: "100%" }}
                
              >
              {/* <Typography style={{color:"#ccc"}} fontSize={30} textAlign="center" >
                Empty Chat!
              </Typography> */}
                <CustomListItem />
                <CustomListItem />
                <CustomListItem />
                <CustomListItem />
                
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
                    <CustomListItem />
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
        <Grid item xs={xs.big} style={{ background: "#392E34" }}></Grid>
      </Grid>
    </>
  );
}

export default Index;
