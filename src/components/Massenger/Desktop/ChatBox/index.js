import React from "react";
import {  Container, Grid } from "@mui/material";
import ChatHeader from './ChatHeader'
import ChatContact from './ChatContent'
function Index() {
  return (
    <Grid container>
      <Container style={{ paddingTop: 40, paddingBottom: 30 }} fixed>
      <Grid container direction="column" rowSpacing={1}>
        <ChatHeader  />
        <ChatContact />
        <ChatFooter />
      </Grid>
      </Container>
    </Grid>
  );
}

export default Index;
