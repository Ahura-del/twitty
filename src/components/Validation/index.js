import React from 'react'
import { Button, Grid, Typography } from "@mui/material";
import ReactInputVerificationCode from "react-verification-code-input";
import { Link } from 'react-router-dom';

function index() {
    const complete = (e)=>{
        console.log(e)
    }
    return (
        <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      style={{ height: "100vh" }}
    >
        <Grid item>
        <Typography marginBottom={5}>
            Please check your email <br/> and enter validation code
        </Typography>
        <ReactInputVerificationCode
              fields={4}
              onComplete={(e) => complete(e)}
              type="number"
              autoFocus={true}
              fieldWidth={70}
              fieldHeight={70}
            />
             <Button color="warning" variant="contained" style={{marginTop:"30px"}}>
                <Link to="/register">
                    Back
                </Link>
            </Button>
        </Grid>
    </Grid>
    )
}

export default index
