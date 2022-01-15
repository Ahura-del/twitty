import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Index() {
  //---------history----------------
  const history = useHistory();
  //---------handle submit------------
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
    }
  };
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{backgroundImage:"linear-gradient(to right, #000000, #1c000f, #260021, #270039, #090757)"}}
      sx={{ width: "100%", height: "100vh" }}
    >
      <Container>
        <Grid item>
          <Grid container textAlign="center" justifyContent="center">
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ bgcolor:"white",
                p:3,
                borderRadius:5}}>
              <Grid item>
                <Typography>Please enter your email</Typography>
              </Grid>

              <Grid item sx={{ my: 2 }}>
                <TextField
                  type="email"
                  size="small"
                  autoComplete="off"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={emailError.color === "error" ? true : false}
                  helperText={emailError.color === "error" ? emailError.text : null}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="warning">
                  Send Code
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button sx={{mt:2 }} variant="text" onClick={()=> history.goBack()}>
                  Back
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
