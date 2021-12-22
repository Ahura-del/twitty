<<<<<<< HEAD
import React, { useState } from 'react'
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import {Link , useHistory} from 'react-router-dom'
import axios from 'axios'
import { Box } from "@mui/system";
function Index() {
  const history = useHistory()
  const [errorColor, setErrorColor] = useState({name:"",email:"",password:"" , rePassword:""});
  const [errorText , setErrorText] = useState({name:"",email:"",password:"", rePassword:""})
  const [name , setName] = useState('')
  const [ email , setEmail] = useState('')
  const [pass , setPass] = useState('')
  const [rePass , setRePass] = useState('')
    const handleSubmit = async (e)=>{
      e.preventDefault()
        if(name ===""){
          setErrorColor({name:"error"})
          setErrorText({name:"Please set a username"})
          return
        }
        if(email === ""){
          setErrorColor({email:"error"})
          setErrorText({email:"Please set a email"})
          return
        }
        if(pass === ""){
          setErrorColor({password:"error"})
          setErrorText({password:"Please set a password"})
          return
        }
        if(rePass === ""){
          setErrorColor({rePassword:"error"})
          setErrorText({rePassword: "Please fill re-password field"})
          return
        }
        if(pass.length < 6){
          setErrorColor({password:"error"})
          setErrorText({password:"Password length must be over 6 character"})
          return
        }
        if(pass !== rePass){
          setErrorColor({rePassword:"error" , password:"error"})
          setErrorText({rePassword: "Password and re-password not match" , password:"Password and re-password not match"})
          return
        }
        try {
        const data = {
          'name' : name,
          "email":email,
          "password" : pass
        }
         
          const res = await axios.post('/auth/register' , data)
          if(res.status === 200){
            setName('')
            setEmail('')
            setPass('')
            setRePass("")
            history.push({pathname:'/valid' , state:res.data})
          }
          
        } catch (err) {
          setErrorColor({email:"error"})
          setErrorText({email:err.response.data})
          return
        }
        
        
=======
import React from 'react'
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import {Link} from 'react-router-dom'
import { Box } from "@mui/system";
import Logo from '../../assets/logo.svg'
function index() {
    const handleSubmit =()=>{
        console.log('hi');
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
    }
    return (     
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
<<<<<<< HEAD
        style={{height:"100vh" , backgroundImage:"linear-gradient(to right, #000000, #1c000f, #260021, #270039, #090757)"}}
      >
        <Grid item>
        <Container component="main" maxWidth="xs" >
        <Box
          sx={{
            width:350,
=======
        style={{height:"100vh"}}
      >
        <Grid item>
        <Container component="main" maxWidth="xs" >
        {/* <CssBaseline /> */}
        <Box
          sx={{
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
<<<<<<< HEAD
            bgcolor:"white",
                p:3,
                borderRadius:5
          }}
        >
         <Typography variant='h4' sx={{pb:2}}>
           Sing up
         </Typography>
=======
          }}
        >
         <img src={Logo} alt="logo" height="20%" width="20%" />
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
<<<<<<< HEAD
                  autoComplete="off"
                  name="username"
                  size="small"
                  variant="outlined"
=======
                  autoComplete="given-name"
                  name="username"
                  variant="standard"
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  autoFocus
<<<<<<< HEAD
                  onChange={e=>setName(e.target.value)}
                  value={name}
                  error={errorColor.name === "error" ? true : false}
                  helperText={errorColor.name === "error" ? errorText.name : null}
=======
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
<<<<<<< HEAD
                  size="small"
                  variant="outlined"
                   id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="off"
                  onChange={e=>setEmail(e.target.value)}
                  value={email}
                  error={errorColor.email === "error" ? true : false}
                  helperText={errorColor.email === "error" ? errorText.email : null}
=======
                  variant="standard"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
<<<<<<< HEAD
                  autoComplete="off"
                  onChange={e=>setPass(e.target.value)}
                  value={pass}
                  size="small"
                  variant="outlined"
=======
                  variant="standard"
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
<<<<<<< HEAD
                  error={errorColor.password === "error" ? true : false}
                  helperText={errorColor.password === "error" ? errorText.password : null}
=======
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
<<<<<<< HEAD
                  autoComplete="off"
                  onChange={e => setRePass(e.target.value)}
                  value={rePass}
                  size="small"
                  variant="outlined"
=======
                  variant="standard"
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
                  name="re-password"
                  label="re-Password"
                  type="password"
                  id="re-password"
<<<<<<< HEAD
                  error={errorColor.rePassword === "error" ? true : false}
                  helperText={errorColor.rePassword === "error" ? errorText.rePassword : null}
=======
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
                />
              </Grid>
              <Grid item xs={12}>
               
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
<<<<<<< HEAD
              color='warning'
            >
              Sign Up
            </Button>
            <Grid container >
              <Grid item xs={12} textAlign="center" >
                <Link to="/login">
                  <Typography color="#888" component={'p'} variant={'subtitle2'}>
                  Already hav an account? <span style={{color:"blueviolet"}}>Login</span>
=======
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">
                  <Typography color="primary" component={'span'} variant={'body2'}>
                  Login
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
    )
}

<<<<<<< HEAD
export default Index
=======
export default index
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
