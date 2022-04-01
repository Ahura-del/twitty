import React, { useState } from 'react'
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import {Link , useHistory} from 'react-router-dom'
import axios from 'axios'
import { Box } from "@mui/system";
function Register() {
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
        
        
    }
    return (     
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{height:"100vh" , backgroundImage:"linear-gradient(to right, #000000, #1c000f, #260021, #270039, #090757)"}}
      >
        <Grid item>
        <Container component="main" maxWidth="xs" >
        <Box
          sx={{
            width:350,
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor:"white",
                p:3,
                borderRadius:5
          }}
        >
         <Typography variant='h4' sx={{pb:2}}>
           Sing up
         </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  name="username"
                  size="small"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  autoFocus
                  onChange={e=>setName(e.target.value)}
                  value={name}
                  error={errorColor.name === "error" ? true : false}
                  helperText={errorColor.name === "error" ? errorText.name : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  autoComplete="off"
                  onChange={e=>setPass(e.target.value)}
                  value={pass}
                  size="small"
                  variant="outlined"
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={errorColor.password === "error" ? true : false}
                  helperText={errorColor.password === "error" ? errorText.password : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  autoComplete="off"
                  onChange={e => setRePass(e.target.value)}
                  value={rePass}
                  size="small"
                  variant="outlined"
                  name="re-password"
                  label="re-Password"
                  type="password"
                  id="re-password"
                  error={errorColor.rePassword === "error" ? true : false}
                  helperText={errorColor.rePassword === "error" ? errorText.rePassword : null}
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
              color='warning'
            >
              Sign Up
            </Button>
            <Grid container >
              <Grid item xs={12} textAlign="center" >
                <Link to="/login">
                  <Typography color="#888" component={'p'} variant={'subtitle2'}>
                  Already hav an account? <span style={{color:"blueviolet"}}>Login</span>
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

export default Register
