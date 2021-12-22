<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
import Logo from "../../assets/icon_x72.png";
import Layout from "../../assets/chat.png";
import useWidthDimensions from "../../Hook/useWidthDimensions";
import { useReactPWAInstall } from "react-pwa-install";
import LinkMui from "@mui/material/Link";
import { Link } from "react-router-dom";
import { Button, Container, Grid, Slide, Typography } from "@mui/material";
<<<<<<< HEAD
function Index() {

=======
import { useEffect, useState } from "react";

function Index() {
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
  //-------------WidthDimensions------------

  const { width } = useWidthDimensions();
  const [xs, setXs] = useState({ small: 5, big: 7 });
  useEffect(() => {
    if (width <= 700) {
      setXs({ small: 12, big: 0 });
    } else {
      setXs({ small: 5, big: 7 });
    }
  }, [width]);

  //-----------PWA Button---------------
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
  const installBtn = () =>{
    pwaInstall({
      title:"Install Twitty App",
      logo: Logo,
<<<<<<< HEAD
=======
    
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
      description: "Twitty is simple App that you can isatall every where . Please click install button"
    })
    .then(()=> alert('App installed successfully'))
    .catch(()=>alert('User opted out from installing'))
  }

  return (
    <Grid
      container
      direction="column"
<<<<<<< HEAD
      
=======
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
      sx={{ width: "100vw", height: "100vh", overflow: "hidden" }}
    >
      <Grid
        item
        xs={1}
        sx={{ bgcolor: "#2f3135" }}
        width="100%"
        alignItems="center"
      >
        <Container sx={{ height: "100%" }}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            height="100%"
          >
            <Grid item>
              <Grid container alignItems="center">
                <Grid item mr={1}>
                  <Link to="/">
                    <img
                      src={Logo}
                      alt="logo"
                      style={{ width: 40, height: 40 }}
                    />
                  </Link>
                </Grid>
                <Grid item>
                  <Typography sx={{ color: "#fdfdfd" }}>Twitty</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
            {supported() && !isInstalled() && (<Button
                variant="contained"
                color="secondary"
                onClick={installBtn}
              >
                Install
              </Button>)}
            
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Grid item xs={11} width="100%" alignItems="center">
        <Container sx={{ height: "100%", width: "100%" }}>
          <Grid
            container
            alignItems="center"
            width="100%"
            height="100%"
            justifyContent="space-between"
          >
            <Grid item xs={xs.small} width="100%">
              <Slide direction="right" in={true} mountOnEnter timeout={1000}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography component="h1" variant="h4">
                      Twitty
                    </Typography>
                    <Typography component="h2" variant="h5">
                      Simple , Free , Fast , Secure
                    </Typography>
                    <Typography component="h2" variant="h5" mb={1}>
                      Chat application
                    </Typography>
                    <Typography component="p">
                      With Twitty , You'll get <br />
                      fast , free , secure messaging , avalible
                      <br />
                      on phone and desktop <br />
                      all over world. <br />
                      Your message will not be saved anywhere <br />
                      <code>
                        You can see source code in{" "}
                        <LinkMui
                          href="https://github.com/Ahura-del/twitty.git"
                          target="_blank"
                          rel="noreferrer"
                        >
                          github
                        </LinkMui>
                      </code>
                    </Typography>
                  </Grid>
                  <Grid item sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      color="warning"
                      size="large"
                      sx={{ mr: 1 }}
                    >
                      <Link to="/login"> Login </Link>
                    </Button>
                    <Button variant="outlined" color="warning" size="large">
                      <Link to="/register">Register</Link>
                    </Button>
                  </Grid>
                </Grid>
              </Slide>
            </Grid>
            <Grid
              item
              xs={xs.big}
              textAlign="right"
              sx={xs.big === 0 ? { display: "none" } : { display: "block" }}
            >
              <Slide direction="left" in={true} mountOnEnter timeout={1000}>
                <img src={Layout} alt="" width="100%" height="100%" />
              </Slide>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Index;
