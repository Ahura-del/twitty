import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import ReactInputVerificationCode from "react-verification-code-input";
import React from "react";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";

function Index() {
  //-------------history--------------
  const history = useHistory();

  const complete = (e) => {
    if (e === "3256") {
      alert("true");
    } else {
      alert("false");
    }
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
              variant="standard"
              id="newPass"
              label="New Password"
              name="newPass"
              type="password"
              autoComplete="off"
              autoFocus
              onChange={(e) => console.log(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="re-newPass"
              label="re-NewPassword"
              type="password"
              id="re-newPass"
              autoComplete="off"
              style={{ marginBottom: "100px" }}
            />
            <Typography sx={{ pb: 2 }}>Please check your email</Typography>
            <ReactInputVerificationCode
              fields={4}
              onComplete={(e) => complete(e)}
              type="number"
              autoFocus={true}
              fieldWidth={70}
              fieldHeight={70}
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
