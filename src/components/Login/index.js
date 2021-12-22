<<<<<<< HEAD
import React , { useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import {Link, useHistory} from 'react-router-dom'
import { Box } from "@mui/system";
import axios from "axios";
function Index() {
  const history = useHistory()
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
         history.push('/massenger')
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


=======
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import {Link} from 'react-router-dom'
import { Box } from "@mui/system";
import React from "react";
import Logo from '../../assets/logo.svg'
function index() {
  const handleSubmit = () => {
    console.log("hi");
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
  };
  return (
    
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
<<<<<<< HEAD
        style={{height:"100vh" , backgroundImage:"linear-gradient(to right, #000000, #1c000f, #260021, #270039, #090757)"}}
=======
        style={{height:"100vh"}}
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
      >
        <Grid item>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
<<<<<<< HEAD
                // height:400,
                width:350,
=======
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
<<<<<<< HEAD
                bgcolor:"white",
                p:3,
                borderRadius:5
              }}
            >
            
              <Typography variant="h4" sx={{pb:2}}>
                Login
              </Typography>
=======
              }}
            >
            
              <img src={Logo} alt="logo" height="20%" width="20%" />
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
<<<<<<< HEAD
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
=======
                  required
                  fullWidth
                  variant="standard" 
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
<<<<<<< HEAD
                  size="small"
                  variant="outlined" 
=======
                  variant="standard" 
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="off"
<<<<<<< HEAD
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  error={loginError.pass?.color === "error" ? true : false}
                  helperText={loginError.pass?.color === "error" ? loginError.pass.text : null}
=======
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
                />
          
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
<<<<<<< HEAD
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
=======
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="/fpassEmail">
                      <Typography color="error" component={'span'} variant={'body2'}>
                      Forgot password?
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to='/register'>
                     <Typography color="primary" component={'span'} variant={'body2'}>
                      Register
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
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

<<<<<<< HEAD
export default Index;
=======
export default index;
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
