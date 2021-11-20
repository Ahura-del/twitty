import React from "react";
import {  Container, Grid } from "@mui/material";
import ChatHeader from './ChatHeader'
import ChatContact from './ChatContent'
import ChatFooter from './ChatFooter'
function Index() {
  return (
    <Grid container sx={{overflow:"hidden"}}>
      <Container style={{ paddingTop: 40, paddingBottom: 30 , height:"100vh" }} fixed>
      <Grid container direction="column" sx={{height:"100%"}}>
        <ChatHeader  />
        <ChatContact />
        <ChatFooter />
      </Grid>
      </Container>
    </Grid>
  );
}

export default Index;
