import {
  Container,
  Grid,
  Modal,
  TextField,
  TextareaAutosize,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import personPic from "../../../../assets/person.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#fff",
  border: "2px solid #000",
  color: "white",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

function Index(props) {
  //choose image
  const [pic, setPic] = useState("");
  const choseImage = () => {
    document.querySelector("#newPic").click();
  };
  const changeInput = (e) => {
    console.log(e.target.files);
  };
  //close modal function
  const handleClose = () => props.hide();

  //modal types
  const modalType = () => {
    if (props.label === "profile") {
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
                sx={{ width: 100, height: 100 }}
                onClick={choseImage}
              />
            </Grid>
            <Grid item>
              <TextField
                margin="normal"
                fullWidth
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
                fullWidth
                variant="outlined"
                id="usernameAcc"
                label="User name"
                name="usernameAcc"
                autoFocus
              />
            </Grid>
            <Grid item>
              <Typography style={{ color: "#000", marginTop: 10 }}>
                Bio
              </Typography>
              <TextareaAutosize
                minRows={9}
                style={{
                  width: "100%",
                  resize: "none",
                  marginTop: 10,
                  padding: 10,
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
    if (props.label === "restPass") {
      return (
        <Grid container>
          <Container>
            <Grid item>
              <TextField
                margin="normal"
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
    if (props.label === "delAcc") {
      return (
        <Grid container>
          <Container>
            <Grid item>
              <Typography style={{ color: "#000", textAlign: "center" }}>
                Please enter your account password
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                margin="normal"
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
    if (props.label === "logout") {
      return (
        <Grid container>
          <Container>
            <Grid item style={{ textAlign: "center" }}>
              <Typography style={{ color: "#000" }}>
                Are you sure logout ?
              </Typography>
            </Grid>
            <Grid container columnSpacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  fullWidth
                  color="error"
                  sx={{ mt: 3, mb: 2 }}
                >
                  No
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  fullWidth
                  color="success"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Yes
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      );
    }
  };

  return (
    <div>
      <Modal open={props.open} onClose={handleClose}>
        <Box sx={style}>{modalType()}</Box>
      </Modal>
    </div>
  );
}

export default Index;
