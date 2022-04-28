/* eslint-disable */
import {
  Avatar,
  Button,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import "./desktop.css";
// import pic from "../../../assets/userAvatar.png";
import ChatBox from "./ChatBox/ChatBox";
import ChatList from "./ContactUsers/ContactUsers";
import {
  VpnKey,
  DeleteForever,
  Notifications,
  Logout,
} from "@mui/icons-material";
import useWidthDimensions from "../../../Hook/useWidthDimensions";
import { Box } from "@mui/system";
import AccModal from "./Modal/ModalComponent";
import { useDispatch , useSelector } from "react-redux";
import {  modalHandler } from "../../../Redux";
import API from "../../config/API";
function Desktop() {
  //-----------redux---------------

  const dispatch = useDispatch();
  const user =  useSelector(state=> state.userState.user)
  const conversation =  useSelector(state => state.conversationState.conversation)

  // const conv =  useSelector(state => state.socketState.conversation)
  
  //--------check notification-------------

 const [notification , setNotification] = useState()
 const [showNotification , setShowNotification]=useState(false)

 const convertedVapidKey = urlBase64ToUint8Array(process.env.REACT_APP_PUBLIC_VAPID_KEY)

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4)
  // eslint-disable-next-line
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
 const sendSubscription = useCallback((subscription)=>{
  return fetch('/subscription', {
    method: 'POST',
    body: JSON.stringify({
      subscription:subscription,
      body:{id:user._id}
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
},[user._id])
const subscribeUser = ()=>{
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function(registration) {
      if (!registration.pushManager) {
        console.log('Push manager unavailable.')
        return
      }

      registration.pushManager.getSubscription().then(function(existedSubscription) {
        if (existedSubscription === null) {
          console.log('No subscription detected, make a request.')
          registration.pushManager.subscribe({
            applicationServerKey: convertedVapidKey,
            userVisibleOnly: true,
          }).then(function(newSubscription) {

            sendSubscription(newSubscription)
          }).catch(function(e) {
            if (Notification.permission !== 'granted') {
              console.log('Permission was not granted.')
            } else {
              console.error('An error ocurred during the subscription process.', e)
            }
          })
        } else {
          sendSubscription(existedSubscription)
        }
      })
    })
      .catch(function(e) {
        console.error('An error ocurred during Service Worker registration.', e)
      })
  }
}
  const handleNotification = ()=>{
    if('serviceWorker' in navigator && 'Notification' in window){
      // setNotification(true)
      Notification.requestPermission(result =>{
          console.log('user chois' , result)
        if(result === 'granted'){
            setNotification(true)
            subscribeUser()
          }else{
            setNotification(false)
          }
        })

            // if('serviceWorker' in navigator){
            //   const option ={
            //     body:"hi fayegh",
            //     icon:'../../../../public/img/icon_x96.png',
            //     dir:'ltr',
            //     vibrate:[100 , 50 , 200],
            //     badge:'../../../../public/img/icon_x96.png'
            //   }
            //   navigator.serviceWorker.ready
            //   .then(swReg=>{
            //     swReg.showNotification('Twitty' , option)
            //   })
            // }

            
          // }
        // })
    }else{
      // setNotification(false)
      alert('your browser dose not suppodrt PWA')
    }
  }
 
useEffect(()=>{
  const noti = Notification.permission
  if(noti === "granted"){
    setShowNotification(true)
  }else{
    setShowNotification(false)
  }
},[notification])


useEffect(()=>{
  const notification = Notification.permission
  if(showNotification){

    if(notification === 'granted'){

      API({method:'get' , url:`${window.api}/subscription/${user._id}`})
      .then(result=>{
      if(result.status === 200){
        navigator.serviceWorker.ready.then(registration=>{
          registration.pushManager.getSubscription().then(res=>{
            if(result.data.subscription?.endpoint !== res?.endpoint){
              registration.pushManager.subscribe({
                applicationServerKey: convertedVapidKey,
                userVisibleOnly: true,
              }).then(function(newSubscription) {

                sendSubscription(newSubscription)
              })

            }else{
              return
            }
          })
        })
      }else{
        return
      }
      
    })
    .catch(err=> console.log(err))
  }
}
},[notification,convertedVapidKey,sendSubscription,showNotification,user._id])

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
    dispatch(modalHandler({state:modal , label:modalLabel}));
  };

  //----------------list drawer-------------

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 280 }}
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
          style={{ marginBottom: 20, marginTop: 20 }}
          onClick={toggleDrawer(anchor, false, true, "profile")}
        >
          <ListItemAvatar>
            <Avatar alt="account" src={user.pic?.length> 0 && user.pic } sx={{ width: 40, height: 40 }} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography sx={{ fontSize: 14 }}>Account Profile</Typography>
            }
          />
        </ListItem>

        <ListItem
          button
          key="ChangePassword"
          style={{ marginBottom: 20 }}
          onClick={toggleDrawer(anchor, false, true, "restPass")}
        >
          <ListItemIcon>
            <VpnKey style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography sx={{ fontSize: 14 }}>Change Password</Typography>
            }
          />
        </ListItem>

        <ListItem
          button
          key="DeleteAccount"
          style={{ marginBottom: 20 }}
          onClick={toggleDrawer(anchor, false, true, "delAcc")}
        >
          <ListItemIcon>
            <DeleteForever style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography sx={{ fontSize: 14 }}>Delete Account</Typography>
            }
          />
        </ListItem>

{!showNotification ? (
  <ListItem key="Notification"  style={{ marginBottom: 20 , display:'flex' , justifyContent:"center" }}>
    <Button variant="outlined" color="warning" onClick={handleNotification}>

          <ListItemIcon>
            <Notifications color="warning" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography sx={{ fontSize: 14 }}>Notification</Typography>
            }
            />
          {/* <Switch
          // defaultChecked = {false}
          disabled = {notification ? true : false}
          color="warning"
          value= {notification}
          onChange={handleNotification}
        /> */}
        </Button>
        </ListItem>
):null}
   


      </List>

      <List>
        <ListItem
          button
          key="Logout"
          style={{ marginBottom: 20 }}
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
        style={{ height: "100vh", overflow: "hidden" }}
        justifyContent="center"
      >
        <Grid
          item
          xs={xs.small}
          style={{
            background: "#222",
            paddingTop: 10,
            position: "relative",
          }}
        >
          <ChatList
            drawerHandle={(anchor, open) => toggleDrawer(anchor, open)}
            chatList={conversation}
          />
        </Grid>

        <Grid item xs={xs.big} style={{ background: "#1c1c1c",paddingTop: 10 }}>
          <ChatBox />
        </Grid>
      </Grid>
    </>
  );
}

export default Desktop;
