import Logo from "../../assets/logo.svg";
import Layout from "../../assets/chat.png";
import LinkMui from "@mui/material/Link";
import { Link } from "react-router-dom";
import { Button, Container, Grid, Slide, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Index() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const installBtn = evt => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }

  return (
    <Grid
      container
      direction="column"
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
              <Button variant="contained" color="secondary" onClick={installBtn}  sx={supportsPWA ? {display:"block"} : {display:"none"}} >
                Install
              </Button>
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
            <Grid item xs={5} width="100%">
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
            <Grid item xs={7} textAlign="right">
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
