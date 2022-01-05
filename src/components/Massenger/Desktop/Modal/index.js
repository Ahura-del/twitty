import {
  Container,
  Grid,
  Modal,
  TextField,
  TextareaAutosize,
  Typography,
  Avatar,
  Button,
  List,
 
} from "@mui/material";
import { Box } from "@mui/system";
import React, {  useEffect, useState } from "react";
import personPic from "../../../../assets/person.png";
import avatarPic from '../../../../assets/userAvatar.png'
import {useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { modalHandler, sendReciverUser, updateState } from "../../../../Redux";
import UserItem from './SearchUserItem'
import axios from 'axios'
// import {  reciverId } from "../../../../Redux/messagesSlice";

function Index(props) {
  //----------model style------------
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: props.size === "desktop" ? 500 : '90%' ,
    bgcolor: "#fff",
    border: "none",
    color: "white",
    borderRadius: 5,
    boxShadow: 24,
    p: props.size === "desktop" ? 4 : 2 ,
  };


  //------------redux----------------
  const history = useHistory()
  const dispatch = useDispatch();
  const {state , label , reciveUserId} = useSelector((state) => state.modalState);
  const user =  useSelector(state => state.userState.user)
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')


  //close and open modal function
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    dispatch(modalHandler(false));
  };
  React.useEffect(() => {
    if (state) setOpen(true);
  }, [state]);


  //------------search mobile------------
  const [searchMob , setSearchMob] = useState('')


  
  
  //profile account
  const [profileError , setProfileError] = useState({color:'' , text:''})
  const [accName , setAccName] = useState(`${user.name}`)
  const [accBio , setAccBio] = useState(`${user.bio}`)
  //choose image
  const [pic, setPic] = useState(`${user.pic}`);
  const choseImage = () => {
    document.querySelector("#newPic").click();
  };
  const changeInput = (e) => {
    const reader = new FileReader();
    const f = e.target.files[0];
    reader.readAsDataURL(f);
    reader.onload = (e) => {
      setPic(e.target.result);
    };
  };
  //profile account save btn
  const updateProfile = async (e)=>{
    e.preventDefault()
    if(accName === ""){
      setProfileError({color:"error" , text:"Please set a username"})
      return
    }
    try {
      const data = {
        "name":accName,
        "bio":accBio,
        "pic":pic
      }
      const sendData = await axios.put(`/user/${user._id}` , data , {headers:{'authorization': `Bearer ${token}`}})
      if(sendData.status === 200){
        setOpen(false);
        dispatch(modalHandler(false));
        dispatch(updateState())
      }
      
    } catch (error) {
      console.log(error.response)
    }
  }
  
  
  //change password
  const [passwordError , setPasswordError] = useState({old:{color:"" , text:""} , new:{color:"" , text:""} , reNew:{color:"",text:""}})
  const [oldPass , setOldPass] = useState('')
  const [newPass , setNewPass] = useState('')
  const [reNewPass , setReNewPass] = useState('')
  const changePassword = async ()=>{
    if(oldPass === ""){
      setPasswordError({old:{color:"error" , text:"Please set old password"}})
      setTimeout(()=>{
        setPasswordError({old:{color:"" , text:""}})
      },3000)
      return
    }
    if(newPass === ""){
      setPasswordError({new:{color:"error" , text:"Please set new password"}})
      setTimeout(()=>{
        setPasswordError({new:{color:"" , text:""}})
      },3000)
      return
    }
    if(newPass.length < 6){
      setPasswordError({new:{color:"error" , text:"The new password must be over 6 character"}})
      setTimeout(()=>{
        setPasswordError({new:{color:"" , text:""}})
      },3000)
      return
    }
    if(reNewPass === ""){
      setPasswordError({reNew:{color:"error" , text:"Please set re-password"}})
      setTimeout(()=>{
        setPasswordError({reNew:{color:"" , text:""}})
      },3000)
      return
    }
    if(newPass !== reNewPass){
      setPasswordError({reNew:{color:"error" , text:"New password and re-password not match"} , new:{color:"error" , text:"New password and re-password not match"}, old:{color:"" , text:""} })
      setTimeout(()=>{
        setPasswordError({reNew:{color:"" , text:""} , new:{color:"" , text:""}})
      },3000)
      return
    }
    
    try {
      const data = {
        oldPass,
        newPass
      }
      const updatePass = await axios.put(`/user/newPass/${user._id}` , data ,{headers:{'authorization': `Bearer ${token}`}})
      if(updatePass.status === 200){
        setOldPass('')
        setNewPass('')
        setReNewPass('')
        setOpen(false);
       dispatch(modalHandler(false));
       alert('update password')
      }
    } catch (error) {
      if(error.response.status === 400){
        setPasswordError({old:{color:"error" , text:error.response.data.message}})
        setTimeout(()=>{
          setPasswordError({old:{color:"" , text:""}})
        },3000)
        return
      }
    }
  }
  

  
  //delete account
  const [delAccError , setDelAccError] = useState({color:"" , text:""})
  const [delPass , setDelPass] = useState('')
  const deleteAccount = async ()=>{
    if(delPass === ""){
      setDelAccError({color:"error" , text:"Please enter you'r account password"})
      setTimeout(()=>{
        setDelAccError({color:"" , text:""})
      },3000)
      return
    }
    try {
      // const data = {delPass}
      const delAcc = await axios.delete(`/user/${user._id}`,{headers:{'authorization': `Bearer ${token}`} , data:{delPass}})
      if(delAcc.status === 200){
        localStorage.clear()
        history.push('/')
        window.location.reload()
      }
    } catch (error) {
      console.log(error.response)
      if(error.response.status === 400){
        setDelAccError({color:"error" , text:error.response.data.message})
        setTimeout(()=>{
          setDelAccError({color:"" , text:""})
        },3000)
        return
      }
    }
  }
  
  
  //logout btn
  const logoutBtn = ()=>{
    localStorage.clear()
    history.push('/')
    window.location.reload()
  }
  
  // fab functionality
  const [fabUser, setFabUser] = useState("");
  const [fabSearchUser , setFabSearchUser] = useState([])

  const fabHandler =async (e)=>{
    setFabUser(e.target.value)
  
if(e.target.value !== ""){

  try {
    const res = await axios.get(`/user/searchUser/${e.target.value}` ,  {headers:{'authorization': `Bearer ${token}`}})
    if(res.status === 200){
      res.data.forEach(user =>{
        if(user._id !== userId ){
          setFabSearchUser(res.data)
        }
      })
    }
    
  } catch (error) {
    console.log(error.response)
  }
}
}

const selectUserItem = (e)=>{
    dispatch(sendReciverUser({userId:e.id}))
    setOpen(false);
    dispatch(modalHandler(false))

}


//avatar user data
const [userFriend , setUserFriend] = useState([])
const [userFriendName , setUserFriendName] = useState('')
const [userFriendBio , setUserFriendBio] = useState('')

  useEffect(()=>{
    if(reciveUserId){
      const getUser = async()=>{
        try {
          const res = await axios.get(`/user/allUsers/${reciveUserId}`,  {headers:{'authorization': `Bearer ${token}`}})
          if(res.status === 200){
            setUserFriend(res.data)
            setUserFriendName(res.data.name)
            setUserFriendBio(res.data.bio)
          }
        } catch (error) {
          console.log(error.response)
        }
      }
      getUser()
    }

  } , [reciveUserId , token])  

  

  //modal types
  
  const modalType = () => {
    if (label === "profile") {
      return (
        <Grid container>
          <Container>
            <Grid
              item
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 15,
              }}
            >
              <input
                type="file"
                name="newPic"
                id="newPic"
                hidden
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => changeInput(e)}
              />
              <Avatar
                alt="Profile"
                style={{ cursor: "pointer" }}
                src={pic.length > 0 ? pic : personPic}
                sx={props.size === "desktop" ? { width: 100, height: 100 } : { width: 60, height: 60 }}
                onClick={choseImage}
              />
            </Grid>
            <Grid item>
              <TextField
                margin="normal"
                fullWidth
                size={props.size === "desktop" ? null : "small"}
                variant="outlined"
                id="emailAcc"
                label="Email"
                disabled={true}
                name="emailAcc"
                value={user.email}
                
              />
            </Grid>
            <Grid item>
              <TextField
                margin="normal"
                size={props.size === "desktop" ? null : "small"}
                fullWidth
                variant="outlined"
                id="usernameAcc"
                label="User name"
                name="usernameAcc"
                value={accName}
                onChange={e => setAccName(e.target.value)}
                color={profileError.color === 'error' ? "error" : null}
                helperText={profileError.text !== "" ? profileError.text : null}
                autoFocus
              />
            </Grid>
            <Grid item>
              <Typography
                style={{ color: "#000", marginTop: 10 }}
                component={"div"}
                variant={"body2"}
              >
                Bio
              </Typography>
              <TextareaAutosize
              onChange={e => setAccBio(e.target.value)}
              value={accBio}
                minRows={props.size === "desktop" ? 6 : 2}
                style={{
                  width: "100%",
                  resize: "none",
                  marginTop: 10,
                  padding: 10,
                  fontSize: 20,
                  fontFamily: "roboto",
                  boxSizing: "border-box",
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "#555",
                  borderStyle: "solid",
                }}
              />
            </Grid>
            <Grid item>
              <Button
                color="warning"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={updateProfile}
              >
                Save
              </Button>
            </Grid>
          </Container>
        </Grid>
      );
    }
    if (label === "restPass") {
      return (
        <Grid container>
          <Container  >
            <Grid item>
              <TextField
                margin="normal"
                size={props.size === "desktop" ? null : "small"}
                required
                fullWidth
                variant="outlined"
                name="oldpassword"
                label="old-Password"
                type="password"
                id="oldpassword"
                autoComplete="off"
                value={oldPass}
                onChange={e => setOldPass(e.target.value)}
                error={passwordError.old?.color === 'error' ? true : false}
                helperText={passwordError.old?.color === "error" ? passwordError.old.text : null}
              />
            </Grid>
            <Grid item>
              <TextField
                margin="normal"
                size={props.size === "desktop" ? null : "small"}
                required
                fullWidth
                variant="outlined"
                name="newpassword"
                label="new-Password"
                type="password"
                id="newpassword"
                autoComplete="off"
                value={newPass}
                onChange={e => setNewPass(e.target.value)}
                error={passwordError.new?.color === 'error' ? true : false}
                helperText={passwordError.new?.color === "error" ? passwordError.new.text : null}
              />
            </Grid>
            <Grid item>
              <TextField
                margin="normal"
                size={props.size === "desktop" ? null : "small"}
                required
                fullWidth
                variant="outlined"
                name="reapetNewPassword"
                label="Reapet Password"
                type="password"
                id="reapetNewPassword"
                autoComplete="off"
                value={reNewPass}
                onChange={e => setReNewPass(e.target.value)}
                error={passwordError.reNew?.color === 'error' ? true : false}
                helperText={passwordError.reNew?.color === "error" ? passwordError.reNew.text : null}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                fullWidth
                color="warning"
                sx={{ mt: 3, mb: 2 }}
                onClick={changePassword}
              >
                Save
              </Button>
            </Grid>
          </Container>
        </Grid>
      );
    }
    if (label === "delAcc") {
      return (
        <Grid container>
          <Container>
            <Grid item>
              <Typography
                style={{ color: "#000", textAlign: "center" }}
                component={"span"}
                variant={"body2"}
              >
                Please enter your account password
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                margin="normal"
                size={props.size === "desktop" ? null : "small"}
                required
                fullWidth
                variant="outlined"
                name="delpassword"
                label="Password"
                type="password"
                id="delpassword"
                autoComplete="off"
                value={delPass}
                onChange={e => setDelPass(e.target.value)}
                error={delAccError?.color === 'error' ? true :false}
                helperText={delAccError?.color === "error" ? delAccError.text : null}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 3, mb: 2 }}
                fullWidth
                onClick={deleteAccount}
              >
                Delete Account
              </Button>
            </Grid>
          </Container>
        </Grid>
      );
    }
    if (label === "logout") {
      return (
        <Grid container>
          <Container>
            <Grid item style={{ textAlign: "center" }}>
              <Typography
                style={{ color: "#000" , fontSize:20 }}
                component={"span"}
                variant={"body2"}
              >
                Are you sure logout ?
              </Typography>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  fullWidth
                  color="error"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={logoutBtn}
                >
                  Log out
                </Button>
              </Grid>
              {/* <Grid item xs={6}>
                <Button
                  variant="contained"
                  fullWidth
                  color="inherit"
                  sx={{ mt: 3, mb: 2 , color:"black" }}
                >
                  Cancel
                </Button>
              </Grid> */}
            </Grid>
          </Container>
        </Grid>
      );
    }
    if (label === "fab") {
      return (
        <Grid container>
          <Container>
            <Grid item>
              <TextField
                margin="normal"
                fullWidth
                size={props.size === "desktop" ? null : "small"}
                placeholder="Username"
                autoFocus
                onChange={(e) => fabHandler(e)}
                value={fabUser}
                variant="outlined"
                name="searchUser"
                label="Search user"
                type="text"
                id="searchUser"
                autoComplete="off"
              />
            </Grid>
            <Grid item>
              <Grid container>
                <List sx={{ width: "100%" }}>
                  {fabSearchUser?.map(user =>
                  (
                  <UserItem 
                  pic={user?.pic === "" ? avatarPic : user.pic} 
                  key={user._id}
                  name={user?.name} 
                  id={user._id}
                  selectUser={selectUserItem}
                  bio={user?.bio} />
                  )
                  )}
                </List>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      );
    }
    if(label === "avatar"){
      return (
        <Grid container>
        <Container>
          <Grid
            item
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 15,
            }}
          >
            <Avatar
              alt='avatar'
              src={userFriend.pic === "" ? avatarPic : userFriend.pic}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid item>
            <TextField
              margin="normal"
              fullWidth
              variant="outlined"
              id="userProfile"
              label="User name"
              disabled={true}
              name="userProfile"
              value={userFriendName}
          
            />
          </Grid>
         
          <Grid item>
            <Typography
              style={{ color: "#000", marginTop: 10 }}
              component={"div"}
              variant={"body2"}
            >
              Bio
            </Typography>
            <TextareaAutosize
              value={userFriendBio}
              disabled={true}
              style={{
                width: "100%",
                resize: "none",
                marginTop: 10,
                padding: 10,
                fontSize: 20,
                fontFamily: "roboto",
                boxSizing: "border-box",
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#555",
                borderStyle: "solid",
              }}
            />
          </Grid>
         
        </Container>
      </Grid>
      );
    }
    if(label === "mobileSearch"){
      return(
        <Grid container sx={{overflow:"hidden"}}>
        <Container>
          <Grid item>
            <TextField
              margin="normal"
              fullWidth
              size="small"
              placeholder="Search"
              autoFocus
              onChange={(e) => setSearchMob(e.target.value)}
              value={searchMob}
              variant="outlined"
              name="search"
              label="Search"
              type="text"
              id="search"
              autoComplete="off"
            />
          </Grid>
         {searchMob.length > 0 ? (
            <Grid item>
            <Grid container sx={{height:200 , overflowY:"auto" }}>
            </Grid>
          </Grid>
          ):null}
        </Container>
      </Grid>
      )
    }
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>{modalType()}</Box>
      </Modal>
    </div>
  );
}

export default Index;
