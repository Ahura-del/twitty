import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import ReactInputVerificationCode from "react-verification-code-input";
import React, { useState } from "react";
import { Box } from "@mui/system";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { updateState } from "../../Redux";
import { useDispatch } from "react-redux";

function ForgertPass() {
  const dispatch = useDispatch()
  //-------------history--------------
  const history = useHistory();
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
        `${window.api}/user/fPass/${location.state.id}`,
        data
      );
      if (resetPass.status === 200) {
        localStorage.setItem("userId", resetPass.data.id);
        localStorage.setItem("token", resetPass.data.token);
        dispatch(updateState())
        history.push("/");
      }
    } else {
      setFpassError({ code: { color: "red", text: "Code is wrong" } });
      setTimeout(() => {
        setFpassError({ code: { color: "", text: "" } });
      }, 3000);
      return;
    }
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{
        height: "100vh",
        backgroundImage:
          "linear-gradient(to right, #000000, #1c000f, #260021, #270039, #090757)",
      }}
    >
      <Grid item>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              width: 350,
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "white",
              p: 3,
              borderRadius: 5,
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
              size="small"
              variant="standard"
              id="newPass"
              label="New Password"
              name="newPass"
              type="password"
              autoComplete="off"
              autoFocus
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              error={fpassError.new?.color === "error" ? true : false}
              helperText={
                fpassError.new?.color === "error" ? fpassError.new.text : null
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              size="small"
              variant="standard"
              name="re-newPass"
              label="re-NewPassword"
              type="password"
              id="re-newPass"
              autoComplete="off"
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
            <ReactInputVerificationCode
              fields={4}
              onComplete={(e) => complete(e)}
              type="number"
              autoFocus={true}
              fieldWidth={60}
              fieldHeight={60}
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

export default ForgertPass;
