import {
  Add,
  DeleteForever,
  Logout,
  Notifications,
  VpnKey,
} from "@mui/icons-material";
import {
  Avatar,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Switch,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalHandler } from "../../../Redux";
import ContactList from "./MobleContactList/MobleContactList";
import Header from "./MobileHeader/MobileHeader";
import AccModal from "../Desktop/Modal/ModalComponent";
function Mobile() {

  //---------redux-----------------
  const dispatch = useDispatch();
  const conversation =  useSelector(state => state.conversationState.conversation)
  const user =  useSelector(state=> state.userState.user)


const [loading, setLoading] = useState(false);
  const [chatListState, setChatListState] = useState("");

useEffect(() => {
  setTimeout(() => {
    setLoading(true);
  }, 1000);
  if (conversation.length === 0) {
    setChatListState("empty");
  } else {
    setChatListState("");
  }
}, [conversation]);


  //--------notification------------
  const [notification, setNotification] = useState(false);

  //-----------Drawer---------------
  const [position, setPosition] = useState({ left: false });
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const toggleDrawer = (anchor, open, modal, modalLabel) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setPosition({ ...position, [anchor]: open });
    dispatch(modalHandler({state:modal, label:modalLabel}));
  };
  //------------Drawer List------------------

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 230 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
      style={{
        background: "#2F3135",
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
            <Avatar alt="user avatar" src={user.pic ? user.pic : ''} sx={{ width: 40, height: 40 }} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography sx={{ fontSize: 13 }}>Account Profile</Typography>
            }
          />
        </ListItem>

        <ListItem
          button
          key="ChangePassword"
          style={{ marginBottom: 30, fontSize: 14 }}
          onClick={toggleDrawer(anchor, false, true, "restPass")}
        >
          <ListItemIcon>
            <VpnKey style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography sx={{ fontSize: 13 }}>Change Password</Typography>
            }
          />
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
          <ListItemText
            primary={
              <Typography sx={{ fontSize: 13 }}>Delete Account</Typography>
            }
          />
        </ListItem>

        <ListItem key="Notification" style={{ marginBottom: 30 }}>
          <ListItemIcon>
            <Notifications style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography sx={{ fontSize: 13 }}>Notification</Typography>
            }
          />
          <Switch
            defaultChecked
            size="small"
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
          <ListItemText
            primary={<Typography sx={{ fontSize: 14 }}>Logout</Typography>}
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AccModal size="mobile" />
      <SwipeableDrawer
        anchor={"left"}
        open={position["left"]}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        {list("left")}
      </SwipeableDrawer>
      <Grid
        container
        direction="column"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <Grid item xs={1} sx={{ width: "100%", bgcolor: "#2F3135" }}>
          <Header drawer={toggleDrawer} />
        </Grid>
        <Grid
          item
          xs={11}
          sx={{ overflowY: "auto", background: "#363A3F", width: "100%" }}
        >
        {chatListState === 'empty' ? (
          <Typography
                      style={{ color: "#ccc", marginTop: 20 }}
                      fontSize={28}
                      textAlign="center"
                    >
                      Empty Chat!
                    </Typography>
        ):(
          <>
          {conversation.map((c , idx)=>(
          <ContactList key={idx} data={c} active={loading} />
          ))}
          </>
        )}
          
        </Grid>
        <Fab
          className="fab-btn"
          style={{
            right: 30,
            position: "absolute",
            bottom: 10,
            background: "#FF6B00",
            zIndex: 10,
          }}
          onClick={() => dispatch(modalHandler({state:true , label:"fab"}))}
        >
          <Add style={{ color: "white" }} fontSize="large" />
        </Fab>
      </Grid>
    </>
  );
}

export default Mobile;
