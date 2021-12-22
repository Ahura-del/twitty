import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
<<<<<<< HEAD
import axios from "axios";
=======
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Index() {
  //---------history----------------
  const history = useHistory();
  //---------handle submit------------
<<<<<<< HEAD
  const [emailError, setEmailError] = useState({color:"" , text:""});
  const [email, setEmail] = useState("");
  const handleSubmit =async (e) => {
    e.preventDefault();
    if (email === "") {
      setEmailError({color:"error" , text:"Please enter you'r email"})
      setTimeout(()=>{
        setEmailError({color:"" , text:""})
      },3000)
      return;
    } 
    try {
      const fpassEmail = await axios.get(`/user/fPass/${email}`)
      if(fpassEmail.status===200){
        setEmail('')
        history.push({pathname:'/fpass' , state:fpassEmail.data})
      }

    } catch (error) {
      setEmailError({color:"error" , text:error.response?.data.message})
      setTimeout(()=>{
        setEmailError({color:"" , text:""})
      },3000)
      return
=======
  const [email, setEmail] = useState("");
  const [color, setColor] = useState("primary");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      setColor("error");
      return;
    } else {
      history.push("/fpass");
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
    }
  };
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
<<<<<<< HEAD
      style={{backgroundImage:"linear-gradient(to right, #000000, #1c000f, #260021, #270039, #090757)"}}
=======
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
      sx={{ width: "100%", height: "100vh" }}
    >
      <Container>
        <Grid item>
          <Grid container textAlign="center" justifyContent="center">
<<<<<<< HEAD
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ bgcolor:"white",
                p:3,
                borderRadius:5}}>
=======
            <Box component="form" onSubmit={handleSubmit} noValidate>
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
              <Grid item>
                <Typography>Please enter your email</Typography>
              </Grid>

              <Grid item sx={{ my: 2 }}>
                <TextField
                  type="email"
<<<<<<< HEAD
                  size="small"
=======
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
                  autoComplete="off"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
<<<<<<< HEAD
                  error={emailError.color === "error" ? true : false}
                  helperText={emailError.color === "error" ? emailError.text : null}
                />
              </Grid>
              <Grid item xs={12}>
=======
                  error={color === "error" ? true : false}
                  helperText={color === "error" ? "Please enter email" : null}
                />
              </Grid>
              <Grid item>
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
                <Button type="submit" variant="contained" color="warning">
                  Send Code
                </Button>
              </Grid>
<<<<<<< HEAD
              <Grid item xs={12}>
                <Button sx={{mt:2 }} variant="text" onClick={()=> history.goBack()}>
                  Back
                </Button>
              </Grid>
=======
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}

export default Index;
