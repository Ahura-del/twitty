import React from 'react'
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import {Link} from 'react-router-dom'
import { Box } from "@mui/system";
import Logo from '../../assets/logo.svg'
function index() {
    const handleSubmit =()=>{
        console.log('hi');
    }
    return (     
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{height:"100vh"}}
      >
        <Grid item>
        <Container component="main" maxWidth="xs" >
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         <img src={Logo} alt="logo" height="20%" width="20%" />
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  variant="standard"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  variant="standard"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  variant="standard"
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  variant="standard"
                  name="re-password"
                  label="re-Password"
                  type="password"
                  id="re-password"
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
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">
                  <Typography color="primary" component={'span'} variant={'body2'}>
                  Login
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

export default index
