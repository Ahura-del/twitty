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
import React, { useState } from "react";
import personPic from "../../../../assets/person.png";
import Pic1 from "../../../../assets/img2.png";
import avatarPic from '../../../../assets/userAvatar.png'
import { useDispatch, useSelector } from "react-redux";
import { modalState } from "../../../../Redux";
import UserItem from './SearchUserItem'


function Index(props) {
  //----------model style------------
  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: props.size === "desktop" ? 600 : 320 ,
    bgcolor: "#fff",
    border: "none",
    color: "white",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
  };


  //------------redux----------------
  const dispatch = useDispatch();
  const modalStateSelect = useSelector((state) => state.modalState.state);
  const modalLabel = useSelector(state => state.modalState.label)


  //------------search mobile------------
  const [searchMob , setSearchMob] = useState('')



  // fab functionality
  const [fabUser, setFabUser] = useState("");

  //profile account save btn

  //choose image
  const [pic, setPic] = useState("");
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
  //close and open modal function
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    dispatch(modalState(false));
  };
  React.useEffect(() => {
    if (modalStateSelect) setOpen(true);
  }, [modalStateSelect]);

  //modal types

  const modalType = () => {
    if (modalLabel === "profile") {
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
                value="Ahuradel@gmail.com"
                autoFocus
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
              >
                Save
              </Button>
            </Grid>
          </Container>
        </Grid>
      );
    }
    if (modalLabel === "restPass") {
      return (
        <Grid container>
          <Container>
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
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                fullWidth
                color="warning"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
            </Grid>
          </Container>
        </Grid>
      );
    }
    if (modalLabel === "delAcc") {
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
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 3, mb: 2 }}
                fullWidth
              >
                Delete Account
              </Button>
            </Grid>
          </Container>
        </Grid>
      );
    }
    if (modalLabel === "logout") {
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
    if (modalLabel === "fab") {
      return (
        <Grid container>
          <Container>
            <Grid item>
              <TextField
                margin="normal"
                fullWidth
                placeholder="Username"
                autoFocus
                onChange={(e) => setFabUser(e.target.value)}
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
                  <UserItem pic={Pic1} name="Ahura" bio="Hello world! I'm Ahura" />
                  <UserItem pic={Pic1} name="Ahura" bio="Hello world! I'm Ahura" />

                  <UserItem pic={Pic1} name="Ahura" bio="Hello world! I'm Ahura" />

                  <UserItem pic={Pic1} name="Ahura" bio="Hello world! I'm Ahura" />

                
                </List>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      );
    }
    if(modalLabel === "avatar"){
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
              src={avatarPic}
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
              value="Ahura"
          
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
    if(modalLabel === "mobileSearch"){
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
