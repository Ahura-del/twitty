import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import ReactInputVerificationCode from "react-verification-code-input";
<<<<<<< HEAD
import React, { useState } from "react";
import { Box } from "@mui/system";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
=======
import React from "react";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c

function Index() {
  //-------------history--------------
  const history = useHistory();
<<<<<<< HEAD
  const location = useLocation();
  const [fpassError, setFpassError] = useState({
    new: { color: "", text: "" },
    reNew: { color: "", text: "" },
    code: { color: "", text: "" },
  });
  const [newPass, setNewPass] = useState("");
  const [rePass, setRePass] = useState("");
  const complete = async (e) => {
    if (newPass === "") {
      setFpassError({
        new: { color: "error", text: "Please set a new password" },
      });
      setTimeout(() => {
        setFpassError({ new: { color: "", text: "" } });
      }, 3000);
      return;
    }
    if (rePass === "") {
      setFpassError({
        reNew: { color: "error", text: "Please set re-password" },
      });
      setTimeout(() => {
        setFpassError({ reNew: { color: "", text: "" } });
      }, 3000);
      return;
    }
    if (newPass !== rePass) {
      setFpassError({
        new: {
          color: "error",
          text: "The new password and re-password must match",
        },
        reNew: {
          color: "error",
          text: "The new password and re-password must match",
        },
      });
      setTimeout(() => {
        setFpassError({
          new: { color: "", text: "" },
          reNew: { color: "", text: "" },
        });
      }, 3000);
      return;
    }
    const data = {
      password: newPass,
    };
    if (parseInt(e) === location.state.code) {
      const resetPass = await axios.put(
        `/user/fPass/${location.state.id}`,
        data
      );
      if (resetPass.status === 200) {
        localStorage.setItem("userId", resetPass.data.id);
        localStorage.setItem("token", resetPass.data.token);
        history.push("/massenger");
      }
    } else {
      setFpassError({ code: { color: "red", text: "Code is wrong" } });
      setTimeout(() => {
        setFpassError({ code: { color: "", text: "" } });
      }, 3000);
      return;
=======

  const complete = (e) => {
    if (e === "3256") {
      alert("true");
    } else {
      alert("false");
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
    }
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
<<<<<<< HEAD
      style={{
        height: "100vh",
        backgroundImage:
          "linear-gradient(to right, #000000, #1c000f, #260021, #270039, #090757)",
      }}
=======
      style={{ height: "100vh" }}
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
    >
      <Grid item>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
<<<<<<< HEAD
              width: 350,
=======
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
<<<<<<< HEAD
              bgcolor: "white",
              p: 3,
              borderRadius: 5,
=======
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
            }}
          >
            {/* <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              > */}
            <TextField
              margin="normal"
              required
              fullWidth
<<<<<<< HEAD
              size="small"
=======
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
              variant="standard"
              id="newPass"
              label="New Password"
              name="newPass"
              type="password"
              autoComplete="off"
              autoFocus
<<<<<<< HEAD
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              error={fpassError.new?.color === "error" ? true : false}
              helperText={
                fpassError.new?.color === "error" ? fpassError.new.text : null
              }
=======
              onChange={(e) => console.log(e.target.value)}
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
            />
            <TextField
              margin="normal"
              required
              fullWidth
<<<<<<< HEAD
              size="small"
=======
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
              variant="standard"
              name="re-newPass"
              label="re-NewPassword"
              type="password"
              id="re-newPass"
              autoComplete="off"
<<<<<<< HEAD
              style={{ marginBottom: "20px" }}
              value={rePass}
              onChange={(e) => setRePass(e.target.value)}
              error={fpassError.reNew?.color === "error" ? true : false}
              helperText={
                fpassError.reNew?.color === "error"
                  ? fpassError.reNew.text
                  : null
              }
            />
            <Typography sx={{ pb: 2 }}>Please check your email</Typography>
            <small style={{ color: "red" }}>{fpassError.code?.text}</small>
=======
              style={{ marginBottom: "100px" }}
            />
            <Typography sx={{ pb: 2 }}>Please check your email</Typography>
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
            <ReactInputVerificationCode
              fields={4}
              onComplete={(e) => complete(e)}
              type="number"
              autoFocus={true}
<<<<<<< HEAD
              fieldWidth={60}
              fieldHeight={60}
=======
              fieldWidth={70}
              fieldHeight={70}
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
            />
            <Button
              color="warning"
              variant="contained"
              style={{ marginTop: "30px" }}
              onClick={() => history.goBack()}
            >
              Back
            </Button>
          </Box>
          {/* </Box> */}
        </Container>
      </Grid>
    </Grid>
  );
}

export default Index;
