import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import {Link} from 'react-router-dom'
import { Box } from "@mui/system";
import React from "react";
import Logo from '../../assets/logo.svg'
function index() {
  const handleSubmit = () => {
    console.log("hi");
  };
  return (
    
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{height:"100vh"}}
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
            
              <img src={Logo} alt="logo" height="20%" width="20%" />
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  variant="standard" 
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  variant="standard" 
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="off"
                />
          
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
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

export default index;
