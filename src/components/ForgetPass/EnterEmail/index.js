import { SettingsSystemDaydreamOutlined } from "@mui/icons-material";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Index() {
  //---------history----------------
  const history = useHistory();
  //---------handle submit------------
  const [email, setEmail] = useState("");
  const [color, setColor] = useState("primary");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      setColor("error");
      return;
    } else {
      history.push("/fpass");
    }
  };
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%", height: "100vh" }}
    >
      <Container>
        <Grid item>
          <Grid container textAlign="center" justifyContent="center">
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid item>
                <Typography>Please enter your email</Typography>
              </Grid>

              <Grid item sx={{ my: 2 }}>
                <TextField
                  type="email"
                  autoComplete="off"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={color === "error" ? true : false}
                  helperText={color === "error" ? "Please enter email" : null}
                />
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained" color="warning">
                  Send Code
                </Button>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}

export default Index;
