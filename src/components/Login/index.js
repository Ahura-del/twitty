import React , { useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import {Link, useHistory} from 'react-router-dom'
import { Box } from "@mui/system";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateState } from "../../Redux";
function Index() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [loginError , setLoginError] = useState({email:{color:"" , text:""} , pass:{color:"" , text:""}})
  const [email , setEmail] = useState('')
  const [pass , setPass] = useState('')
  const handleSubmit =async (e) => {
    e.preventDefault()
    if(email === ""){
      setLoginError({email:{color:"error" , text:"Please enter you'r email"}})
      setTimeout(()=>{
        setLoginError({email:{color:"" , text:""}})
      },3000)
      return
    }
    if(pass === ""){
      setLoginError({pass:{color:"error" , text:"Please enter you'r password"}})
      setTimeout(()=>{
        setLoginError({pass:{color:"" , text:""}})
      },3000)
      return
    }

    try {
      const data ={
        email,
        "password":pass
      }
      const login = await axios.post('/auth/login' , data)
      if(login.status === 201){
        setEmail('')
        setPass('')
        history.push({pathname:'/valid' , state:login.data})
      }
      if(login.status === 200){
        localStorage.setItem('userId' , login.data.id)
         localStorage.setItem('token' , login.data.token)
         dispatch(updateState())
           history.push("/")
      }
      
    } catch (error) {
      console.log(error.response)
      if(error.response.status === 400){
        setLoginError({email:{color:"error" , text:error.response.data.message}})
      setTimeout(()=>{
        setLoginError({email:{color:"" , text:""}})
      },3000)
      return
      }
      if(error.response.status === 401){
        setLoginError({pass:{color:"error" , text:error.response.data.message}})
      setTimeout(()=>{
        setLoginError({pass:{color:"" , text:""}})
      },3000)
      return
      }
    }


  };
  return (
    
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{height:"100vh" , backgroundImage:"linear-gradient(to right, #000000, #1c000f, #260021, #270039, #090757)"}}
      >
        <Grid item>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                // height:400,
                width:350,
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor:"white",
                p:3,
                borderRadius:5
              }}
            >
            
              <Typography variant="h4" sx={{pb:2}}>
                Login
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  variant="outlined" 
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="off"
                  autoFocus
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  error={loginError.email?.color === "error" ? true : false}
                  helperText={loginError.email?.color === "error" ? loginError.email.text : null}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  size="small"
                  variant="outlined" 
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="off"
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  error={loginError.pass?.color === "error" ? true : false}
                  helperText={loginError.pass?.color === "error" ? loginError.pass.text : null}
                />
          
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="warning"
                >
                  LogIn
                </Button>
                <Grid container textAlign="center" sx={{mt:3}}>
                  <Grid item xs={12} sx={{pb:1}}>
                    <Link to="/fpassEmail">
                      <Typography color="#777" component={'p'} variant={'subtitle2'}>
                      Forgot <span style={{color:"blueviolet"}} >password?</span>
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Link to='/register'>
                     <Typography color="#888" component={'p'} variant={'subtitle2'}>
                     Don't have an account? <span style={{color:"blueviolet"}}>Sign up</span> 
                     </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
  
  );
}

export default Index;
