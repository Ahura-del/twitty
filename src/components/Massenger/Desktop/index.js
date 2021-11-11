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
import useWidthDimensions from "../../../custom/useWidthDimensions";
import { Box } from "@mui/system";
import AccModal from './Modal'



function Index() {
    //modal
    const [showModal , setShowModal] = useState(false)
    const [modalLabel , setModalLabel] = useState('')
    const modalClose = ()=> setShowModal(false)
    //
  const { width } = useWidthDimensions();
  const [xs, setXs] = useState({ small: 3, big: 9 });
  useEffect(() => {
    if (width < 1300 && width > 600) {
      setXs({ small: 1, big: 11 });
    } else {
      setXs({ small: 3, big: 9 });
    }
  }, [width]);

  const [position, setPosition] = useState({ left: false });

  const toggleDrawer = (anchor, open , modal , modalLabel) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setPosition({ ...position, [anchor]: open });
    setShowModal(modal)
    setModalLabel(modalLabel)
  };

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
          onClick={toggleDrawer(anchor, false , true , 'profile')}
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
          onClick={toggleDrawer(anchor, false,true , 'restPass')}
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
          onClick={toggleDrawer(anchor, false ,true , 'delAcc')}
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
          <Switch defaultChecked color="warning" />
        </ListItem>
      </List>
      <List>
        <ListItem
          button
          key="Logout"
          style={{ marginBottom: 30 }}
          onClick={toggleDrawer(anchor, false , true , "logout")}
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
    <AccModal open={showModal} label={modalLabel} hide={modalClose} />
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
            <Container maxWidth="sm" className="container-list">
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

              <List
                sx={{ width: "100%" }}
                style={{ background: "transparent" }}
              >
                <CustomListItem />
              </List>
            </Container>
          ) : (
            <>
              <Grid
                container
                columnSpacing={{ xs: 10 }}
                justifyContent="center"
                className="triger-area"
              >
                <Grid item>
                  <Menu
                    style={{ color: "white", cursor: "pointer" }}
                    fontSize="large"
                    onClick={toggleDrawer("left", true)}
                  />
                </Grid>
                <Grid item className="search-area">
                  <Search style={{ color: "white" }} fontSize="large" />
                </Grid>
              </Grid>
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

              <List
                sx={{ width: "100%" }}
                style={{ background: "transparent" }}
              >
                <CustomListItem />
              </List>
            </>
          )}
          <Fab
            aria-label="add"
            style={{
              position: "absolute",
              bottom: 50,
              right: 50,
              background: "#FF6B00",
            }}
          >
            <Add style={{ color: "white" }} fontSize="large" />
          </Fab>
        </Grid>
        <Grid item xs={xs.big} style={{background:"#392E34"}}></Grid>
      </Grid>
    </>
  );
}

export default Index;
