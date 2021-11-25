import {
  Avatar,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import "./desktop.css";
import pic from "../../../assets/img2.png";
import ChatBox from "./ChatBox";
import ChatList from "./ContactUsers";
import {
  VpnKey,
  DeleteForever,
  Notifications,
  Logout,
} from "@mui/icons-material";
import useWidthDimensions from "../../../Hook/useWidthDimensions";
import { Box } from "@mui/system";
import AccModal from "./Modal";
import { useDispatch } from "react-redux";
import { modalState } from "../../../Redux";
function Index() {
  //-----------redux---------------

  const dispatch = useDispatch();

  //--------check notification-------------
  const [notification, setNotification] = useState(false);

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
    dispatch(modalState(modal, modalLabel));
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
      <AccModal size="desktop" />
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
        style={{ height: "100vh" , overflow:"hidden" }}
        justifyContent="center"
      >
        <Grid
          item
          xs={xs.small}
          style={{
            background: "#222",
            paddingTop: 30,
            position: "relative",
          }}
        >
          <ChatList
            drawerHandle={(anchor, open) => toggleDrawer(anchor, open)}
          />
        </Grid>

        <Grid item xs={xs.big} style={{ background: "#1c1c1c" }}>
          <ChatBox />
        </Grid>
      </Grid>
    </>
  );
}

export default Index;
