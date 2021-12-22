<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Button, Box, Container, Grid, Typography } from "@mui/material";
import ReactInputVerificationCode from "react-verification-code-input";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

function Index() {
  const history = useHistory();
  const location = useLocation();
  const [codeText, setCodeText] = useState("");
  const complete = async (e) => {
    if (parseInt(e) !== location.state.code) {
      setCodeText("code is wrong!");
      return;
    } else {
      try {
        const res = await axios.put(`/user/verify/${location.state.id}`, {
          isVerified: true,
        });
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", location.state.id);
          history.push("/massenger");
        }
      } catch (error) {
        console.log(error.response.data.message);
        return;
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setCodeText("");
    }, 3000);
  }, [codeText]);
  return (
    <Grid
=======
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
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
<<<<<<< HEAD
      style={{
        height: "100vh",
        backgroundImage:
          "linear-gradient(to right, #000000, #1c000f, #260021, #270039, #090757)",
      }}
    >
      <Grid item>
        <Container>
          <Box
            sx={{
              // width:350,
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "white",
              p: 3,
              borderRadius: 5,
            }}
          >
            <Typography marginBottom={5} component={"span"} variant={"body2"}>
              Please check your email <br /> and enter validation code
            </Typography>
            <small style={{ color: "red", marginBottom: 10 }}>
              {codeText.length > 0 ? codeText : null}
            </small>
            <ReactInputVerificationCode
=======
      style={{ height: "100vh" }}
    >
        <Grid item>
        <Typography marginBottom={5} component={'span'} variant={'body2'}>
            Please check your email <br/> and enter validation code
        </Typography>
        <ReactInputVerificationCode
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
              fields={4}
              onComplete={(e) => complete(e)}
              type="number"
              autoFocus={true}
<<<<<<< HEAD
              fieldWidth={60}
              fieldHeight={60}
            />
            <Button
              color="warning"
              variant="contained"
              style={{ marginTop: "30px" }}
              onClick={() => history.goBack()}
            >
              Back
            </Button>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Index;
=======
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
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
